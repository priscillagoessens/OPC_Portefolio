const response = await fetch('http://localhost:5678/api/works'); // await permet d'attendre la reponse de l'api
let elements = await response.json(); // on ajoute awiat ici car cette operation est aussi asynchrone

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

generateWorks(elements)

const filter = await fetch('http://localhost:5678/api/categories');
let filterElements = await filter.json();

//ajout des filtres
const buttonAll =  document.createElement("button");
const sectionFilter = document.querySelector(".filter");
buttonAll.classList.add('btn');
buttonAll.setAttribute("id", "0");
buttonAll.textContent = 'Tous';
sectionFilter.appendChild(buttonAll);

for(const filterElement of filterElements){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = filterElement.name;
    button.setAttribute("id",filterElement.id);
    sectionFilter.appendChild(button);
}
sectionFilter.querySelector(':first-child').classList.add('btn-selected');

//identification des filtres par les id recuperé precedement 
const buttonObjets = document.getElementById("1")
const buttonAppartments = document.getElementById("2")
const buttonHotels = document.getElementById("3")

//bouton Tous
buttonAll.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elements);
    updateActifButton()
})
//bouton Objets
buttonObjets.addEventListener("click", function(){
    const elementsFilter = elements.filter(function(element){
        return element.category.id === 1
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elementsFilter);
    updateActifButton()
})
//bouton Appartements
buttonAppartments.addEventListener("click", function(){
    const elementsFilter = elements.filter(function(element){
        return element.category.id === 2
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elementsFilter);
    updateActifButton()
})
//bouton Hotels
buttonHotels.addEventListener("click", function(){
    const elementsFilter = elements.filter(function(element){
        return element.category.id === 3
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(elementsFilter);
    for(const button of buttons){
        button.classList.remove('btn-selected');
    }
    this.classList.add('btn-selected');
    console.log(this);
})

const buttons = document.getElementsByClassName('btn');
for (const button of buttons) {
    button.addEventListener('click', updateActifButton);
}

function updateActifButton(){

}










