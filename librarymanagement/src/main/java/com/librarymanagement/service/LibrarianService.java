package com.librarymanagement.service;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.BorrowedBook;
import com.librarymanagement.model.Librarian;
import com.librarymanagement.model.User;

import java.util.List;

public interface LibrarianService {

     Librarian findByUsernameAndPassword(String username, String password);
     List<BorrowedBook> getIssueRequests();
     List<BorrowedBook> getReturnRequests();
     List<Book> searchBooksByTitle(String title);
     User searchUsersByUsername(String username);
     String acceptBorrowRequest(Long bookId, Long userId);
     String returnBorrowedBook(Long borrowedBookId);
     Book addBook(Book book);
     void deleteBook(Long bookId);
     void addUser(User user);
     void deleteUser(Long userId);
}
