const form = document.getElementById("form")
let taskList = document.getElementById("taskList")
let task = document.getElementById("task")
let date = document.getElementById("date")

// Form submit 
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  formValidate()
})

// form validate
const formValidate = () =>{

 if(task.value.trim()){
    console.log("success")
    acceptData()
 }else{
    document.querySelector(".errorMsg").textContent = "Task fields cannot be blank"
    console.log('failure')
 }
}

// Accept Data and Store
let data = [];
const acceptData = () =>{
    data.push({
        text:task.value,
        date:date.value
    })
    localStorage.setItem("data",JSON.stringify(data))
    createTask()
}

// Create Task
const createTask = () =>{
  taskList.innerHTML = ""
  if(data.length > 0){
       data.forEach((todo,index)=>{
    return (taskList.innerHTML += `
      <div id=${index} class="alert alert-light shadow d-flex justify-content-between align-items-center px-5">
              <span class="taskText d-flex flex-column">
                <p>${todo.text}</p>
                <small>${todo.date}</small>
              </span>
              <span class="taskAction">
                <i onClick="editTask(this)" class="fas fa-edit p-2"></i>
                <i onClick="deleteTask(this)" class="fas fa-trash p-2"></i>
              </span>
            </div>
    `)
  })
  }else{
    return (taskList.innerHTML +=`
      
         <p class="text-center">OOOPS! No todo task</p>
    `)
  }
  resetForm()
}
// Delete Task
const deleteTask = (e) =>{
   e.parentElement.parentElement.remove()
   const taskId = e.parentElement.parentElement.id
   data.splice(taskId,1)
   localStorage.setItem("data",JSON.stringify(data))
}
// Edit Task
const editTask = (e) =>{
    const selectTask = e.parentElement.parentElement
    task.value = selectTask.children[0].children[0].innerHTML
    date.value =selectTask.children[0].children[1].innerHTML
    deleteTask()
}
// Reset forms
const resetForm = ()=>{
    task.value = ""
    date.value = ""
}

(()=>{
    data = JSON.parse(localStorage.getItem("data"))|| []
    createTask()
    console.log(data)
})()