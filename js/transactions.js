const listaTransacciones =
    document.getElementById("listaTransacciones");


// Obtener transacciones guardadas
const transacciones =
    JSON.parse(localStorage.getItem("transacciones")) || [];


// Si no existen movimientos
if (transacciones.length === 0) {

    listaTransacciones.innerHTML = `
        <div class="card-body">

            <p class="text-muted text-center mb-0">
                No hay movimientos registrados.
            </p>

        </div>
    `;

} else {

    // Limpiar contenido inicial
    listaTransacciones.innerHTML = "";


    // Recorrer transacciones
    transacciones.forEach(function (transaccion) {

        let descripcion = "";
        let signo = "";
        let claseMonto = "";


        // Depósito
        if (transaccion.tipo === "Depósito") {

            descripcion = "Depósito";

            signo = "+";

            claseMonto = "text-success";

        }


        // Transferencia
        if (transaccion.tipo === "Transferencia") {

            descripcion =
                "Transferencia a " + transaccion.contacto;

            signo = "-";

            claseMonto = "text-danger";

        }


        const movimiento =
            document.createElement("div");


        movimiento.className =
            "card-body border-bottom";


        movimiento.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">

                <div>

                    <h6 class="mb-1">
                        ${descripcion}
                    </h6>

                    <small class="text-muted">
                        ${transaccion.fecha}
                    </small>

                </div>


                <strong class="${claseMonto}">

                    ${signo}$${transaccion.monto.toLocaleString("es-CL")}

                </strong>

            </div>
        `;


        listaTransacciones.appendChild(movimiento);

    });

}

$(document).ready(function () {

    $("#listaTransacciones")
        .hide()
        .fadeIn(700);

});