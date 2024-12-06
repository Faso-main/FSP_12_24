package io.hakaton.fsp.tasks.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String type, Long id) {
        super(type + " not found with id: " + id.toString());
    }
}
