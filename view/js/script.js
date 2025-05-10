const apiUrl = 'http://localhost:3000/tasks';
//'http://localhost:3000/tasks/id'

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

    criarNovaTarefa( { titulo: titulo.value, descricao: descricao.value, tipo: tipo.value } );
    

    titulo.value = '';
    descricao.value = '';

})

//Função com modal para editar uma task
btnEditar.addEventListener('click', function(e){
    e.preventDefault();
    const idTask = inputId.value.trim();
    console.log(verificarIdExistente(idTask).verificarIdExistente);
    if(verificarIdExistente(idTask) === true){
        alert("sou truee")
    }
    if(idTask === '' || verificarIdExistente(idTask) === false){
        alert("Digite o id da tarefa que deseja editar.");
    }
    else{
        modalEditar.style.display = 'block';
        
    }


});

// Fechar o modal ao clicar no X
btnFecharModal.addEventListener('click', function () {
    modalEditar.style.display = 'none';
});


formEditarTarefa.addEventListener('submit', async function (e) {
    e.preventDefault(); // evita o recarregamento da página

    const idTask = inputId.value.trim();
    const titulo = document.getElementById('inputTituloModal');
    const descricao = document.getElementById('textareaModal');
    const tipo = document.getElementById('selectTipoUpdate');
    
    editarTarefa(idTask, { titulo: titulo.value, descricao: descricao.value, tipo: tipo.value });

    // Limpa os campos do modal
    titulo.value = '';
    descricao.value = '';
});

// Funções que são usadas nos eventos para o html

async function criarNovaTarefa(tarefa){
    try{
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefa),
        });

        if(response.ok){
            console.log("Tarefa criada com sucesso");
        }
        else{
            console.log("Erro ao criar tarefa");
        }
    }
    catch(erro){
        console.log(erro);
    }
}

async function editarTarefa(id, tarefaAtualizada){
    try{
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefaAtualizada),
        });

        if(response.ok){
            console.log("Tarefa editada com sucesso");
        }
        else{
            console.log("Erro ao atualizar tarefa");
        }
    }
    catch(erro){
        console.log(erro);
    }
}

async function verificarIdExistente(id){
    try{
        const response = await fetch(`${apiUrl}/${id}`);
        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
    catch(erro){
        console.log(erro);
    }
}