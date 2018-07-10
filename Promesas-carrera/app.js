//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(element, start, end, duration) { //Retornará promesa con elemento
    element.style.left = start;
    let counter = 0;
    const delta = (end - start) * 40 / duration; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject) => { // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(() => { // toma una funcion y la repite cada ciertos milisegundos
            const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element.style.left = current;
            if (start > end && current <= end) { // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a end
                element.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
            } else if (start < end && current >= end) {
                element.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40); // 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
}

function animateElementDown(element1, start1, end1, duration1) { //Retornará promesa con element1o
    element1.style.top = start1;
    let counter = 0;
    const delta = (end1 - start1) * 40 / duration1; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject) => { // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(() => { // toma una funcion y la repite cada ciertos milisegundos
            const current = start1 + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element1.style.top = current;
            if (start1 > end1 && current <= end1) { // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a end1
                element1.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
            } else if (start1 < end1 && current >= end1) {
                element1.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve(); //Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40); // 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
}
// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allLi = document.getElementsByTagName("li");
// animateElement(allLi[0], -200, 200, 4000).then(() => { // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
//     console.log("Terminó la animación de doge");
//     return animateElement(allLi[1], -200, 200, 2000); //" cá tenemos una promesa anidada, es como decirle: hiciste esto, y ahora haz esto otro
// }).then(() => {
//     console.log("Terminó de llegar el cate");
// }).catch(() => {
//     console.log("Falló la animación");
// });

Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
            animateElement(allLi[1], 0, 500, 6000),
            animateElement(allLi[0], 0, 400, 4000)
        ]
    ).then((results) => {
        console.log("Todas las animaciones terminaron");
        return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
            [
                animateElementDown(allLi[1], 0, 500, 8000),
                animateElementDown(allLi[0], 0, 400, 4000)
            ]
        )
    }).then(() => {
        console.log("Terminaron las animaciones de vuelta");
    }).then((results) => {
        console.log("Todas las animaciones terminaron");
        return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
            [
                animateElement(allLi[1], 500, 0, 8000),
                animateElement(allLi[0], 400, 0, 4000)
            ]
        )
    }).then((results) => {
        console.log("Todas las animaciones terminaron");
        return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
            [
                animateElementDown(allLi[1], 500, 0, 8000),
                animateElementDown(allLi[0], 400, 0, 4000)
            ]
        )
    })
    .catch(() => {
        console.log("Falló la animación");
    });