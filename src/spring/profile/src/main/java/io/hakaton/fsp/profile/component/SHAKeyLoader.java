package io.hakaton.fsp.profile.component;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SHAKeyLoader {

    private String shaKey;

    public SHAKeyLoader(@Value("${token.signing.key}") String shaKeyFilePath) throws IOException {
        this.shaKey = loadSHAKey(shaKeyFilePath);
    }

    private String loadSHAKey(String filePath) throws IOException {
        Path path = Path.of(filePath);

        try (BufferedReader reader = Files.newBufferedReader(path)) {
            return reader.readLine();
        } catch (IOException e) {
            throw new IOException("Error path: " + filePath, e);
        }
    }

    public String getShaKey() {
        return shaKey;
    }

    public void setShaKey(String shaKey) {
        this.shaKey = shaKey;
    }
}
