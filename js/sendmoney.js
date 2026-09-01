let saldoGuardado = localStorage.getItem("saldo");

let saldo;

if (saldoGuardado === null) {

    saldo = 100000;

    localStorage.setItem("saldo", saldo);

} else {

    saldo = Number(saldoGuardado);

}

const sendMoneyForm = document.getElementById("sendMoneyForm");
const saldoActual = document.getElementById("saldoActual");
const inputMonto = document.getElementById("monto");
const contacto = document.getElementById("contacto");
const mensaje = document.getElementById("mensaje");

const contactForm = document.getElementById("contactForm");
const nombreContacto = document.getElementById("nombreContacto");


// Mostrar saldo
saldoActual.textContent =
    "$" + saldo.toLocaleString("es-CL");


//contactos

let contactos = JSON.parse(
    localStorage.getItem("contactos")
);

if (!contactos) {

    contactos = [
        "Juan Pérez",
        "María González",
        "Pedro Soto"
    ];

    localStorage.setItem(
        "contactos",
        JSON.stringify(contactos)
    );
}


// Autocompletado con jQuery
function actualizarAutocomplete() {

    $("#contacto").autocomplete({
        source: contactos,
        minLength: 0
    });

}

actualizarAutocomplete();

$("#contacto").on("focus", function () {

    $(this).autocomplete("search", "");

});


//Formatear monto

inputMonto.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    if (valor === "") {
        this.value = "";
        return;
    }

    this.value =
        "$" + Number(valor).toLocaleString("es-CL");

});


//Enviar dinero

sendMoneyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const monto = Number(
        inputMonto.value.replace(/\D/g, "")
    );


    if (monto <= 0) {

        $("#mensaje").show();

        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Ingresa un monto válido.
            </div>
        `;

        setTimeout(function () {

            $("#mensaje").fadeOut(700);

        }, 3000);

        return;
    }


    if (monto > saldo) {

        $("#mensaje").show();

        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Saldo insuficiente.
            </div>
        `;

        setTimeout(function () {

            $("#mensaje").fadeOut(700);

        }, 3000);

        return;
    }


    saldo = saldo - monto;

    localStorage.setItem("saldo", saldo);

    let transacciones =
        JSON.parse(localStorage.getItem("transacciones")) || [];

    transacciones.unshift({
        tipo: "Transferencia",
        contacto: contacto.value,
        monto: monto,
        fecha: new Date().toLocaleString("es-CL")
    });

    localStorage.setItem(
        "transacciones",
        JSON.stringify(transacciones)
    );

    saldoActual.textContent =
        "$" + saldo.toLocaleString("es-CL");

    $("#mensaje").show();

    mensaje.innerHTML = `
        <div class="alert alert-success">
            Transferencia de
            $${monto.toLocaleString("es-CL")}
            enviada a ${contacto.value}.
        </div>
    `;

    setTimeout(function () {

        $("#mensaje").fadeOut(700);

    }, 3000);

    sendMoneyForm.reset();

});


//agregar contactos

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = nombreContacto.value.trim();

    if (nombre === "") {
        return;
    }


    // Agregar contacto al arreglo
    contactos.push(nombre);


    // Guardar contactos en localStorage
    localStorage.setItem(
        "contactos",
        JSON.stringify(contactos)
    );


    // Actualizar autocompletado
    actualizarAutocomplete();


    // Colocar el nuevo contacto en el input
    contacto.value = nombre;


    // Limpiar formulario del modal
    contactForm.reset();


    // Cerrar modal
    const modalElemento =
        document.getElementById("contactModal");

    const modal =
        bootstrap.Modal.getInstance(modalElemento);

    modal.hide();

});