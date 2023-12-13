import { elements , generateWorks, categories } from "./main.js";
const modalContainer = document.querySelector(".modal");
const modal2 = document.querySelector('.modal2');
const modal1 = document.querySelector('.modal1');
const closeBtn = document.querySelector(".close-modal");
const addButton = document.querySelector(".add-button");
const previewBtn = document.querySelector('.preview');
const imageInput = document.getElementById('imageInput');
const uploadImg = document.getElementById('upload-img');
const dropText = document.querySelectorAll('.dropzone-text');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category-select');
const validButton = document.querySelector('.valid-button');
const formError = document.getElementById('formError');

let elementsGenerated = false; 

export function openmodal(e){
    e.preventDefault()
    modalContainer.style.display = "flex";
    modal1.style.display = "flex";
    modal2.style.display = "none";
    if (!elementsGenerated) {
      generateWorks(elements);
      elementsGenerated = true;
    }
}

closeBtn.addEventListener('click', function() {
  modalContainer.style.display = "none";
});

//fermeture de la modal au click au dehors de celle ci
window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
}

 //bouton ajouter montre la modal 2 et fait appel pour remplir les champs
addButton.addEventListener("click", function(){
  modal2.style.display = "flex";
  modal1.style.display = "none";
  fillSelect()
})

//bouton preview cache la modal 2
previewBtn.addEventListener('click', function(){
  modal2.style.display = "none";
  modal1.style.display = "flex";
})

//remplir les select dynamiquement
function fillSelect() {
  for (const item of categories) {
    const optionElement = document.createElement('option');
    optionElement.value = item.id;
    optionElement.textContent = item.name;
    categorySelect.appendChild(optionElement);
  }
}

//affiche l'image et cache le texte
imageInput.addEventListener('change', function() {
    // verifie si un fichier est selectionne
    if (this.files.length > 0) {
        const selectedImage = this.files[0];
        // affiche l'aperçu de l'image
        uploadImg.src = URL.createObjectURL(selectedImage);
        dropText.forEach(function(text) {
          text.style.display = 'none';
        });
    }
});

//check si les inputs sont rempli
imageInput.addEventListener('input', checkInputs);
titleInput.addEventListener('input', checkInputs);
categorySelect.addEventListener('change', checkInputs);

function checkInputs() {
    const imageFilled = imageInput.value !== '';
    const titleFilled = titleInput.value.trim() !== '';
    const categorySelected = categorySelect.value !== '';
    // affiche un message d'erreur
    if (!imageFilled || !titleFilled || !categorySelected) {
      formError.textContent = 'Veuillez remplir tous les champs.';
  } else {
      formError.textContent = '';
  }
    // active ou desactive le bouton de valider
  if (imageFilled && titleFilled && categorySelected) {
      validButton.disabled = false;
      validButton.classList.remove('valid-button')
      
  } else {
      validButton.disabled = true;
      validButton.classList.add('valid-button')
  }  
}
//ajout des données via un formData qui creer une paire cle/valeur
document.querySelector(".modal-form").addEventListener("submit", function(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('category', categorySelect.value);
		formData.append('image', document.getElementById('imageInput').files[0]);
    const accessToken = window.localStorage.getItem('userToken');
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
			body: formData
		})
    .then(function(json) {
			console.log(json);
		})
    .catch(error => {
      console.error('Erreur lors de l\'ajout :', error);
    });
  })