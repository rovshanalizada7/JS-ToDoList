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
                    <i class="fa-solid fa-pen" onclick ="edit()" ></i>
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












































// let data = JSON.parse(localStorage.getItem("todolist")) || []; 

// addToDo(data);

// toDoForm.addEventListener("submit", getForm);

// function getForm(e) {
//     e.preventDefault();
//     data.push(toDoInput.value);
//     toDoInput.value = '';
//     saveData();
// }

// function addToDo(data) {
//     list.innerHTML = "";
//     data.map((item, index) => {
//         list.innerHTML += `
//          <li>
//                 <span>${item}</span> 
//                 <div class="icons">
//                     <i class="fa-solid fa-pen"></i>
//                     <i style="margin-left: 1rem;" class="fa-solid fa-trash" onclick="trash(${index})"></i>
//                 </div>
//         </li>
//         `
//     });

//     // Add click event listener to each list item
//     const listItems = document.querySelectorAll("li");
//     listItems.forEach(li => {
//         li.addEventListener("click", (e) => {
//             e.target.style.backgroundColor = "green";
//             e.target.style.color = "white";
//             e.target.style.textDecoration = "line-through";
//         });
//     });
// }

// // Function to save data to localStorage and update the list
// function saveData() {
//     localStorage.setItem("todolist", JSON.stringify(data));
//     addToDo(data); 
// }

// // Clear all lists
// document.querySelector(".clearAll").addEventListener("click", totalTrash);
// function totalTrash() {
//     data = [];
//     saveData();
// }

// // Delete each element
// function trash(index) {
//     data.splice(index, 1);
//     saveData();
// }

// // Search elements
// document.querySelector("#search").addEventListener("input", search);
// function search(e) {
//     const searchTerm = e.target.value.toLowerCase();
//     const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));
//     addToDo(filteredData);
// }
