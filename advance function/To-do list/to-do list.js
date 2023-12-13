
const ToDoList = JSON.parse(localStorage.getItem('List')) || [{ name: 'washing', duedate: '14/11/23' }, { name: 'clotthing', duedate: '13/11/23' }];
rendertodolist();
function rendertodolist() {

    let todolistHTML = '';
    ToDoList.forEach((todoOject, i) => {
        const { name, duedate } = todoOject;
        const html =
            `<p class = "p-loop">
        <input type="checkbox" class ="js-check">
        ${name} <span>${duedate}</span>
        <button  class = "js-delete delete-btn"> Delete </button> 
        </p>`;
        todolistHTML = todolistHTML + html;

    });
    document.querySelector('.js-loop').innerHTML = todolistHTML
    document.querySelectorAll('.delete-btn').forEach((delete_btn, i) => { 
        delete_btn.addEventListener('click', () => {
            console.log(i)
             ToDoList.splice(i, 1); 
             rendertodolist(); 
            //  store();
             }) 
            })
    // console.log(document.querySelectorAll('.delete-btn'));
}

function todofunc() {

    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value;

    const dateinputElement = document.querySelector('.js-date');
    const duedate = dateinputElement.value;


    // console.log(ToDoList)

    if (inputElement.value === '') {
        ToDoList.push({ name: 'Empty template', duedate });
    } else {
        ToDoList.push({ name, duedate });
    }


    inputElement.value = '';

    rendertodolist()
    store();
}

function store() {
    localStorage.setItem('List', JSON.stringify(ToDoList));// it will we the we play and score is decided
}

function CostKeydown(event) {
    if (event.key === 'Enter') {
        todofunc();
    }
}
document.querySelector('.js-btn').addEventListener('click', () => { todofunc() })
document.querySelector('.js-input').addEventListener('keydown', () => { CostKeydown() })