window.onload = function(){
    /*CONSTANTES*/

    const display = document.querySelector(".display");
    const num = document.querySelectorAll(".numero");
    const op = document.querySelectorAll(".operacion");
    const igual = document.querySelector(".igual");
    const opEsp = document.querySelectorAll(".opEsp");
    const coma = document.querySelector(".coma");
    const memoria = document.querySelectorAll(".memoria");
   

    const longitudDisplay = 0;
    let operando1 = "";
    let operador = "";
    let operacionEsp = 0;
    let entradaOp2 = false;
    let calculo = "";

    /*SELECCION DE NUMERO*/

    for (let numero of num) {
        numero.addEventListener("click", seleccionNum);
    }

    function seleccionNum(e) {
        if (display.value.length == longitudDisplay) return;
        if (operador != "" & !entradaOp2) {
            display.value = e.target.innerText;
            entradaOp2 = true;
            return;
        }

        display.value = (display.value == 0) ? e.target.innerText : display.value + e.target.innerText;
    }

    /*SELECCION DE OPERADOR*/

    for (let o of op) {
        o.addEventListener("click", seleccionOp)
    }

    function seleccionOp(e) {

        operando1 = display.value;

        switch (e.target.innerText) {
            case "x":
                operador = "*";
                break;
            default:
                operador = e.target.innerText;
                break;
        }
    }

    /*INTRODUCIR COMA*/

    coma.addEventListener("click", introducirComa);

    function introducirComa(e) {
        if (display.value.search(",") != -1) {
            return;
        }

        display.value = (display.value == 0) ? '0' + e.target.innerText : display.value + e.target.innerText;
    }

    /*HACER OPERACION*/

    igual.addEventListener("click", realizarOp);

    function realizarOp() {

        if (operador == "" || operando1 == 0) return;

        calculo = `${parseFloat(operando1.replace(",", "."))} ${operador} ${parseFloat(display.value.replace(",", "."))}`;
        display.value = eval(calculo);
        display.value = display.value.replace(".", ",");


        //Para poder seguir operando con el resultado de una operacion que realicemos
        operando1 = display.value;
        operador = "";
        entradaOp2 = false;

    }

    /*OPERACIONES ESPECIALES*/

    for (let operacionEsp of opEsp) {
        operacionEsp.addEventListener("click", realizarOpEsp)
    }

    function realizarOpEsp(e) {
        operando1 = parseInt(display.value);
        switch (e.target.innerText) {
            case "x²":
                operacionEsp = Math.pow(operando1, 2);
                display.value = eval(operacionEsp);
                break;

            case "√":
                operacionEsp = Math.sqrt(operando1);
                display.value = eval(operacionEsp);
                break;

            case "C":
                display.value = 0;
                operando1 = "";
                operador = "";
                entradaOp2 = false;
                calculo = "";
                break;

            case "π":
                operacionEsp = Math.PI;
                display.value = eval(operacionEsp);
                break;

            case "+/-":
                operacionEsp = Math.abs(operando1);
                display.value = eval(operacionEsp);
                break;

            case "⌫":
                display.value = display.value.slice(0, -1);
                break;
        
            case "1/x":
                operacionEsp = 1 / operando1;
                display.value = operacionEsp.toString().replace(".", ",");
                break;
        }
          
    }
  
} 





