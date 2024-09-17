const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal);

//Template for the card on screen
//element identifier key=
const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info mr-3" name=${id} onclick="editTask.apply(this, arguments)" style="margin-right:20px;">
                    <i class="fa fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class="fa fa-trash-alt" name=${id}></i>
                </button>
            </div>

            <div class="card-body">
                ${
                  url
                    ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                    : `<img width="100%" src="https://imgs.search.brave.com/vP12Jix8OyajdEksLOhYvhf9iArmiCUy89mNxo2CGO4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmVsZW1l/bnRvci5jb20vZG9j/cy9hc3NldHMvaW1n/L2VsZW1lbnRvci1w/bGFjZWhvbGRlci1p/bWFnZS5wbmc" />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
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

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
    <div id=${id}>
    ${
      url
        ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
        : `<img width="100%" src="https://imgs.search.brave.com/vP12Jix8OyajdEksLOhYvhf9iArmiCUy89mNxo2CGO4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmVsZW1l/bnRvci5jb20vZG9j/cy9hc3NldHMvaW1n/L2VsZW1lbnRvci1w/bGFjZWhvbGRlci1p/bWFnZS5wbmc" />`
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
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeEnd", htmlTaskContent(cardDate));
  });
};

//when we update or edit we have to save
const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  if (input.title == "" || input.type == "" || input.description == "") {
    return alert("Please fill all the neccessary fields");
  }

  taskContents.insertAdjacentHTML(
    "beforeEnd",
    htmlTaskContent({ ...input, id })
  );
  state.taskList.push({ ...input, id });

  updateLocalStorage();
  clear_input();
};

const clear_input = () => {
  let clr = document.getElementsByClassName("clear");
  for (i = 0; i < clr.length; i++) {
    clr[i].value = "";
  }
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

//Delete task
const deleteTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  //console.log(targetId)
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({ id }) => id !== targetId);
  //console.log(removeTask[targetId]);
  state.taskList = removeTask;
  //localStorage.removeItem(state.taskList.targetId);
  updateLocalStorage();

  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  } else if (type === "I") {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

//edit task
const editTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  // taskTitle=parentNode.childNodes[3].childNodes[5].childNodes[7];
  // console.log(taskTitle);

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];

  //     console.log(taskTitle);
  //     console.log(taskDescription);
  //     console.log(taskType);
  //     console.log(submitButton);

  taskTitle.setAttribute("contentEditable", "true");
  taskDescription.setAttribute("contentEditable", "true");
  taskType.setAttribute("contentEditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this,arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

// save edit
const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode.childNodes);

  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentNode.childNodes[5].childNodes[1];

  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  let stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetId
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  );
  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contentEditable", "false");
  taskDescription.setAttribute("contentEditable", "false");
  taskType.setAttribute("contentEditable", "false");

  submitButton.setAttribute("onclick", "openTask.apply(this,arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open task";
};

const searchTask = (e) => {
  if (!e) e = window.event;

  // Clear the current task list display
  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const searchTerm = e.target.value.toLowerCase();

  // Filter tasks based on the search term
  const resultData = state.taskList.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm)
  );

  if (searchTerm === "" || resultData.length > 0) {
    // If the search term is empty or there are matching tasks, display them
    resultData.map((cardData) =>
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
    );
  } else {
    // If no tasks match, display a 'No tasks found' message
    taskContents.innerHTML = `<h5 class="text-center mt-3">No tasks found</h5>`;
  }
};
