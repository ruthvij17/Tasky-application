
const state = {
    taskList: [],
}

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)

//Template for the card on screen
//element identifier key=
const htmlTaskContent = ({id,title,description,type,url}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info mr-3" name=${id}>
                    <i class="fa fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class="fa fa-trash-alt" name=${id}></i>
                </button>
            </div>

            <div class="card-body">
                ${url 
                    ?`<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                    :`<img width="100%" src="https://imgs.search.brave.com/vP12Jix8OyajdEksLOhYvhf9iArmiCUy89mNxo2CGO4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmVsZW1l/bnRvci5jb20vZG9j/cy9hc3NldHMvaW1n/L2VsZW1lbnRvci1w/bGFjZWhvbGRlci1p/bWFnZS5wbmc" />`
    }
                <h4 class="card-title task__card__title">${title
    }</h4>
                <p class="description trim-3-lines text-muted">${description}
                </p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask.apply(this, arguments)" id="${id}">Open task</button>
            </div>
        </div>
    </div>
`;


// Modal body on clicking open task

const htmlModalContent = ({id,title,description,url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${url 
        ?`<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
        :`<img width="100%" src="https://imgs.search.brave.com/vP12Jix8OyajdEksLOhYvhf9iArmiCUy89mNxo2CGO4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmVsZW1l/bnRvci5jb20vZG9j/cy9hc3NldHMvaW1n/L2VsZW1lbnRvci1w/bGFjZWhvbGRlci1p/bWFnZS5wbmc" />`
        }
    <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
    <h2 class="mb-3">${title}</h2>
    <p class="text-muted">${description}</p>
    </div>
    `;
};



//where we convert JSON to string.......this is for local storages
const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};


//where we convert string back to JSON.......rendering cards on the screen
const loadInitialData= () =>{
    const localStorageCopy =JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList =localStorageCopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContents.insertAdjacentHTML("beforeEnd",htmlTaskContent(cardDate));
    });
};

//when we update or edit we have to save
const handleSubmit=(event)=>{
    const id =`${Date.now()}`;
    const input={
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("tags").value,
        description: document.getElementById("taskDescription").value,
    };
    if (input.title==""||input.type==""||input.description==""){
        return alert("Please fill all the neccessary fields")
    }
    
    taskContents.insertAdjacentHTML("beforeEnd",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});
    
    updateLocalStorage();
};


const openTask=(e)=>{
    if(!e) e = window.event;

    const getTask =state.taskList.find(({id})=> id === e.target.id);
    taskModal.innerHTML=htmlModalContent(getTask);
}

//Delete task
const deleteTask=(e)=>{
    if(!e) e = window.event;

    const targetId= e.target.getAttribute("name");
    //console.log(targetId)
    const type= e.target.tagName;
    const removeTask= state.taskList.filter(({id})=> id!==targetId);
    //console.log(removeTask)
    updateLocalStorage();

    if(type==="BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild( 
            e.target.parentNode.parentNode.parentNode
        );
    }else if(type==="I"){
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild( 
            e.target.parentNode.parentNode.parentNode.parentNode
        );
    }
}








