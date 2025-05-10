//elementos do html para salvar e listar
const btnSalvar = document.getElementById('btnSalvar');
const btnListar = document.getElementById('btnListar');

//elementos do html para editar task
const btnEditar = document.getElementById('btnEditar');
const modalEditar = document.getElementById('modalEditar');
const btnFecharModal = document.getElementById('fecharModal');
const btnNovaTask = document.getElementById('btnModal');
const formEditarTarefa = document.getElementById('formEditarTarefa');
const inputId = document.getElementById('inputId');

//Função para salvar uma task no banco
btnSalvar.addEventListener('click', async function(e){
    e.preventDefault();

    const titulo = document.getElementById('inputTitulo');
    const descricao = document.getElementById('textDescricao');
    const tipo = document.getElementById('selectTipo');

    criarNovaTarefa( { tiulo: titulo.value, descricao: descricao.value, tipo: tipo.value } );

    const task = {
        titulo: titulo.value,
        descricao: descricao.value,
        tipo: tipo.value
    };

    console.log(task);
})

//Função com modal para editar uma task
btnEditar.addEventListener('click', function(){
    //e.preventDefault();
    const idTask = inputId.value.trim();
    console.log("antes do if")
    if(idTask === ''){
        alert("Digite o id da tarefa que deseja editar.");
    }
    else{
        modalEditar.style.display = 'block';
        inputId.value = '';
        console.log("entrou no if");
        
    }

});

// Fechar o modal ao clicar no X
btnFecharModal.addEventListener('click', function () {
    modalEditar.style.display = 'none';
});

formEditarTarefa.addEventListener('submit', async function (e) {
    e.preventDefault(); // evita o recarregamento da página

    const titulo = inputTituloModal.value.trim();
    const descricao = textareaModal.value.trim();
    const tipo = tipo.value;

    if (titulo && descricao) {
        task = {
            titulo: titulo,
            descricao: descricao
        };
        console.log("Tarefa salva:", task); // ou manipule como quiser

        // Fecha o modal e limpa os campos
        modalEditar.style.display = 'none';
        inputTituloModal.value = '';
        textareaModal.value = '';
    }
});