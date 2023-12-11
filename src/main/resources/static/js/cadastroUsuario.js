$(document).ready(function () {

    $("#formCadastrarUsuario").on("submit", function (event) {
        event.preventDefault();
        if (event.originalEvent.submitter.id !== "btnVerTabela") {
            if (validarFormulario()) {
                criarUsuario();
            } else {
                alert("Por favor, preencha todos os campos obrigatórios.");
            }
        }
    });

    $("#formCadastrarUsuario input[required]").on("keyup change", function () {
        if (validarFormulario()) {
            $("#btnCadastrarUsuario").prop("disabled", false).removeClass("disabled btn-secondary");

        } else {
            $("#btnCadastrarUsuario").prop("disabled", true).addClass("disabled btn-secondary");
        }
    });

})

function validarFormulario() {
    var camposPreenchidos = true;

    $("#formCadastrarUsuario input[required]").each(function () {
        if ($(this).val().trim() === "") {
            camposPreenchidos = false;
            return false;
        }
    });

    return camposPreenchidos;
}

function criarUsuario() {
    var user = $("#usuario").val();
    var senha = $("#senha").val();

    var usuario = {
        usuario: user,
        senha: senha
    }

    console.log("Dados do usuário a serem enviados:", usuario);


    $("#btnCadastrarUsuario").prop("disabled", true).addClass("disabled btn-secondary");

    $.ajax({
        type: "POST",
        url: "/usuarios/adicionar",
        contentType: "application/json",
        data: JSON.stringify(usuario),
        success: function (data) {

            console.log("Dados passados: ", data);

            alert("Usuário cadastrado com sucesso");

            $("#formCadastrarUsuario")[0].reset();

            $("#btnCadastrarUsuario").prop("disable", false).removeClass("disable btn-secondary")
           

        },
        error: function(error) {

            console.error("Erro ao cadastrar Usuário:", error);

            console.log("Resposta do servidor (erro):", error.responseText);

            try {
                
                var responseJson = JSON.parse(error.responseText);

                if(responseJson && responseJson.error) {
                    console.error("Erro ao tentar cadastrar o usuário: " + responseJson.error);
                    alert("Erro ao cadastrar Usuário: " + responseJson.error);


                }else {
                    console.error("Erro ao analisar resposta do servidor:", responseJson);
                    alert("Erro ao analisar resposta do servidor. Verifique o console para mais detalhes.");                
                }

            } catch (e) {
                console.error("Erro ao analisar resposta do servidor:", e);
                alert("Erro ao analisar resposta do servidor. Verifique o console para mais detalhes.");
            }

            $("#btnCadastrarUsuario").prop("disabled", false).removeClass("disabled btn-secondary");

        }
        

    })
}