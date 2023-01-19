const testFunction = () => {
  console.log()
}




const keyDownInput = () => {
  console.log("KeyDown")
}








// алгоритм действий //
//создаешь window.onload //
window.onload = function init() {
  // сщзадем переменную и прировняли//
  const inputMain = document.getElementById("input-main");
  inputMain.addEventListener("change", changeInput)
  inputMain.addEventListener("keyup", keyUpInput)
}
const changeInput = (evetn) => {
  console.log(evetn.target.value)
}
// получить значение инпута//



const keyUpInput = () => {
  console.log("keyUp")
}
