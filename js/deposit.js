let saldoGuardado = localStorage.getItem("saldo");

let saldo;

if (saldoGuardado === null) {

    saldo = 100000;

    localStorage.setItem("saldo", saldo);

} else {

    saldo = Number(saldoGuardado);

}

const depositForm = document.getElementById("depositForm");
const saldoActual = document.getElementById("saldoActual");
const mensaje = document.getElementById("mensaje");
const inputMonto = document.getElementById("monto");

// Mostrar saldo guardado
saldoActual.textContent = "$" + saldo.toLocaleString("es-CL");

// Formatear monto mientras se escribe
inputMonto.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    if (valor === "") {
        this.value = "";
        return;
    }

    this.value = "$" + Number(valor).toLocaleString("es-CL");

});

depositForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Quitamos $ y puntos antes de convertir a número
    const monto = Number(
        inputMonto.value.replace(/\D/g, "")
    );

    if (monto > 0) {

        saldo = saldo + monto;

        // Guardamos el nuevo saldo
        localStorage.setItem("saldo", saldo);


        // Guardar movimiento
        let transacciones =
            JSON.parse(localStorage.getItem("transacciones")) || [];

        transacciones.unshift({
            tipo: "Depósito",
            contacto: "",
            monto: monto,
            fecha: new Date().toLocaleString("es-CL")
        });

        localStorage.setItem(
            "transacciones",
            JSON.stringify(transacciones)
        );


        // Actualizamos la pantalla
        saldoActual.textContent =
            "$" + saldo.toLocaleString("es-CL");

        $("#mensaje").show();

        mensaje.innerHTML = `
        <div class="alert alert-success">
            Depósito realizado correctamente.
        </div>
    `;

        setTimeout(function () {

            $("#mensaje").fadeOut(700);

        }, 3000);

        depositForm.reset();


    } else {

        $("#mensaje").show();

        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Ingresa un monto válido.
            </div>
        `;

        setTimeout(function () {

            $("#mensaje").fadeOut(700);

        }, 3000);

    }

});