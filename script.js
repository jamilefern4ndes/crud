const inputTitle = document.getElementById('title')  // input do título da tarefa
const saveTask = document.querySelector('#saveTask')  //botão de salvar tarefa


saveTask.addEventListener('click', ()=>{             //função
    const title = inputTitle.value                   //valor do título
    //console.log(title)
    localStorage.setItem(`task: ${title}`, title)    //salva o valor 
    updateSavedTasksLis(title)                      //mostra na lista lateral
})

function updateSavedTasksLis(title) {
    const taskSaved = document.querySelector('.list-tasks-saved')
    const p = document.createElement('p')  // cria um novo elemento <p>
    p.classList.add(title)
    p.textContent = title                  // define o texto do <p> como o título da tarefa
    taskSaved.appendChild(p)              // adiciona o <p> à lista lateral
}
