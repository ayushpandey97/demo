package com.librarymanagement.service.serviceImpl;

import com.librarymanagement.exception.ConflictException;
import com.librarymanagement.exception.DuplicateResourceException;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.model.Book;
import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.model.Librarian;
import com.librarymanagement.model.User;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.BorrowedBookRepository;
import com.librarymanagement.repository.LibrarianRepository;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.LibrarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibrarianServiceImpl implements LibrarianService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowedBookRepository borrowedBookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LibrarianRepository librarianRepository;

    public Librarian findByUsernameAndPassword(String username, String password) {
        return librarianRepository.findByUsernameAndPassword(username, password);
    }

    public List<BorrowedBook> getIssueRequests() {
        return borrowedBookRepository.findByStatusAndRequestType("Pending", "Borrow");
    }

    public List<BorrowedBook> getReturnRequests() {
        return borrowedBookRepository.findByStatusAndRequestType("Pending", "Return");
    }

    // Search books by part of the title
    public List<Book> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    public User searchUsersByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String acceptBorrowRequest(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null || book.getAvailableCopies() <= 0) {
            return "Cannot accept borrow request: Book not available.";
        }

        BorrowedBook borrowedBook = borrowedBookRepository.findByBookIdAndUserId(bookId, userId);
        if (borrowedBook == null) {
            return "Borrow request not found.";
        }

        borrowedBook.setStatus("Approved");
        borrowedBookRepository.save(borrowedBook);

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        return "Borrow request approved.";
    }

    public String returnBorrowedBook(Long borrowedBookId) {
        BorrowedBook borrowedBook = borrowedBookRepository.findById(borrowedBookId).orElse(null);
        if (borrowedBook == null) {
            return "Return request failed: Borrowed book entry not found.";
        }

        Book book = borrowedBook.getBook();
        borrowedBook.setStatus("Approved");
        borrowedBookRepository.save(borrowedBook);

        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        borrowedBookRepository.delete(borrowedBook);

        return "Return request approved.";
    }



        // Method to add a new book with validation (without custom logging)
        public Book addBook(Book book) {
            // Check if the book with the same name and author already exists
            List<Book> existingBooks = bookRepository.findByTitleAndAuthor(book.getTitle(), book.getAuthor());
            if (!existingBooks.isEmpty()) {
                throw new DuplicateResourceException("A book with the same title and author already exists.");
            }

            // Save the book if it does not already exist
            return bookRepository.save(book);
        }

        // Method to delete a book with exception handling (without custom logging)
        public void deleteBook(Long bookId) {
        // Check if the book exists, throwing an exception if not
            if (!bookRepository.existsById(bookId)) {
                throw new ResourceNotFoundException("No book found with ID: " + bookId);
            }

        // Check if the book is currently borrowed
        if (borrowedBookRepository.existsByBookId(bookId)) {
            throw new ConflictException("Cannot delete book with ID: " + bookId + "  as it is currently borrowed by a user.");
        }

        // Delete the book if it exists and is not borrowed
        bookRepository.deleteById(bookId);
        }

        // Method to add a new user with validation (without custom logging)
        public void addUser(User user) {
            // Check if the username already exists
            User existingUser = userRepository.findByUsername(user.getUsername());
            if (existingUser != null) {
                throw new DuplicateResourceException("Username already exists: " + user.getUsername());
            }

            // Save the user if the username is unique
            userRepository.save(user);
        }

    // Method to delete a user with exception handling (without custom logging)
    public void deleteUser(Long userId) {
        // Check if the user exists, throwing an exception if not
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("No user found with ID: " + userId);
        }

        if (borrowedBookRepository.existsByUserId(userId)){
            throw new ConflictException("Cannot delete user with ID : " + userId + "as user has not returned the book");
        }

        userRepository.deleteById(userId);
    }

}
