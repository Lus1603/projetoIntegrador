$(document).ready(function () {

    $("#formLoginUsuario").on("submit", function (event) {
        event.preventDefault();
        if (event.originalEvent.submitter.id !== "btnVerTabela") {
            if (validarFormulario()) {
                var usuario = $("#usuario").val();
                var senha = $("#senha").val();
                login(usuario, senha);
            } else {
                alert("Por favor, preencha todos os campos obrigatórios.");
            }
        }
    });

    $("#formLoginUsuario input[required]").on("keyup change", function () {
        if (validarFormulario()) {
            $("#btnLogin").prop("disabled", false).removeClass("disabled btn-secondary");
        } else {
            $("#btnLogin").prop("disabled", true).addClass("disabled btn-secondary");
        }
    });
});

function validarFormulario() {
    var camposPreenchidos = true;

    $("#formLoginUsuario input[required]").each(function () {
        if ($(this).val().trim() === "") {
            camposPreenchidos = false;
            return false;
        }
    });

    return camposPreenchidos;
}

function login(usuario, senha) {
    $.ajax({
        type: "POST",
        url: "usuarios/login",
        data: { usuario: usuario, senha: senha },
        success: function (response) {
            alert("Você logou no Sistema com sucesso");
            window.location.href = "/produtoCadastro.html";
        },
        error: function (error) {
            alert('Falha na autenticação. Verifique seu usuário e senha.');
                console.error("Erro ao Logar:", error);
            console.log("Resposta do servidor (erro):", error.responseText);

        }
    });
}
