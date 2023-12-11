package com.projeto.trabalho.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProdutoRepository extends JpaRepository<ProdutoEntity, Integer> {
    
}
