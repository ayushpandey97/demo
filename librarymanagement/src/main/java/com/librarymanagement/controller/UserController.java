package com.librarymanagement.controller;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.service.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/searchBooks")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String query) {
        List<Book> books = userService.searchBooks(query);
        return ResponseEntity.ok(books);
    }

    @PostMapping("/requestBorrow/{bookId}/{userId}")
    public ResponseEntity<String> requestBorrow(@PathVariable Long bookId, @PathVariable Long userId) {
        String response = userService.requestBorrow(bookId, userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/requestReturn/{borrowedBookId}")
    public ResponseEntity<String> requestReturn(@PathVariable Long borrowedBookId) {
        String response = userService.requestReturn(borrowedBookId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{userId}")
    public ResponseEntity<List<BorrowedBook>> getRequestStatus(@PathVariable Long userId) {
        List<BorrowedBook> status = userService.getRequestStatus(userId);
        return ResponseEntity.ok(status);
    }
}
