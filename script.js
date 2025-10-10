const inputTitle = document.getElementById('title')       //input do título
const inputContent = document.getElementById('content')   //input do conteúdo
const saveTask = document.querySelector('#saveTask')      //botão de salvar

saveTask.addEventListener('click', () => {   //evento click
    const title = inputTitle.value.trim()
    const content = inputContent.value.trim()

    if (title === '' || content === '') {
        alert('Preencha título e conteúdo da tarefa.')       //garante que tenha um conteúdo sempre
        return
    }
 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [] //recupera array ou cria um novo
    tasks.push({ title, content })                         
    localStorage.setItem('tasks', JSON.stringify(tasks))  //salva array no localstorage

    updateSavedTasksList()                             //atualiza a lista lateral

    inputTitle.value = ''                             //limpa os campos
    inputContent.value = ''
})

//atualiza a lista lateral com os títulos salvos
function updateSavedTasksList() {
    const taskSaved = document.querySelector('.list-tasks-saved')
    taskSaved.innerHTML = ''                                      //limpa a lista antes de atualizar

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.forEach(task => {
    const p = document.createElement('p')
    p.setAttribute('class', 'saved')
    p.textContent = task.title              //mostra o título da tarefa
    taskSaved.appendChild(p)
  })
}

//carrega a lista ao abrir a página
window.addEventListener('load', updateSavedTasksList)
