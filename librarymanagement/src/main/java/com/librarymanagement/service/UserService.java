package com.librarymanagement.service;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.model.User;

import java.util.List;

public interface UserService {

    User findByUsernameAndPassword(String username, String password);
    List<Book> searchBooks(String query);
    String requestBorrow(Long bookId, Long userId);
    String requestReturn(Long borrowedBookId);
    List<BorrowedBook> getRequestStatus(Long userId);
}
