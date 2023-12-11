package com.projeto.trabalho.Controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.trabalho.Data.ProdutoEntity;
import com.projeto.trabalho.Data.UsuarioEntity;
import com.projeto.trabalho.Service.ProdutoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController

@RequestMapping("/produtos")
public class produtosController {
    
    
    @Autowired

    ProdutoService produtoService;

    @GetMapping("/listar")
    public ResponseEntity<List> getAllProdutos() {
        
        List<ProdutoEntity> produtos = produtoService.listarProdutos();
        
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @PostMapping("/adicionar")
    public ResponseEntity<ProdutoEntity> addProduto(@RequestBody ProdutoEntity produtos) {

        try {
            var produtoNovo = produtoService.criarProduto(produtos);
            System.out.println("Produto Criado com sucesso: " + produtoNovo.toString());
            return new ResponseEntity<>(produtoNovo, HttpStatus.OK);
        } catch (Exception e) {

            System.err.println("Erro ao criar produto: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/delete/{id}")

    public ResponseEntity<ProdutoEntity> deletarProduto(@PathVariable Integer id) {
        produtoService.deletarProduto(id);

        

        return new ResponseEntity<>(HttpStatus.OK);

    }

    
    
    
    

}
