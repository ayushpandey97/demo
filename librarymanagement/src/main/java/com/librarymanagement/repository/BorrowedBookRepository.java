package com.librarymanagement.repository;

import com.librarymanagement.model.BorrowedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Long> {
    List<BorrowedBook> findByUserId(Long userId);
    BorrowedBook findByBookIdAndUserId(Long bookId, Long userId);

    // New method to find borrowed books by status
    List<BorrowedBook> findByStatus(String status);

    List<BorrowedBook> findByStatusAndRequestType(String status, String requestType);

    List<BorrowedBook> findByBookIdAndUserIdAndRequestType(Long bookId, Long userId, String borrow);

    boolean existsByBookId(Long bookId);

    boolean existsByUserId(Long userId);
}
