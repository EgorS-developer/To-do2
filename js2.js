let input = null;
let valueInput = "";
let allTasks = []
let tempIndex = -1;
let valueInputChange = "";
// 
// дом.задание  ==== сделать так, чтоб добавллись таски на кнопку Enter + добавить зачеркивание выполненной таски

window.onload = async function init(){

const response =await fetch("http://localhost:8000/allTasks", {method:"GET"})
const result= await response.json()
allTasks = result.data


  input = document.getElementById("text-task");
  input.addEventListener("change", updateValue);
  input.addEventListener("keyup", Enter)

  const addTaskButton = document.getElementById("add-task");
  addTaskButton.addEventListener("click", addTask);

  const resetTaskButton = document.getElementById("reset-task");
  resetTaskButton.addEventListener("click", resetButton);
  render()
};

const updateValue = (event) => {
  valueInput = event.target.value;
};

const addTask = async () => {
  if (valueInput === "") {
    alert("Ты долбоеб, не клацай пустые значения!!!");
  } else {
    allTasks.push({ text: valueInput, isCheck: false });
    const response = await fetch("http://localhost:8000/createTask", {
      method:"POST",
      headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
      },
       body:JSON.stringify({ text: valueInput, isCheck: false })
      })
    valueInput = "";
    input.value = "";
    render();
  }
};
const Enter = (event) => {
  if (event.keyCode === 13) {
    addTask()
  }

}

const editTask = (index) => {
  tempIndex = index;

  render();
};

const deleteTask = async (_id) => {
  const response = await fetch("http://localhost:8000/deleteFail", {
    method:"DELETE",
    headers:{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    },
     body:JSON.stringify({taskId:_id})
    })
  render();
};

const resetButton = () => {
  allTasks = [];
  localStorage.clear()
  render();
};

const doneTask = async (item1) => {
  // allTasks[tempIndex].text = valueInputChange;
let item = {...item1,text:valueInputChange}
  const response = await fetch("http://localhost:8000/changFail",{
  method:"PATCH",
    headers:{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    },
    body:JSON.stringify(item)
})
  const result= await response.json()
  console.log(result)
  allTasks = result
   tempIndex = -1;
  // localStorage.setItem("allTasks", JSON.stringify(allTasks))
  render();
};

const updateValueChange = (event) => {
  valueInputChange = event.target.value;
};

const cancelTask = () => {
  tempIndex = -1;
  render();
};

const changeCheckbox = async (item1) => {
  let item = {...item1,isCheck:!item1.isCheck}
  const response = await fetch("http://localhost:8000/changFail",{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    },
    body:JSON.stringify(item)
})
  // allTasks[index].isCheck = !allTasks[index].isCheck;
  // localStorage.setItem("allTasks", JSON.stringify(allTasks))
  const result= await response.json()
  console.log(result)
  allTasks = result
  render();

};

const render = () => {
  let container = document.getElementById("all-tasks");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  allTasks.sort((a, b) => {
    if (a.isCheck < b.isCheck) {
      return -1;
    }
    if (a.isCheck > b.isCheck) {
      return 1;
    }
    return 0;
  });

  allTasks.map((item, index) => {
    let task = document.createElement("div");
    task.id = `item-${index}`;
    task.className = "task";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;
    checkbox.addEventListener("change", () => changeCheckbox(item));
    task.appendChild(checkbox);

    if (tempIndex === index) {
      let changeInput = document.createElement("input");
      changeInput.value = item.text;
      changeInput.className = "change-input";
      changeInput.addEventListener("change", updateValueChange);
      task.appendChild(changeInput);

      let imageContainerChange = document.createElement("div");
      imageContainerChange.className = "image-container";

      let imageDone = document.createElement("img");
      imageDone.src = "./done.png";
      imageDone.addEventListener("click",()=> doneTask(item));
      imageContainerChange.appendChild(imageDone);

      let imageCancel = document.createElement("img");
      imageCancel.src = "./cancel.png";
      imageCancel.addEventListener("click", cancelTask);
      imageContainerChange.appendChild(imageCancel);

      task.appendChild(imageContainerChange);
    } else {
      let paragraf = document.createElement("p");
      paragraf.innerText = item.text;
      paragraf.className = item.isCheck ? "paragraf-complete" : ""
      task.appendChild(paragraf);

      let imageContainer = document.createElement("div");
      imageContainer.className = "image-container";

      let imageEdit = document.createElement("img");
      imageEdit.src = "./edit.png";
      imageEdit.addEventListener("click", () => editTask(index));
      imageContainer.appendChild(imageEdit);

      let imageDelete = document.createElement("img");
      imageDelete.src = "./delete.png";
      imageDelete.addEventListener("click", () => deleteTask(item._id));
      imageContainer.appendChild(imageDelete);

      task.appendChild(imageContainer);
    }

    container.appendChild(task);
  });
};






// // 1 метод записивыет данные в харнилище
// // Ключ значение
// //  вторым аргументом передаётся сторка или JSON обьект или массив
// localStorage.setItem("test", "test15")
// localStorage.setItem("allTasks", JSON.stringify([{ id: 1, name: "egor" }]))


// 2 // метод получения данных из хранилища
// // передаётся только название ключа который хотим получить
// let testLocal = localStorage.getItem("allTasks")
// let testLocalPars = JSON.parse(testLocal)
// // console.log(testLocalPars)
// // 2 вариант
// // // let testLocal = JSON.parse(localStorage.getItem("allTasks"))

// // 3 метод удалени одной записи из хранилища
// // принимает название ключа который надо удалить
// // localStorage.removeItem("test")


// // // 4 метод очищает полность все хранилище
// // localStorage.clear()


// // 5 не совсем метод
// // узнать сколько записей  в хранилище
// console.log(localStorage.length)
