package com.librarymanagement.service.serviceImpl;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.model.User;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.BorrowedBookRepository;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowedBookRepository borrowedBookRepository;

    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCase(query);
    }

    public String requestBorrow(Long bookId, Long userId) {
        // Check if the user has already requested to borrow the same book
        List<BorrowedBook> existingRequests = borrowedBookRepository.findByBookIdAndUserIdAndRequestType(bookId, userId, "Borrow");

        for (BorrowedBook request : existingRequests) {
            // If there's any pending or approved borrow request, return a message
            if (request.getStatus().equals("Pending") || request.getStatus().equals("Approved")) {
                return "You have already issued a borrow request for this book.";
            }
        }

        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null || book.getAvailableCopies() <= 0) {
            return "No available copies or book not found.";
        }

        BorrowedBook borrowedBook = new BorrowedBook();
        borrowedBook.setBook(book);
        borrowedBook.setUserId(userId);
        borrowedBook.setStatus("Pending");
        borrowedBook.setRequestType("Borrow");
        borrowedBookRepository.save(borrowedBook);

        return "Borrow request submitted.";
    }

    public String requestReturn(Long borrowedBookId) {
        BorrowedBook borrowedBook = borrowedBookRepository.findById(borrowedBookId).orElse(null);
        if (borrowedBook == null) {
            return "Borrowed book entry not found.";
        }

        borrowedBook.setStatus("Pending");
        borrowedBook.setRequestType("Return");
        borrowedBookRepository.save(borrowedBook);

        return "Return request submitted.";
    }

    public List<BorrowedBook> getRequestStatus(Long userId) {
        return borrowedBookRepository.findByUserId(userId);
    }
}
