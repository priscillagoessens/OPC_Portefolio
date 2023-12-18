import { elements, openModal, categorys, generateWorks } from "./utils.js";

//filtres//
//ajout du bouton "Tous"
const allBtn =  document.createElement("button");
const categorySection = document.querySelector(".filter");

allBtn.classList.add('btn');
allBtn.setAttribute("data-id", "0");
allBtn.textContent = 'Tous';
categorySection.appendChild(allBtn); 

//genere chaque bouton de filtre avec le name et l'id dans une balise button
for(const category of categorys){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = category.name;
    button.setAttribute("data-id",category.id);
    categorySection.appendChild(button);
};
// met par defaut le premier enfant bouton en selected
categorySection.querySelector(':first-child').classList.add('btn-selected'); 

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
};

//bouton Tous, affiche tous les items de la galerie
allBtn.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elements);
    for(const button of buttons){ 
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected');
});

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
    const editButton = document.querySelector(".edit-button");
    editButton.addEventListener("click", openModal);
};

function createNavConnected() {
    //creation du heade de navigation connectée
    const navConnected = document.createElement("div");
    const iconTop = document.createElement("img");

    navConnected.classList.add("nav_connected");
    iconTop.src = './assets/icons/vector.png';
    iconTop.alt = 'icon';
    navConnected.innerHTML= "Mode édition";
    navConnected.prepend(iconTop);
    //ajoute comme premier enfant de l'element body
    document.body.prepend(navConnected);
};

//change le login en logout
function updateLogButton() {
    document.getElementById("log_button").innerHTML = "logout";
    document.getElementById("log_button").href = "index.html";
};

const button =  document.getElementById('log_button'); 
button.addEventListener('click', function(){
    let textButton = button.innerHTML.trim();
    if(textButton.toLowerCase() === 'logout'){
        localStorage.removeItem("userToken") 
    };
});
    
//cache les filtres
function hideFilters() {
    categorySection.style.visibility = "hidden";
};

function createEditButton() {
    //construction du bouton modifier
    const btnModify = document.createElement("button");
    const projectTitle = document.getElementById("project_title");
    const sectionPortfolio =  document.getElementById("portfolio");
    
    // creer une image avec une source
    const iconElement = document.createElement('img');
    iconElement.src = './assets/icons/group.png'; 
    iconElement.alt = 'icon';
    btnModify.classList.add("edit-button");
    btnModify.classList.add("modal-trigger")
    btnModify.innerHTML = "Modifier";
    btnModify.prepend(iconElement);
    projectTitle.insertAdjacentElement("afterend", btnModify);

    //creation d'une nouvelle section pour aligner le titre et le bouton 
    const newSection = document.createElement("div");
    sectionPortfolio.prepend(newSection);
    newSection.classList.add("center_elements-login");
    newSection.appendChild(projectTitle);
    newSection.appendChild(btnModify);
};