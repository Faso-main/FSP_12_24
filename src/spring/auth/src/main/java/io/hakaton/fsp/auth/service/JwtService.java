package io.hakaton.fsp.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import io.hakaton.fsp.auth.component.SHAKeyLoader;
import io.hakaton.fsp.auth.entity.RefreshToken;
import io.hakaton.fsp.auth.entity.User;
import io.hakaton.fsp.auth.repository.RefreshTokenRepository;

@Service
public class JwtService {

    public static final String BEARER_PREFIX = "Bearer ";
    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 15; // 15 минут

    @Autowired
    private SHAKeyLoader shaKeyLoader;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String deleteBearer(String token) {
        if (token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }
        return token;
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Long extractProfileId(String token) {
        Object profileId = extractClaim(token, claims -> claims.get("profile_id"));
    
        if (profileId instanceof Integer) {
            return ((Integer) profileId).longValue();
        } else if (profileId instanceof Long) {
            return (Long) profileId;
        } else {
            throw new IllegalArgumentException("profile_id is not a valid type");
        }
    }

    public List<String> extractRoles(String token) {
        return extractClaim(token, claims -> {
            Object roles = claims.get("roles");
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.convertValue(roles, new TypeReference<List<String>>() {});
        });
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User customUserDetails) {
            claims.put("profile_id", customUserDetails.getId());
            claims.put("roles", customUserDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        }
        return generateToken(claims, userDetails, ACCESS_TOKEN_VALIDITY);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Optional<RefreshToken> orf = refreshTokenRepository.findByUserId(((User) userDetails).getId());

        if(orf.isPresent()){
            return orf.get().getToken();
        }

        String refreshToken = UUID.randomUUID().toString();
        RefreshToken tokenEntity = new RefreshToken();
        tokenEntity.setToken(refreshToken);
        tokenEntity.setUserId(((User) userDetails).getId());
        tokenEntity.setExpiryDate(LocalDateTime.now().plus(30, ChronoUnit.DAYS));

        refreshTokenRepository.save(tokenEntity);
        return refreshToken;
    }
    
    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, long validity) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + validity))
                .signWith(getSigningKey(), Jwts.SIG.HS256).compact();
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isRefreshTokenValid(String token) {
        return refreshTokenRepository.findByToken(token)
                .map(refreshToken -> refreshToken.getExpiryDate().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
    
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(shaKeyLoader.getShaKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

