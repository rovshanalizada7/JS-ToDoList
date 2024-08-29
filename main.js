const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".toDoInput");
const list = document.querySelector("ul");

toDoForm.addEventListener("click",addToDo);

function addToDo(e) {
 e.preventDefault();
 let data = JSON.parse(localStorage.getItem("toDo")) || [];
 if(!toDoInput.value.trim()) {
    alert("Please enter a value");
 }else {
    data.push(toDoInput.value);
 }
 localStorage.setItem("toDo", JSON.stringify(data));
 toDoInput.value = "";
 ToDoLists();
}



// add todos to the list 
function ToDoLists() {
    list.innerHTML = "";
    const todo = JSON.parse(localStorage.getItem("toDo")) || [];
      // or todo != []   
    if (todo.length > 0 ) {
     todo.forEach((item,index) => {
        list.innerHTML += `
        <li>
                <span>${item}</span> 
                <div class="icons">
                    <i class="fa-solid fa-pen" onclick="(getModal('${item}',${index}))" ></i>
                    <i style="margin-left: 1rem;" class="fa-solid fa-trash" onclick = "trash(${index})" ></i>
                </div>
         </li>
            `
     })
    }
    localStorage.setItem("toDo", JSON.stringify(todo));
}

ToDoLists()





// remove todos from the list 
function trash (index) {
 const todo = JSON.parse(localStorage.getItem("toDo")) || [];
 todo.splice(index, 1);
 localStorage.setItem("toDo", JSON.stringify(todo));
 ToDoLists()
}



// clear all todos from the list

document.querySelector(".clearAll").addEventListener("click", clearAll);
function clearAll () {
 localStorage.removeItem("toDo");
 ToDoLists()
}




// search todos in the list

function todos2 (todo) {
    list.innerHTML = "";
    todo.forEach((item,index) => {
        list.innerHTML += `
        <li>
                <span>${item}</span> 
                <div class="icons">
                    <i class="fa-solid fa-pen"></i>
                    <i style="margin-left: 1rem;" class="fa-solid fa-trash" onclick = "trash(${index})" ></i>
                </div>
         </li>
            `
     })
}


document.querySelector("#search").addEventListener("input", search);
function search (e) {
    const todo = JSON.parse(localStorage.getItem("toDo")) || [];
    const searchItems = e.target.value.toLowerCase()
    const filteredItems = todo.filter(item => item.toLowerCase().includes(searchItems))
    todos2(filteredItems)
}




// todos background color

const li = document.querySelectorAll("li")
li.forEach(item => {
    item.addEventListener("click",(e) => {
    if(item.style.backgroundColor == "white"){
        e.target.style.backgroundColor = "rgb(106, 167, 15)"
        e.target.style.color = "white"
        e.target.style.textDecoration = "line-through";
    } else {
         e.target.style.backgroundColor = "white"
         e.target.style.color = "black"
         e.target.style.textDecoration = "none";
    }
    })
})



// edit the list items



let modal = document.getElementById("modal-special")

function getModal(item, index) {
    console.log(item);
    modal.innerHTML = ""
    modal.innerHTML = `<i id="closeDetail" onclick="closedFunc()" class="fa-solid fa-x"></i>
     <input id="valNew" value="${item}" type="text">
     <button onclick="updatedFunc('${index}')">Save</button>`
    modal.style.display = "flex"
}
function closedFunc() {
    modal.style.display = "none"
}

function updatedFunc(index) {
    let newInputValue = document.getElementById("valNew").value
    let todo = JSON.parse(localStorage.getItem("todo")) || []
    console.log(newInputValue);
    if (!newInputValue.trim()) {
        alert("zehmet olmasa yeni deyeri daxil edin")
    } else {
        todo.splice(index, 1, `${newInputValue}`)
        // todo.forEach((item, i) => i == index ? todo.splice(i, 1, newInputValue) : null)
        console.log(todo);
    }
    localStorage.setItem("todo", JSON.stringify(todo))
    ToDoLists()
    closedFunc()
}

