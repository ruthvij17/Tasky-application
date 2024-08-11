// var state{
//     taskList:[
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//         }
//     ]
// };


const state = {
    taskList: [],
}

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)

//Template for the card on screen
//element identifier key=
const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info mr-1.5" name=${id}>
                    <i class="fa fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id}>
                    <i class="fa fa-trash-alt" name=${id}></i>
                </button>
            </div>

            <div class="card-body">
                ${url &&
    '<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />'
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
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open task</button>
            </div>
        </div>
    </div>
`;


// Modal body on clicking open task

const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${url &&
        '<img width="100%" src=${url} alt="Card Image" class="img-fluid mb-3" />'
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
    const localStorageCopy =JSON.parse(localStorage.tasks);

    if(localStorageCopy) state.taskList =localStorageCopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContents.innerAdjacentHTML("beforeEnd",htmlTaskContent(cardDate));
    })
}

//when we update or edit we have to save
const handleSubmit=(event)=>{
    const id =`${Date.now()}`;
    const input={
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        tags:document.getElementById("tags").value,
        taskDescription:document.getElementById("taskDescription").value,
    };
    taskContents.innerAdjacentHTML("beforeEnd",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});
    
    updateLocalStorage();
};