$(document).ready(function () {
    listarProduto();
})

function listarProduto() {
    $.get("/produtos/listar", function (data) {

        $("#tabela-corpo").empty();

        $.each(data, function (index, produto) {

            var row = $(
                "<tr>" +
                "<td>" + produto.id + "</td>" +
                "<td>" + produto.nome + "</td>" +
                "<td>" + produto.valor + "</td>" +
                "<td>" + produto.codigo + "</td>" +
                "<td><div class='d-flex'> <button class='btn btn-danger btn-excluir' data-id='" + produto.id + "'>Excluir</button></div></td>" +
                "</tr>");

            $("#tabela-corpo").append(row);


            row.find(".btn-excluir").on("click", function () {
                excluirProduto(produto.id);
            });


        });
    });


}



function excluirProduto(id) {
    console.log("Excluindo produto com ID:", id);

    $.ajax({
        type: "DELETE",
        url: "/produtos/delete/" + id,
        success: function (data) {
            console.log("Produto excluído com sucesso:", data);
            listarProduto();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Erro ao excluir filme:", xhr.status, textStatus, errorThrown);
            alert("Erro ao excluir produto. Verifique o console para mais detalhes.");
        }
    });
}