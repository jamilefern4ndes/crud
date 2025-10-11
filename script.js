const inputTitle = document.getElementById('title')
const inputContent = document.getElementById('content')
const saveTask = document.querySelector('#saveTask')

// Salvar nova tarefa
saveTask.addEventListener('click', () => {
  const title = inputTitle.value.trim()
  const content = inputContent.value.trim()

  if (title === '' || content === '') {
    alert('Preencha título e conteúdo da tarefa.')
    return
  }

  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.push({ title, content })
  localStorage.setItem('tasks', JSON.stringify(tasks))

  updateSavedTasksList()

  inputTitle.value = ''
  inputContent.value = ''
})

// Atualiza a lista lateral com os títulos salvos
function updateSavedTasksList() {
  const taskSaved = document.querySelector('.list-tasks-saved')
  taskSaved.innerHTML = ''

  const tasks = JSON.parse(localStorage.getItem('tasks')) || []

  tasks.forEach((task, index) => {
    const p = document.createElement('p')
    p.setAttribute('class', 'saved')
    p.textContent = task.title

    // Adiciona botão de exclusão
    deleteTask(p, index)

    taskSaved.appendChild(p)
  })
}

// Função para criar botão de exclusão
function deleteTask(p, index) {
  const buttonDeleteTask = document.createElement('div')
  buttonDeleteTask.setAttribute('class', 'delete-button')
  buttonDeleteTask.textContent = 'X'
  buttonDeleteTask.title = 'Excluir tarefa'

  buttonDeleteTask.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    updateSavedTasksList()
  })

  p.appendChild(buttonDeleteTask)
}

// Carrega a lista ao abrir a página
window.addEventListener('load', updateSavedTasksList)