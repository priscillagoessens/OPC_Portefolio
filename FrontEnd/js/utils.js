import { modalContainer, showModal, addModal} from "./variables.js";
import {generateWorksInModal} from "./modal.js";

export let elements = ""; 
//recuperation des works
export function fetchDatas() {
    fetch('http://localhost:5678/api/works')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        elements = data;
        generateWorks(elements);
    });
}
fetchDatas();

//generation des works dans la galerie principale
export function generateWorks(elements){
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
    for(const element of elements){   
        const figureElement = document.createElement('figure');
        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");

        imageElement.src = element.imageUrl;
        imageElement.alt =  element.title;
        titleElement.innerText = element.title;
    
        figureElement.appendChild(imageElement);
        figureElement.appendChild(titleElement);
        gallery.appendChild(figureElement);
    };
};

//fetch les categories
const getcategory = await fetch('http://localhost:5678/api/categories');
export const categorys = await getcategory.json();

//ouvre la modal
let elementsGenerated = false; 
export function openModal(){
    modalContainer.style.display = "flex";
    showModal.style.display = "flex";
    addModal.style.display = "none";
    if (!elementsGenerated) {
        generateWorksInModal(elements);
        elementsGenerated = true;
    };
};