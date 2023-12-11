package com.projeto.trabalho.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.trabalho.Controller.produtosController;
import com.projeto.trabalho.Data.ProdutoEntity;
import com.projeto.trabalho.Data.ProdutoRepository;

@Service

public class ProdutoService {
    
    @Autowired
    ProdutoRepository produtoRepository;

    public ProdutoEntity criarProduto(ProdutoEntity produto) {

        produto.setId(null);

        produtoRepository.save(produto);

        return produto;

    }

    public ProdutoEntity getProdutoId(Integer ProdutoId) {
        return produtoRepository.findById(ProdutoId).orElse(null);
    }

    public List<ProdutoEntity> listarProdutos() {
        return produtoRepository.findAll();
    }

    public void deletarProduto(Integer ProdutoId) {
        ProdutoEntity produto = getProdutoId(ProdutoId);

        produtoRepository.deleteById(produto.getId());
    }

   


}
