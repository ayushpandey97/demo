package com.librarymanagement.repository;

import com.librarymanagement.model.Librarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepository extends JpaRepository<Librarian, Long> {
    Librarian findByUsername(String username);
    Librarian findByUsernameAndPassword(String username, String password);
}
