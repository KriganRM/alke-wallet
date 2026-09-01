let saldoGuardado = localStorage.getItem("saldo");

let saldo;

if (saldoGuardado === null) {

    saldo = 100000;

    localStorage.setItem("saldo", saldo);

} else {

    saldo = Number(saldoGuardado);

}

const saldoElemento = document.getElementById("saldo");

saldoElemento.textContent = "$" + saldo.toLocaleString("es-CL");

// Efecto con jQuery
$(document).ready(function () {

    $(".card")
        .hide()
        .fadeIn(700);

});