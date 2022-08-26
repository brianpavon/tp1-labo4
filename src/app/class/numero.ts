export class Numero {
    numeroUno:number;
    numeroDos:number;
    suma:number;
    promedio:number;
    
    /**
     *
     */
    constructor() {
        this.numeroDos = 0;
        this.numeroUno = 0;
        this.suma = 0;
        this.promedio = 0;
    }

    calcular(){
        this.suma = this.numeroDos + this.numeroUno;
        this.promedio = this.suma/2;
    }
    limpiar(){
        this.numeroUno = 0;
        this.numeroDos = 0;
        this.suma = 0;
        this.promedio = 0;
    }
}
