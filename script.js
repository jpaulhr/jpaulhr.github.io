
Grafico();

function Grafico (){
    const data = DatosExp();
    const ctx = document.getElementById('Chart').getContext('2d');
    /*Creación de un Grafico */
    const mixedChart = new Chart(ctx, {
        data: {
            labels: data.xs,
            datasets: [{
                type: 'line',
                label: 'Simulaciones',
                data: data.ys,
                borderWidth: 1,
                pointRadius: 1
            }, {
                type: 'line',
                label: 'Numero PI',
                data: data.ks,
                pointStyle: false,
                borderWidth: 2
            }],
        },
    });
} 

function DatosExp(){
    const tabla = document.getElementById('tabla-datos');
    const encabezado = tabla.createTHead().insertRow();
    /*Crear encabezado de la tabla */
    encabezado.insertCell().innerText = "Simulación";
    encabezado.insertCell().innerText = "Dardos en tablero";
    encabezado.insertCell().innerText = "Total de dardos";
    encabezado.insertCell().innerText = "Pi aproximado";
    encabezado.classList.add("encabezado-tabla");

    const xs = [];
    const ys = [];
    const ks = [];
    let chance = new Chance();

    let Num_dardos = 9000000;
    let Dardos_dentro = 0;
    let Num_simulaciones = 0;

    for(let j = 1; j <= Num_dardos; j++){
        const x = chance.floating({ min: -1, max: 1 });
        const y = chance.floating({ min: -1, max: 1 });
        /*Calcular si esta dentro del área del circulo*/
        if ((x*x)+(y*y) <=1){
                Dardos_dentro++;
        }
        if (j % 225000 === 0 ){
            Num_simulaciones++
            const Pi_aprox = (4*Dardos_dentro)/j; 
            /*Insertar datos al grafico en el eje x,y */
            xs.push(Num_simulaciones);
            ys.push(Pi_aprox);
            /*Poblar la tabla con datos */
            let fila = tabla.insertRow();
            fila.insertCell().innerText = Num_simulaciones;
            fila.insertCell().innerText = Dardos_dentro;
            fila.insertCell().innerText = j;
            fila.insertCell().innerText = Pi_aprox.toFixed(6);
        }      
    }
    /*Crear un valor de pi constante recorriendo todas las simulaciones */
    for (let k=1; k<=Num_simulaciones;k++){
        ks.push(Math.PI);
    }
    return {xs,ys,ks};
}