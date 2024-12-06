package io.hakaton.fsp.profile.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Date;
import java.util.List;
import java.util.function.Function;

import javax.crypto.SecretKey;

import io.hakaton.fsp.profile.component.SHAKeyLoader;

@Service
public class JwtService {

    public static final String BEARER_PREFIX = "Bearer ";

    @Autowired
    private SHAKeyLoader shaKeyLoader;

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
    
    public boolean isTokenValid(String token, String username) {
        final String userName = extractUserName(token);
        return (userName.equals(username)) && !isTokenExpired(token);
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

