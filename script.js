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

  tasks.forEach(task => {
    const p = document.createElement('p')
    p.setAttribute('class', 'saved')
    p.textContent = task.title

    // Visualizar conteúdo ao clicar no título
    p.addEventListener('click', () => {
      leadTask(task.title)
    })

    taskSaved.appendChild(p)
  })
}

// Carrega título e conteúdo nos inputs
function leadTask(title) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const task = tasks.find(t => t.title === title)

  if (task) {
    inputTitle.value = task.title
    inputContent.value = task.content
  } else {
    alert('Tarefa não encontrada.')
  }
}

// Carrega a lista ao abrir a página
window.addEventListener('load', updateSavedTasksList)