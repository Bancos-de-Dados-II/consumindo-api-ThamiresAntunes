import Task from '../model/task.js';

export async function getTasks(req, res) {
    try{
        const tasks = await Task.findAll();
        if(tasks != ''){
            return res.status(200).json(tasks);
        }
        return res.status(404).json({Erro: "Não existe tarefas salvas no banco"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Erro ao listar tarefas");
    }

}

export async function findTask(req, res) {
    try {
        const id = req.params.id;
        const task = await Task.findByPk(id);
        
        if(!task){ //se task for false, o ! deixa true e entra
            return res.status(404).json("Tarefa não encontrada");
        }
        return res.status(200).json(task);
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json("Falha ao listar a tarefa");
    }

}

export async function createTask(req, res){
    try{
        const task = req.body;
        const newTask = await Task.create(task);
        return res.status(201).json(newTask);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Falha ao criar tarefa");
    }
}

export async function updateTask(req,res){
    
    try{
        const id = req.params.id;
        const task = await Task.findByPk(id);
        if(task){
            task.set(req.body);
            await task.save();
            return res.status(200).json(task);
        }
        return res.status(404).json("Tarefa não encontrada");
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Falha ao atualizar");
    }

}

export async function deleteTask(req,res){
    
    try{
        const id = req.params.id;
        const task = await Task.findByPk(id);

        if(task){
            await task.destroy();
            res.status(200).json(task); 
        }
        return res.status(404).json("Tarefa não encontrada");
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Falha ao deletar");
    }
    
}