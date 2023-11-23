const form = document.querySelector('form');

form.addEventListener("submit", async (event)=>{
    //on empeche le comportement par defaut de rechargement de page
    event.preventDefault();

    const email =  document.getElementById("email").value;
    const password =  document.getElementById("password").value;
    
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
        window.location.href = "./connected.html"
    }
})

    // function validateEmail(email){
    //     //lettre entre a-z de chiffre, des - ou des .
    //     let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    //     if(regexEmail.test(email)){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
