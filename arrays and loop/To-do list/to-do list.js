
const ToDoList = JSON.parse(localStorage.getItem('List')) || [{name :'washing', duedate: '14/11/23' }, {name:'clotthing',duedate:'13/11/23'}];
rendertodolist();
function rendertodolist() {

    let todolistHTML = '';
    
    for (let i = 0; i < ToDoList.length; i++) {

        const todoOject = ToDoList[i];
        const { name }= todoOject;
        const { duedate } = todoOject;
        const html = 
        `<p class = "p-loop">
        <input type="checkbox" class ="js-check">
        ${name} <span>${duedate}</span>
        <button onclick ="ToDoList.splice(${i},1); rendertodolist(); store();" class = "js-delete"> Delete </button> 
        </p>`;
        todolistHTML = todolistHTML + html;

    }
    document.querySelector('.js-loop').innerHTML = todolistHTML
}


function todofunc() {
    
    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value;
    
    const dateinputElement = document.querySelector('.js-date');
    const duedate = dateinputElement.value;
    
    
    console.log(ToDoList)
    
    if(inputElement.value === ''){
        ToDoList.push({name :'Empty template', duedate});
    }else{
        ToDoList.push({ name , duedate});
    }
    
    
    inputElement.value = '';
    
    rendertodolist()
    store();
}

function store(){
localStorage.setItem('List', JSON.stringify(ToDoList));// it will we the we play and score is decided
}

function CostKeydown(event) {
    if (event.key === 'Enter') {
        todofunc();
    }
}