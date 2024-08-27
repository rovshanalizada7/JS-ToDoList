const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".toDoInput");
const list = document.querySelector("ul");

let data = JSON.parse(localStorage.getItem("todolist")) || []; 

addToDo(data);

toDoForm.addEventListener("submit", getForm);

function getForm(e) {
    e.preventDefault();
    data.push(toDoInput.value);
    toDoInput.value = '';
    saveData();
}

function addToDo(data) {
    list.innerHTML = "";
    data.map((item, index) => {
        list.innerHTML += `
         <li>
                <span>${item}</span> 
                <div class="icons">
                    <i class="fa-solid fa-pen"></i>
                    <i style="margin-left: 1rem;" class="fa-solid fa-trash" onclick="trash(${index})"></i>
                </div>
        </li>
        `
    });

    // Add click event listener to each list item
    const listItems = document.querySelectorAll("li");
    listItems.forEach(li => {
        li.addEventListener("click", (e) => {
            e.target.style.backgroundColor = "green";
            e.target.style.color = "white";
            e.target.style.textDecoration = "line-through";
        });
    });
}

// Function to save data to localStorage and update the list
function saveData() {
    localStorage.setItem("todolist", JSON.stringify(data));
    addToDo(data); 
}

// Clear all lists
document.querySelector(".clearAll").addEventListener("click", totalTrash);
function totalTrash() {
    data = [];
    saveData();
}

// Delete each element
function trash(index) {
    data.splice(index, 1);
    saveData();
}

// Search elements
document.querySelector("#search").addEventListener("input", search);
function search(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));
    addToDo(filteredData);
}
