///recuperation des works
const response = await fetch('http://localhost:5678/api/works'); // await permet d'attendre la reponse de l'api
let elements = await response.json(); // la reponse est convertie en json 

//generation des items de la gallerie
function generateWorks(elements){
    const gallery = document.querySelector('.gallery');
    for(const element of elements){
        const pieceElement = document.createElement('figure');
        gallery.appendChild(pieceElement);
        
        const imageElement = document.createElement("img");
        const nomElement = document.createElement("figcaption");
        imageElement.src = element.imageUrl;
        imageElement.alt =  element.title;
        nomElement.innerText = element.title;
    
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
    }
}
generateWorks(elements);

//recupere les categories
const filter = await fetch('http://localhost:5678/api/categories');
let filterElements = await filter.json();

//ajout du bouton Tous 
const buttonAll =  document.createElement("button");
const sectionFilter = document.querySelector(".filter");

buttonAll.classList.add('btn');
buttonAll.setAttribute("data-id", "0");
buttonAll.textContent = 'Tous';
sectionFilter.appendChild(buttonAll); 

//genere chaque bouton avec le name et l'id dans une balise button
for(const filterElement of filterElements){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = filterElement.name;
    button.setAttribute("data-id",filterElement.id);
    sectionFilter.appendChild(button);
}
sectionFilter.querySelector(':first-child').classList.add('btn-selected'); // met par defaut le premier bouton en selected

//identification des filtres par les id des data-attribute 
const buttonObjets = document.querySelector('[data-id="1"]')
const buttonAppartments = document.querySelector('[data-id="2"]')
const buttonHostels = document.querySelector('[data-id="3"]')
const buttons = document.querySelectorAll(".btn");

//filtrage des items en fonction de l'id 
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

//ecoute le click pour chaque bouton 
buttonObjets.addEventListener("click", function () {
    filterButtonCliked(1); // passe l'argument 1
    for(const button of buttons){ // va chercher si dans les boutons il existe cette classe et la supprime
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected'); // ajoute la classe a l'element courant (this)
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






