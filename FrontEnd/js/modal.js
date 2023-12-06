const modalContainer = document.querySelector(".modal");
const modal2 = document.querySelector('.modal2');
const modal1 = document.querySelector('.modal1');
let elements = JSON.parse(window.localStorage.getItem('elements'));

let elementsGenerated = false; 
export function openmodal(e){
    e.preventDefault()
    modalContainer.style.display = "flex";
    modal1.style.display = "flex";
    modal2.style.display = "none";
    //verification si les elements sont deja generé ou non 
    if (!elementsGenerated) {
      generateWorksEdit(elements);
      elementsGenerated = true;
    }
}

const closeBtn = document.querySelector(".close-modal");
closeBtn.addEventListener('click', function() {
  console.log('click')
  modalContainer.style.display = "none";
});

//fermeture de la modal au click au dehors de celle ci
window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
}

function generateWorksEdit(elements){
  const gallery = document.querySelector('.edit-gallery');
  for(const element of elements){
    const containerImg = document.createElement("div")
    containerImg.classList.add('container-img')
    gallery.appendChild(containerImg)

    const pieceElement = document.createElement('img');
    pieceElement.classList.add("img-card-edit")
    pieceElement.src = element.imageUrl;

    const deleteIcon =  document.createElement('img')
    deleteIcon.classList.add("delete-icon")

    containerImg.appendChild(pieceElement)
    containerImg.appendChild(deleteIcon)
    containerImg.setAttribute('data-element-id', element.id);

    deleteIcon.addEventListener('click', function() {
      containerImg.remove();
      removeItem(element.id); 
    })
  }
}

function removeItem(elementId) {
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
 
const addButton = document.querySelector(".add-button")
addButton.addEventListener("click", function(){
  modal2.style.display = "flex";
  modal1.style.display = "none";
})
const previewBtn = document.querySelector('.preview');
previewBtn.addEventListener('click', function(){
  console.log('test')
})









  




