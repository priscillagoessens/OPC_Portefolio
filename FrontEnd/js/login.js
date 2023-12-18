const form = document.querySelector('form');

form.addEventListener("submit", async function (event) {
    //on empeche le comportement par defaut de rechargement de page
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password =  document.getElementById("password").value
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
        window.location.href = "../index.html";
    } else {
        // erreur
        console.error("Erreur lors de la soumission du formulaire:", response.status);
        let errorMsg = document.getElementById('error-message');
        errorMsg.textContent = "Identifiant ou mot de passe incorrect !";
    }
})
