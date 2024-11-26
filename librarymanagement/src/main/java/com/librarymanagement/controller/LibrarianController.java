package com.librarymanagement.controller;

import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.model.User;
import com.librarymanagement.model.Book;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.serviceImpl.LibrarianServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/librarian")
public class LibrarianController {

    @Autowired
    private LibrarianServiceImpl librarianService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/issueRequests")
    public ResponseEntity<List<BorrowedBook>> getIssueRequests() {
        List<BorrowedBook> requests = librarianService.getIssueRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/returnRequests")
    public ResponseEntity<List<BorrowedBook>> getReturnRequests() {
        List<BorrowedBook> requests = librarianService.getReturnRequests();
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/approveBorrow/{bookId}/{userId}")
    public ResponseEntity<String> approveBorrow(@PathVariable Long bookId, @PathVariable Long userId) {
        String response = librarianService.acceptBorrowRequest(bookId, userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approveReturn/{borrowedBookId}")
    public ResponseEntity<String> approveReturn(@PathVariable Long borrowedBookId) {
        String response = librarianService.returnBorrowedBook(borrowedBookId);
        return ResponseEntity.ok(response);
    }

    // Add a new book
    @PostMapping("/addBook")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book addedBook = librarianService.addBook(book);
        return ResponseEntity.ok(addedBook);
    }

    // Delete a book
    @DeleteMapping("/deleteBook/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
        librarianService.deleteBook(bookId);
        return ResponseEntity.ok("Book deleted successfully.");
    }

    // Add a new user
    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        librarianService.addUser(user);
        return ResponseEntity.ok("User added successfully.");
    }

    // Delete a user
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        librarianService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // Search for books by part of the book name
    @GetMapping("/searchBooks/{title}")
    public ResponseEntity<List<Book>> searchBooks(@PathVariable String title) {
        List<Book> books = librarianService.searchBooksByTitle(title);
        return ResponseEntity.ok(books);
    }

    // Search for users by part of the username
    @GetMapping("/searchUsers/{username}")
    public ResponseEntity<User> searchUsers(@PathVariable String username) {
        User users = librarianService.searchUsersByUsername(username);
        return ResponseEntity.ok(users);
    }
}