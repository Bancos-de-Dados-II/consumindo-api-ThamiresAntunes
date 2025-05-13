const apiUrl = 'http://localhost:3000/tasks';
// Função para carregar as tarefas ao iniciar a página
document.addEventListener('DOMContentLoaded', async function () {
    await carregarTarefas();
});

//Elementos do html para salvar nova task
const btnSalvar = document.getElementById('btnSalvar');

//Elementos do html para listar tarefas
const btnListar = document.getElementById('btnListar');

//Elementos do html para editar task
const btnEditar = document.getElementById('btnEditar');
const modalEditar = document.getElementById('modalEditar');
const btnFecharModal = document.getElementById('fecharModal');
const formEditarTarefa = document.getElementById('formEditarTarefa');

//Input para buscar tarefas por id, usado para editar e excluir
const inputId = document.getElementById('inputId');

//Elementos do html para deletar task
const btnExcluir = document.getElementById('btnExcluir');

//Eventos para manipular o DOM
//Função para criar e salvar uma task no banco
btnSalvar.addEventListener('click', async function(e){
    e.preventDefault();

    const titulo = document.getElementById('inputTitulo');
    const descricao = document.getElementById('textDescricao');
    const tipo = document.getElementById('selectTipo');

    if (titulo.value.trim() === '' || descricao.value.trim() === ''  || tipo.value === '') {
        alert("Preencha todos os campos.");
        return;
    }

    await criarNovaTarefa( { titulo: titulo.value, descricao: descricao.value, tipo: tipo.value } );

    titulo.value = '';
    descricao.value = '';
    alert("Tarefa criada com sucesso!")

})

// Função para listar a tarefa passada por id
btnListar.addEventListener('click', async function (e) {
    e.preventDefault();
    const idTask = inputId.value.trim();
    if (idTask !== '') {
        const tarefa = await mostrarTarefa(idTask);
        const lista = document.getElementById('lista');
        lista.innerHTML = ''; // Limpa a lista atual
        if (tarefa) {
            adicionarTarefa(tarefa);
            inputId.value = '';
        } else {
            lista.innerHTML = '<li>Tarefa não encontrada.</li>';
        }
    } else { //se clicar no botao sem digitar um id
        await carregarTarefas(); // Carrega todas as tarefas
    }
});

//Função para abrir modal para editar uma task
btnEditar.addEventListener('click', async function(e){
    e.preventDefault();
    const idTask = inputId.value.trim();
    if(idTask === ''){
        alert("Digite o id da tarefa que deseja editar.");
        return;
    }
    const idValido = await verificarIdExistente(idTask);
    if(idValido){
        modalEditar.style.display = 'block';
    }
    else{
        alert("Id da tarefa não encontrado.");
    }

});

// Fechar o modal ao clicar no X
btnFecharModal.addEventListener('click', function () {
    modalEditar.style.display = 'none';
    inputId.value = '';
});

// Função para editar a tarefa criada no form do modal
formEditarTarefa.addEventListener('submit', async function (e) {
    e.preventDefault(); // evita o recarregamento da página

    const idTask = inputId.value.trim();
    const titulo = document.getElementById('inputTituloModal');
    const descricao = document.getElementById('textareaModal');
    const tipo = document.getElementById('selectTipoUpdate');
    
    await editarTarefa(idTask, { titulo: titulo.value, descricao: descricao.value, tipo: tipo.value });
    await carregarTarefas();
    // Limpa os campos do modal
    titulo.value = '';
    descricao.value = '';
    modalEditar.style.display = 'none';
    inputId.value = '';
    alert("Tarefa editada com sucesso!")
});

btnExcluir.addEventListener('click', async function(e){
    e.preventDefault();
    const idTask = inputId.value.trim();
    if(idTask === ''){
        alert("Digite o id da tarefa que deseja excluir.");
        return;
    }
    const idValido = await verificarIdExistente(idTask);
    if(idValido){
        await deletarTarefa(idTask);
        alert("Tarefa excluida com sucesso!")
    }
    else{
        alert("Id da tarefa não encontrada.")
    }
    inputId.value = '';
});

// Funções que são usadas nos eventos para o html
// Criar nova Tarefa
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
//Listar todas as tarefas
async function listarTarefas() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const tarefas = await response.json();
            return tarefas;
        }
        else {
            console.log("Erro ao listar tarefas");
        }
    }
    catch (erro) {
        console.log(erro);
    }
}
//Listar uma tarefa por ID
async function mostrarTarefa(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.ok) {
            const tarefa = await response.json();
            return tarefa;
        }
        else {
            console.log("Erro ao listar tarefa");
        }
    }
    catch (erro) {
        console.log(erro);
    }
}
//Editar tarefa
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

// Verificar se o ID da tarefa existe
async function verificarIdExistente(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (erro) {
        console.log(erro);
    }
}
//Excluir tarefa
async function deletarTarefa(id){
    try {
       const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
       });
       if(response.ok){
        console.log("Tarefa deletada com sucesso.");
        await carregarTarefas(); //atualiza a lista de tarefa na tela
       }
       else{
         console.log("Erro ao deletar tarefa");
       }
    } 
    catch (erro) {
         console.log(erro);
    }
}

// Função para adicionar uma tarefa na lista
function adicionarTarefa(tarefa) {
    const li = document.createElement('li');
    li.className = 'tarefa';
    const titulo = document.createElement('p');
    //titulo.textContent = `${tarefa.id} - ${tarefa.titulo} - ${tarefa.tipo}`;
    titulo.innerHTML = `ID: ${tarefa.id} <br> ${tarefa.titulo} - ${tarefa.tipo}`;
    const descricao = document.createElement('span');
    descricao.className = 'descricaoTarefa';
    descricao.textContent = `${tarefa.descricao}`;
    
    li.appendChild(titulo);
    li.appendChild(descricao);
    lista.appendChild(li);
}

// Função para carregar as tarefas na lista
async function carregarTarefas() {
    const tarefas = await listarTarefas();
    const lista = document.getElementById('lista');

    // Limpa a lista atual
    lista.innerHTML = '';

    if (tarefas && tarefas.length > 0) {
        tarefas.forEach(tarefa => adicionarTarefa(tarefa));
    } else {
        lista.innerHTML = '<li>Nenhuma tarefa encontrada.</li>';
    }
}
