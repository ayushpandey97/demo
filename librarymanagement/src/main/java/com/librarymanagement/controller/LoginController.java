package com.librarymanagement.controller;

import com.librarymanagement.model.Librarian;
import com.librarymanagement.model.LoginRequest;
import com.librarymanagement.model.User;
import com.librarymanagement.service.serviceImpl.LibrarianServiceImpl;
import com.librarymanagement.service.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://3.27.162.178:3000")
public class LoginController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private LibrarianServiceImpl librarianService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Check if the login details match a user
        User user = userService.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok("user"); // Return "user" if it's a user
        }

        // Check if the login details match a librarian
        Librarian librarian = librarianService.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (librarian != null) {
            return ResponseEntity.ok("librarian"); // Return "librarian" if it's a librarian
        }

        // Return unauthorized if credentials are invalid
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
