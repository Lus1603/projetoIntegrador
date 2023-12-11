package com.projeto.trabalho.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.trabalho.Data.ProdutoEntity;
import com.projeto.trabalho.Data.UsuarioEntity;
import com.projeto.trabalho.Service.UsuarioService;

@RestController

@RequestMapping("/usuarios")
public class usuarioController {

    @Autowired

    UsuarioService usuarioservice;

    @GetMapping("/listar")
    public ResponseEntity<List> getAllUsuarios() {

        List<UsuarioEntity> Usuarios = usuarioservice.listarUsuarios();

        return new ResponseEntity<>(Usuarios, HttpStatus.OK);
    }

    @PostMapping("/adicionar")
    public ResponseEntity<UsuarioEntity> addUsuario(@RequestBody UsuarioEntity Usuarios) {

        try {
            var usuarioNovo = usuarioservice.criarUsuario(Usuarios);
            System.out.println("Usuario Criado com sucesso: " + usuarioNovo.toString());
            return new ResponseEntity<>(usuarioNovo, HttpStatus.OK);
        } catch (Exception e) {

            System.err.println("Erro ao criar usuario: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/delete/{id}")

    public ResponseEntity<UsuarioEntity> deletarProduto(@PathVariable Integer id) {
        usuarioservice.deletarUsuario(id);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/login")
    public ResponseEntity<String> autenticarUsuario(@RequestParam String usuario, @RequestParam String senha) {
        UsuarioEntity usuarioAutenticado = usuarioservice.autenticarUsuario(usuario, senha);

        if (usuarioAutenticado != null) {
            return new ResponseEntity<>("Autenticação bem-sucedida", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Falha na autenticação", HttpStatus.UNAUTHORIZED);
        }
    }
    

}
