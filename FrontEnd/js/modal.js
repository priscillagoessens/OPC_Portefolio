import { elements, fetchDatas, categorys, generateWorks } from "./utils.js";
import { modalContainer, showModal, addModal} from "./variables.js";

const closeBtn = document.querySelector(".close-modal");
const addBtn = document.querySelector(".add-button");
const previewBtn = document.querySelector('.preview');
const imageInput = document.getElementById('imageInput');
const newImg = document.getElementById('upload-img');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category-select');
const formError = document.getElementById('formError');
const dropText = document.querySelectorAll('.dropzone-text');
const validBtn = document.querySelector('.valid-button');
const edit = document.querySelector('.edit-gallery');

//genere la gallery dans la modal
export function generateWorksInModal(elements){
  edit.innerHTML = ""; 
  for(const element of elements){
    const containerImg = document.createElement("div") ;
    const imgElement = document.createElement('img');
    const deleteIcon =  document.createElement('img');
    containerImg.classList.add('container-img');
    imgElement.classList.add("img-card-edit");
    deleteIcon.classList.add("delete-icon");
    imgElement.src = element.imageUrl;
    edit.appendChild(containerImg);
    containerImg.appendChild(imgElement);
    containerImg.appendChild(deleteIcon);
  }
  listenerRemoveWorks();
}

//detecte le bouton de supression et supprime l'element associé a l'id
function listenerRemoveWorks() {
  fetchDatas();
  const deleteButtons = document.querySelectorAll('.delete-icon');
  for(let i =0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', function(e) {
      e.preventDefault();
      removeWork(elements[i].id);
    });
  };
};

//suppression et mise a jour des gallery
 function removeWork(elementId){
  const accessToken = window.localStorage.getItem('userToken');
  fetch(`http://localhost:5678/api/works/${elementId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  .then(function(response){
    if (response.ok) {
      updateGallery();
    } else {
      throw new Error('Échec de la requête DELETE');
    }
  })
  .catch(function(error){
    console.error('Erreur lors de la suppression :', error);
  });
};

//fermeture de la modal via le bouton X
closeBtn.addEventListener('click', function() {
  modalContainer.style.display = "none";
});

//fermeture de la modal au click au dehors de celle ci
window.addEventListener("click", function(event){
  if(event.target === modalContainer){
    modalContainer.style.display = "none";
  };
});

 //ouverture de la modal d'ajout et remplissage des select
addBtn.addEventListener("click", function(){
  addModal.style.display = "flex";
  showModal.style.display = "none";
  fillSelect();
  resetInputs();
});

//bouton preview cache la modal d'ajout
previewBtn.addEventListener('click', function(){
  addModal.style.display = "none";
  showModal.style.display = "flex";
});

//remplir les select dynamiquement
let isFillSelectExecuted = false;
function fillSelect() {
  if (!isFillSelectExecuted) {
    for (const item of categorys) {
      const optionElement = document.createElement('option');
      optionElement.value = item.id;
      optionElement.textContent = item.name;
      categorySelect.appendChild(optionElement);
    };
    isFillSelectExecuted = true;
  };
};

//affiche l'image et cache le texte
imageInput.addEventListener('change', function() {
  // verifie si un fichier est selectionne
  if (this.files.length > 0) {
    const selectedImage = this.files[0];
    // affiche l'aperçu de l'image
    newImg.src = URL.createObjectURL(selectedImage);
    newImg.style.height = "95%";
    dropText.forEach(function(text) {
      text.style.display = 'none';
    });
  };
});

//check si les inputs sont rempli
imageInput.addEventListener('input', checkInputs);
titleInput.addEventListener('input', checkInputs);
categorySelect.addEventListener('change', checkInputs);

function checkInputs() {
  const imageFilled = imageInput.value !== '';
  const titleFilled = titleInput.value.trim() !== ''; // trim() supprime les espaces
  const categorySelected = categorySelect.value !== '';
  // affiche un message d'erreur
  if (!imageFilled || !titleFilled || !categorySelected) {
    formError.textContent = 'Veuillez remplir tous les champs.';
  } else {
    formError.textContent = '';
  };
  // active ou desactive le bouton valider
  if (imageFilled && titleFilled && categorySelected) {
    validBtn.disabled = false;
    validBtn.classList.remove('valid-button');
  } else {
    validBtn.disabled = true;
    validBtn.classList.add('valid-button');
  };
};

//ajout des données via un formData qui creer une paire cle/valeur
//envoie le nouveau element via POST
document.querySelector(".modal-form").addEventListener("submit", function(e){
  e.preventDefault();
  let formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);
  formData.append('image', imageInput.files[0]);
  const accessToken = window.localStorage.getItem('userToken');
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  })
  .then(function(response){
    if (response.ok) {
      updateGallery(); 
    } else {
      throw new Error('Échec de la requête POST');
    }
  })
  .catch(function(error){
    console.error('Erreur lors de l\'ajout :', error);
  });
});

//met a jour les gallery 
function updateGallery() {
  fetch('http://localhost:5678/api/works')
  .then(function(response) {
      return response.json();
  })
  .then(function(elements) {
      generateWorks(elements);
      generateWorksInModal(elements);
      closeBtn.click();
  });
};

// reinitialise les champs
function resetInputs() {
  titleInput.value = '';
  categorySelect.value = '';
  dropText.forEach(function(text) {
    text.style.display = 'block';
  });
  newImg.src = "./assets/icons/backgroundDrop.png";
  imageInput.type = 'file';
  validBtn.classList.add('valid-button');
};