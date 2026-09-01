const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailCorrecto = "admin@alkewallet.cl";
    const passwordCorrecta = "1234";

    if (email === emailCorrecto && password === passwordCorrecta) {

        window.location.href = "menu.html";

    } else {

        alert("Correo o contraseña incorrectos");

    }

});