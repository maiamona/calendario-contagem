import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
 @Component({ 
  selector: 'app-calculadora-operacoes',
   standalone: true, imports: [FormsModule], 
   templateUrl: './calculadora-operacoes.html', 
   styleUrl: './calculadora-operacoes.scss' 
  }) 
  export class CalculadoraOperacoes { 
    numero1: number | null = null;
     numero2: number | null = null;
      operacao: string = '+';
       resultado: string = 'Resultado: -';
        // ========================================== 
        // // CALCULAR //
        //  ========================================== 
        calcular(): void { 
          // Verificar se os números foram preenchidos 
          if ( this.numero1 === null || this.numero2 === null ) { 
            this.resultado = 'Digite os dois números.'; 
            return; 
          } 
          let resultado: number;
           // Escolher a operação 
           switch (this.operacao) { 
            case '+': resultado = this.numero1 + this.numero2; 
            break; case '-': resultado = this.numero1 - this.numero2;
             break; case '*': resultado = this.numero1 * this.numero2;
              break; case '/': if (this.numero2 === 0) { 
                this.resultado = 'Não é possível dividir por zero.';
                 return;
                 }
                  resultado = this.numero1 / this.numero2; 
                  break; 
                  case '%': if (this.numero2 === 0) {
                     this.resultado = 'Não é possível calcular o resto com zero.';
                      return; 
                    } 
                    resultado = this.numero1 % this.numero2; 
                    break; 
                    default: this.resultado = 'Operação inválida.'; 
                    return; 
                  } 
                  // Mostrar o resultado 
                  this.resultado = `Resultado: ${resultado}`;
                 } 
                 // ========================================== 
                 // // LIMPAR 
                 // // ========================================== 
                 limpar(): void {
                   this.numero1 = null;
                    this.numero2 = null; 
                    this.operacao = '+';
                     this.resultado = 'Resultado: -';
                     }
                     }
