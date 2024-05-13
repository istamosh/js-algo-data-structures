const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// This array will store all the tasks along with their associated data, including title, due date, and description. This storage will enable you to keep track of tasks, display them on the page, and save them to localStorage.
// If you add, update, or remove a task, it should reflect in the UI. However, that's not happening now because you have yet to retrieve the tasks. To do this, you need to modify your initial taskData to be an empty array.
// Set taskData to the retrieval of data from local storage or an empty array. Make sure you parse the data coming with JSON.parse() because you saved it as a string.
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// This variable will be used to track the state when editing and discarding tasks.
let currentTask = {};

// enhance code readability and maintainability by refactoring the submit event listener into two separate functions. The first function can be used to add the input values to taskData, while the second function can be responsible for adding the tasks to the DOM.
const addOrUpdateTask = () => {
  // When add new task, the button will show Update Task, it should be Add Task
  addOrUpdateTaskBtn.innerText = "Add Task";

  // You will need to determine whether the task being added to the taskData array already exists or not. If the task does not exist, you will add it to the array. If it does exist, you will update it. To accomplish this, you can use the findIndex() method.
  // finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1.
  // check if the id property of item is strictly equal to the id property of currentTask.
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // retrieve the values from the input fields and store them
  // convert it to lowercase, and then use the split() and join() methods to hyphenate it.
  // To make the id more unique, add another hyphen and use Date.now().
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  //   console.log(taskObj);

  // check if dataArrIndex is already empty
  if (dataArrIndex === -1) {
    // unshift() is an array method that is used to add one or more elements to the beginning of an array.
    taskData.unshift(taskObj);
  }
  // At this point, editing a task won't reflect when you submit the task. To make the editing functional, go back to the if statement inside the addOrUpdateTask function.
  else {
    taskData[dataArrIndex] = taskObj;
  }

  // use setItem() to save the tasks with a key of data, then pass the taskData array as its argument. Ensure that you stringify the taskData.
  localStorage.setItem("data", JSON.stringify(taskData));

  // call the updateTaskContainer and reset funct
  updateTaskContainer();
  reset();
};

// refactor for the code readability
const updateTaskContainer = () => {
  // There's a problem. If you add a task, and then add another, the previous task gets duplicated
  // This means you need to clear out the existing contents of tasksContainer before adding a new task.
  tasksContainer.innerHTML = "";

  // display the task on the page by looping through it.
  // Use forEach() on taskData, then destructure id, title, date, description as the parameters
  // don't forget to bundle innerHTML from destructured object (using "()" sign)
  // To enable editing and deleting for each task, add an onclick attribute to both buttons.
  // "this" is a keyword that refers to the current context. In this case, "this" points to the element that triggers the event – the buttons.
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
            <p><strong>Title:</strong>${title}</p>
            <p><strong>Date:</strong>${date}</p>
            <p><strong>Description:</strong>${description}</p>
            <button type="button" class="btn" onclick="editTask(this)">Edit</button>
            <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
        </div>
        `;
  });
};

// create deleteTask() with buttonEl as param
const deleteTask = (buttonEl) => {
  // set its value using the findIndex() method on the taskData array.
  // Pass item as the parameter for the arrow callback function,
  // and within the callback, check if the id of item is equal to the id of the parentElement of buttonEl.
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Use the remove() method to remove the parentElement of the buttonEl from the DOM
  buttonEl.parentElement.remove();
  // dataArrIndex is the index to start and 1 is the index number of items to remove.
  taskData.splice(dataArrIndex, 1);

  // You also want a deleted task to be removed from local storage.
  // For this, you don't need the removeItem() or clear() methods.
  // Since you already use splice() to remove the deleted task from taskData,
  // all you need to do now is save taskData to local storage again.
  // Use setItem() to save the taskData array again.
  // Pass in data as the key and ensure that taskData is stringified before saving
  localStorage.setItem("data", JSON.stringify(taskData));
};

// As you did in the deleteTask function, you need to find the index of the task to be edited.
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Use square bracket notation to retrieve the task to be edited from the taskData array using the dataArrIndex.
  // Then, assign it to the currentTask object to keep track of it.
  currentTask = taskData[dataArrIndex];

  // Stage it for editing inside the input fields
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

// Instead of clearing the input fields one by one, it's a good practice to create a function that handles clearing those fields
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";

  taskForm.classList.toggle("hidden");
  // at this point, currentTask will be filled with the task the user might have added.
  currentTask = {};
};

// You've retrieved the task item(s) now, but they still don't reflect in the UI when the page loads. However, they appear when you add a new task.
// You can check if there's a task inside taskData using the length of the array. Because 0 is a falsy value all you need for the condition is the array length.
// Check if there's a task inside taskData, then call the updateTaskContainer() inside the if statement block.
if (taskData.length) {
  updateTaskContainer();
}

// Add an event listener to the openTaskFormBtn element and pass in a click event for the first argument and an empty callback function for the second argument.
// add and remove classes from an element with el.classList.add() and el.classList.remove(), Another method to use with the classList property is the toggle method.
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// This will display a modal with the Discard and Cancel buttons.
closeTaskFormBtn.addEventListener("click", () => {
  // confirmCloseDialog.showModal();

  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  // check if titleInput is not equal currentTask title, or dateInput is not equal...
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  // If formInputsContainValues is true, indicating that there are changes, use the showModal() method on confirmCloseDialog.
  // add formInputValuesUpdated as the second mandatory condition in the if statement using the AND operator.
  // This way, the Cancel and Discard buttons in the modal won't be displayed to the user if they haven't made any changes to the input fields while attempting to edit a task.
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// If the user clicks the Cancel button, you want to cancel the process and close the modal so the user can continue editing
// The HTML dialog element has a close() method that can be used to close a modal dialog box on a web page.
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// If the user clicks the Discard button, you want to close the modal showing the Cancel and Discard buttons, then hide the form modal.
// Add a click event listener to discardBtn, then use the close() method on the confirmCloseDialog variable. Also, use classList to toggle the class hidden on taskForm so the form modal will close too.
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  // call the reset function instead. That's because when you click the Discard button, everything in the input fields should go away.
  reset();
});

// stop the browser from refreshing the page after submitting the form.
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // remove the reset() call inside the taskForm submit event listener and call the addOrUpdateTask function instead.
  addOrUpdateTask();
});

// mock task data
// const myTaskArr = [
//     { task: 'Walk the Dog', date: '22-04-2022'},
//     { task: 'Read some books', date: '02-11-2023'},
//     { task: 'Watch football', date: '10-08-2021'},
// ]

// // localStorage offers methods for saving, retrieving, and deleting items. The items you save can be of any JavaScript data type.
// // the setItem() method is used to save an item,
// // and the getItem() method retrieves the item.
// // To delete a specific item, you can utilize the removeItem() method,
// // or if you want to delete all items in the storage, you can use clear().
// // Use the setItem() method to save it with a key of data.
// // After that, open your browser console and go to the Applications tab, select Local Storage, and look for Key named 'data'
// // you'll notice a series of [object Object]. This is because everything you save in localStorage needs to be in string format.
// // To resolve the issue, wrap the data you're saving in the JSON.stringify() method.
// localStorage.setItem('data', JSON.stringify(myTaskArr));

// // Remove the data item from local storage and open the console to observe the result. You should see null.
// // localStorage.removeItem('data');
// localStorage.clear();

// // Now that you have the myTaskArr array saved in localStorage correctly, you can retrieve it with getItem() by specifying the key you used to save the item.
// const getTaskArr = localStorage.getItem('data');
// console.log(getTaskArr);

// // view it in its original form before saving, you need to use JSON.parse().
// const getTaskArrObj = JSON.parse(localStorage.getItem('data'));
// console.log(getTaskArrObj);
