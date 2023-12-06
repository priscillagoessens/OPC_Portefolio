import { openmodal } from "./modal.js";
///recuperation des elements si ils sont present dans le localStorage
let elements = window.localStorage.getItem('elements')

if (elements === null) {
    // recuperation des elements
    const reponse = await fetch('http://localhost:5678/api/works');
    elements = await reponse.json();
    // transformation des elements en JSON
    const valeurElements = JSON.stringify(elements);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("elements", valeurElements);
} else {
    elements = JSON.parse(elements);
}
// const response = await fetch('http://localhost:5678/api/works'); // await permet d'attendre la reponse de l'api
// let elements = await response.json(); // la reponse est convertie en json 

//generation des items dans la galerie
function generateWorks(elements){
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    for(const element of elements){
        const pieceElement = document.createElement('figure');
        gallery.appendChild(pieceElement);
        
        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");
        imageElement.src = element.imageUrl;
        imageElement.alt =  element.title;
        titleElement.innerText = element.title;
    
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(titleElement);
    }
}
generateWorks(elements)

//filtres//
//fetch les categories
const getCategorie = await fetch('http://localhost:5678/api/categories');
let categories = await getCategorie.json();

//ajout du bouton "Tous"
const buttonAll =  document.createElement("button");
const categorieSection = document.querySelector(".filter");

buttonAll.classList.add('btn');
buttonAll.setAttribute("data-id", "0");
buttonAll.textContent = 'Tous';
categorieSection.appendChild(buttonAll); 

//genere chaque bouton de filtre avec le name et l'id dans une balise button
for(const categorie of categories){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = categorie.name;
    button.setAttribute("data-id",categorie.id);
    categorieSection.appendChild(button);
}
// met par defaut le premier enfant bouton en selected
categorieSection.querySelector(':first-child').classList.add('btn-selected'); 

//identification des filtres avec des data-attribute id 
const buttonObjets = document.querySelector('[data-id="1"]')
const buttonAppartments = document.querySelector('[data-id="2"]')
const buttonHostels = document.querySelector('[data-id="3"]')
const buttons = document.querySelectorAll(".btn");

//filtrage des elements grace a l'id 
function filterButtonCliked(categoryId){ //prend en parametre l'id
    const elementsFilter = elements.filter(function (element) {
        return element.category.id === categoryId;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elementsFilter);
}

//bouton Tous, affiche tous les items de la galerie
buttonAll.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elements);
    for(const button of buttons){ 
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected');
})

//Sur chaque bouton reproduit le filtre en fonction de l'argument 1,2,3
buttonObjets.addEventListener("click", function () {
    filterButtonCliked(1);
    for(const button of buttons){ 
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected'); 
});

buttonAppartments.addEventListener("click", function () {
    filterButtonCliked(2);
    for(const button of buttons){
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected');
});

buttonHostels.addEventListener("click", function () {
    filterButtonCliked(3);
    for(const button of buttons){
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected');
});
 
//initialisation de l'espace connecté
//ajout de la barre noir et suppression des filtres et ajout du bouton modifier 
const userToken =  window.localStorage.getItem('userToken');
if(userToken !== null ){
    createNavConnected();
    updateLogButton();
    hideFilters();
    createEditButton();
}

function createNavConnected() {
    //creation de la barre haute 
    const navConnected = document.createElement("div");
    const iconTop = document.createElement("img");

    navConnected.classList.add("nav_connected");
    iconTop.src = './assets/icons/vector.png';
    iconTop.alt = 'icon';
    navConnected.innerHTML= "Mode édition";
    navConnected.prepend(iconTop);
    //ajoute comme premier enfant de l'element body
    document.body.prepend(navConnected);
}

//change le login en logout
function updateLogButton() {
    document.getElementById("log_button").innerHTML = "logout";
}

const button =  document.getElementById('log_button'); 
button.addEventListener('click', function(){
    let textButton = button.innerHTML.trim();
    if(textButton.toLowerCase() === 'logout'){
        localStorage.clear();  
    }
})
    
//cache les filtres
function hideFilters() {
    categorieSection.style.visibility = "hidden";
}

function createEditButton() {
    //construction du bouton modifier
    const btnModifier = document.createElement("button");
    const projectTitle = document.getElementById("project_title");
    const sectionPortefolio =  document.getElementById("portfolio");
    
    // creer une image avec une source
    const iconElement = document.createElement('img');
    iconElement.src = './assets/icons/group.png'; 
    iconElement.alt = 'icon';
    btnModifier.classList.add("edit-button");
    btnModifier.classList.add("modal-trigger")
    btnModifier.innerHTML = "Modifier";
    btnModifier.prepend(iconElement);
    projectTitle.insertAdjacentElement("afterend", btnModifier);

    //creation d'une nouvelle section pour aligner le titre et le bouton 
    const newSection = document.createElement("div");
    sectionPortefolio.prepend(newSection);
    newSection.classList.add("center_elements-login");
    newSection.appendChild(projectTitle);
    newSection.appendChild(btnModifier);
}
const editButton = document.querySelector(".edit-button");
editButton.addEventListener("click", openmodal);








