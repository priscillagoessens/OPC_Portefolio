const form = document.querySelector('form');
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

function validateInput(balise){
    let passwordError = document.querySelector(".passError")
    if(balise.value ===""){
        if(passwordError){
            return true
        }else{
            balise.classList.add("error")
            const passError = document.createElement("p")
            passError.classList.add("passError")
            passError.textContent = 'Mot de passe incorrect';
            inputPassword.parentNode.insertBefore(passError, inputPassword.nextSibling);
        }
    }else{
        balise.classList.remove("error")
        if(passwordError){
            passwordError.remove()
        }
    }
}
function validateEmail(balise){
    //lettre entre a-z de chiffre, des - ou des .
    let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    let emailError= document.querySelector(".textError")
    if(regexEmail.test(balise.value)){
        balise.classList.remove("error")
        if(emailError){
            emailError.remove()
        }
    }else{
        if(emailError){
            return true
        }else {
            balise.classList.add("error")
            const textError = document.createElement("p")
            textError.classList.add("textError")
            textError.textContent = 'Email incorrect';
            inputEmail.parentNode.insertBefore(textError, inputEmail.nextSibling);
        }
    }
}

form.addEventListener("submit", async function (event) {
    //on empeche le comportement par defaut de rechargement de page
    event.preventDefault();
    validateInput(inputPassword);
    validateEmail(inputEmail);
    const email = inputEmail.value;
    const password =  inputPassword.value;
    
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
        body: JSON.stringify({
            email:email,
            password:password,
        }),
    }); 

    if(response.ok){ 
        const responseData = await response.json();
        const userToken = responseData.token;
        // stocke le token dans le localStorage
        localStorage.setItem('userToken', userToken);
        // redirection vers l'index
        window.location.href = "../../index.html"
    } else {
        // erreur
        console.error("Erreur lors de la soumission du formulaire:", response.status);
    }
})
