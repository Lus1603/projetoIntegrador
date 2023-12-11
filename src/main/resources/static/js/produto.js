$(document).ready(function () {
    $("#formProdutoCadastrar").on("submit", function (event) {
        event.preventDefault();
        if (event.originalEvent.submitter.id !== "btnVerTabela") {
            if (validarFormulario()) {
                cadastroProduto();
            } else {
                alert("Por favor, preencha todos os campos obrigatórios.");
            }
        }
    });

    $("#formProdutoCadastrar input[required]").on("keyup change", function () {
        if (validarFormulario()) {
            $("#btnProduto").prop("disabled", false).removeClass("disabled btn-secondary");

        } else {
            $("#btnProduto").prop("disabled", true).addClass("disabled btn-secondary");
        }
    });
})  

function validarFormulario() {
    var camposPreenchidos = true;

    $("#formProdutoCadastrar input[required]").each(function () {
        if ($(this).val().trim() === "") {
            camposPreenchidos = false;
            return false;
        }
    });

    return camposPreenchidos;
}

function cadastroProduto() {
    var nome = $("#produto").val();
    var valor = $("#valor").val();
    var codigo = $("#codigo").val();

    var produtoData = {
        nome: nome,
        valor: valor,
        codigo: codigo
    };

    console.log("Dados do produto a serem enviados:", produtoData);

    $("#btnProduto").prop("disabled", true).addClass("disabled btn-secondary");

    $.ajax({
        type: "POST",
        url: "/produtos/adicionar",
        contentType: "application/json",
        data: JSON.stringify(produtoData),
        success: function (data) {
            console.log("Resposta do servidor:", data);

            alert("Produto cadastrado com sucesso!");

            $("#formProdutoCadastrar")[0].reset();

            $("#btnProduto").prop("disabled", false).removeClass("disabled btn-secondary");
        },

        error: function (error) {
            console.error("Erro ao cadastrar Produto:", error);

            console.log("Resposta do servidor (erro):", error.responseText);

            try {
                var responseJson = JSON.parse(error.responseText);

                if (responseJson && responseJson.error) {
                    console.error("Erro ao cadastrar Produto. Detalhes:", responseJson.error);
                    alert("Erro ao cadastrar Produto. Detalhes: " + responseJson.error);
                } else {
                    console.error("Erro ao analisar resposta do servidor:", responseJson);
                    alert("Erro ao analisar resposta do servidor. Verifique o console para mais detalhes.");
                }
            } catch (e) {
                console.error("Erro ao analisar resposta do servidor:", e);
                alert("Erro ao analisar resposta do servidor. Verifique o console para mais detalhes.");
            }

            $("#btnProduto").prop("disabled", false).removeClass("disabled btn-secondary");
        }



    });
}