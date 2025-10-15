
const inputTitle    = document.getElementById('title')            //entrada do título
const inputContent  = document.getElementById('content')          //entrada do conteúdo
//butões de ação
const shrinkList    = document.querySelector('#shrinkList')       //encolher lista
const saveTask      = document.querySelector('#saveTask')         //salvar tarefa
const deleteTask    = document.querySelector('#deleteTask')       //deletar tarefa
const newTask       = document.querySelector('#newTask')          //criar nova tarefa

//salvar nova tarefa
saveTask.addEventListener('click', saveThisTask) 
inputContent.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    saveThisTask()
  }
})

function saveThisTask(){
    const title = inputTitle.value.trim()
    const content = inputContent.value.trim()

    if (title === '' || content === '') {
      alert('Preencha título e conteúdo da tarefa.')   
      return
    }
    if (tasks.some(t => t.title === title)) {
    alert('Já existe uma tarefa com esse título.');
    return;
  }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push({ title, content })
    localStorage.setItem('tasks', JSON.stringify(tasks))

    updateSavedTasksList()

    inputTitle.value = ''
    inputContent.value = ''

    window.location.reload()
}

//atualiza a lista lateral com os títulos salvos
function updateSavedTasksList() {
    const taskSaved = document.querySelector('.list-tasks-saved')
    taskSaved.innerHTML = ''

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.forEach(task => {
      const p = document.createElement('p')
      p.setAttribute('class', 'saved')
      p.textContent = task.title

      //visualizar conteúdo ao clicar no título
      p.addEventListener('click', () => {
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
      inputTitle.value = task.title
      inputContent.value = task.content

      deleteTask.classList.toggle('buttons')
      newTask.style.display = 'inline-block' 
      deleteTask.style.display = 'inline-block'
      saveTask.style.display = 'none'
      actions(task)
    } else {
      alert('Tarefa não encontrada.')
    }
    
}
function actions(task) {
  //deletar tarefa
  deleteTask.onclick = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const updatedTasks = tasks.filter(t => t.title !== task.title)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    inputTitle.value = ''
    inputContent.value = ''
    saveTask.style.display = 'inline-block'
    deleteTask.style.display = 'none'
    newTask.style.display = 'none'

    updateSavedTasksList()
  }

  //nova tarefa
  newTask.onclick = () => {
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