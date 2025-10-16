
const inputTitle    = document.getElementById('title')            //entrada do título
const inputContent  = document.getElementById('content')          //entrada do conteúdo
//butões de ação
const shrinkList    = document.querySelector('#shrinkList')       //encolher lista
const saveTask      = document.querySelector('#saveTask')         //salvar tarefa
const deleteTask    = document.querySelector('#deleteTask')       //deletar tarefa
const newTask       = document.querySelector('#newTask')          //criar nova tarefa


saveTask.addEventListener('click', saveThisTask) 
inputContent.addEventListener('keydown', function(event) {       //salvar nova tarefa no click ou no enter
  if (event.key === 'Enter') {
    saveThisTask()
  }
})
function saveThisTask(){
    const title = inputTitle.value.trim()             //pegar os dados digitados
    const content = inputContent.value.trim()
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []      //salvar array no localStorage
    
    if (title === '' || content === '') {
      alert('Preencha título e conteúdo da tarefa.')   
      return
    }                                                     //ações para evitar duplicação e áreas vazias

    if (tasks.some(t => t.title === title)) {
    alert('Já existe uma tarefa com esse título.');
    return;
    }

    
    tasks.push({ title, content })
    localStorage.setItem('tasks', JSON.stringify(tasks))     //armazenando a nova tarefa 

    updateSavedTasksList()                  //atualizando lista de tarefas 

    inputTitle.value = ''
    inputContent.value = ''

    window.location.reload()
}

//atualiza a lista lateral com os títulos salvos
function updateSavedTasksList() {
    const taskSaved = document.querySelector('.list-tasks-saved')     //limpa a lista para novos dados
    taskSaved.innerHTML = ''

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []     //pega os itens para exibição

    tasks.forEach(task => {
      const p = document.createElement('p')
      p.setAttribute('class', 'saved')                  //cria o <p> para exibir os títulos
      p.textContent = task.title

      p.addEventListener('click', () => {               //visualizar conteúdo ao clicar no título
        leadTask(task.title)
      })

      taskSaved.appendChild(p)
    })
}

//carrega título e conteúdo 
function leadTask(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [] 
    const task = tasks.find(t => t.title === title)
                                                        
    if (task) {
      inputTitle.value = task.title                       //possibilita a leitura das tarefas salvas
      inputContent.value = task.content

      newTask.style.display = 'inline-block' 
      deleteTask.style.display = 'inline-block'       //mostra os botões conforme necessidade
      saveTask.style.display = 'none'
      actions(task)
    } else {
      alert('Tarefa não encontrada.')
    }
    
}

function actions(task) {
  
  deleteTask.onclick = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []         //deletar tarefa
    const updatedTasks = tasks.filter(t => t.title !== task.title)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    inputTitle.value = ''
    inputContent.value = ''
    saveTask.style.display = 'inline-block'
    deleteTask.style.display = 'none'
    newTask.style.display = 'none'

    updateSavedTasksList()
  }

    newTask.onclick = () => {                       //nova tarefa
    inputTitle.value = ''
    inputContent.value = ''
    saveTask.style.display = 'inline-block'
    deleteTask.style.display = 'none'
    newTask.style.display = 'none'
  }
}

//encolher a lista de itens salvos
shrinkList.addEventListener('click', () => {
  //mudar botão
    if (shrinkList.textContent === '>') {
        shrinkList.textContent = '<'
        document.querySelector('.tasks').style.display = 'block'   //recolher lista
    } else {
        shrinkList.textContent = '>'
        document.querySelector('.tasks').style.display = 'none'
    }

    const container = document.querySelector('.container')         //mostrar lista
    container.classList.toggle('move')
});


//carrega a lista ao abrir a página
window.addEventListener('load', updateSavedTasksList)