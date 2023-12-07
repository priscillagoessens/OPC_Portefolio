import { elements , generateWorks } from "./main.js";
const modalContainer = document.querySelector(".modal");
const modal2 = document.querySelector('.modal2');
const modal1 = document.querySelector('.modal1');

export function openmodal(e){
    e.preventDefault()
    modalContainer.style.display = "flex";
    modal1.style.display = "flex";
    modal2.style.display = "none";
    generateWorks(elements);
}

const closeBtn = document.querySelector(".close-modal");
closeBtn.addEventListener('click', function() {
  modalContainer.style.display = "none";
});

//fermeture de la modal au click au dehors de celle ci
window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
}

export function removeItem(elementId) {
  const accessToken = window.localStorage.getItem('userToken');
  fetch(`http://localhost:5678/api/works/${elementId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      },
  })
  .catch(error => {
      console.error('Erreur lors de la suppression :', error);
  });
}
 //bouton ajouter
const addButton = document.querySelector(".add-button")
addButton.addEventListener("click", function(){
  modal2.style.display = "flex";
  modal1.style.display = "none";
})
//bouton preview
const previewBtn = document.querySelector('.preview');
previewBtn.addEventListener('click', function(){
  modal2.style.display = "none";
  modal1.style.display = "flex";
})









  




