package com.projeto.trabalho.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.trabalho.Data.UsuarioEntity;
import com.projeto.trabalho.Data.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired

    UsuarioRepository usuarioRepository;

    public UsuarioEntity criarUsuario(UsuarioEntity user) {
        user.setId(null);

        usuarioRepository.save(user);

        return user;

    }

    public UsuarioEntity getUserId(Integer UsuarioId) {

        return usuarioRepository.findById(UsuarioId).orElse(null);

    }

    public List<UsuarioEntity> listarUsuarios() {

        return usuarioRepository.findAll();

    }

    public void deletarUsuario(Integer UsuarioId) {

        UsuarioEntity user = getUserId(UsuarioId);

        usuarioRepository.deleteById((user.getId()));

    }

    public UsuarioEntity autenticarUsuario(String usuario, String senha) {
        List<UsuarioEntity> usuarios = usuarioRepository.findByUsuario(usuario);

        for (UsuarioEntity usuarioEntity : usuarios) {
            if (usuarioEntity.getSenha().equals(senha)) {
                return usuarioEntity;
            }
        }

        return null; 
    }
    

}
