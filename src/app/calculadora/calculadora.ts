import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss'
})
export class Calculadora {
  // ========================================== 
  // // 1. CALCULAR X% DE UM VALOR 
  // // ==========================================
  percentagem: number | null = null;
  valor: number | null = null;
  resultado: string = '';
  calcularPercentagem(): void {
    if (this.percentagem === null || this.valor === null) {
      this.resultado = 'Digite valores válidos.';
      return;
    }
    const resultado = (this.percentagem / 100) * this.valor;
    this.resultado = `${this.percentagem}% de ${this.valor} = ${resultado}`;
  } // ========================================== 
  // // 2. DESCOBRIR QUAL É A PERCENTAGEM 
  // // ========================================== 
  parte: number | null = null;
  total: number | null = null;
  resultado2: string = '';
  calcularPercentagemDoTotal(): void {
    if (this.parte === null || this.total === null) {
      this.resultado2 = 'Digite valores válidos.';
      return;
    }
    if (this.total === 0) {
      this.resultado2 = 'O valor total não pode ser zero.';
      return;
    }
    const resultado = (this.parte / this.total) * 100;
    this.resultado2 = `${this.parte} representa ${resultado
      .toFixed(2)}% de ${this.total}`;
  }
  // ==========================================
  //  // 3. AUMENTAR UM VALOR 
  // // ========================================== 
  valorAumento: number | null = null;
  percentagemAumento: number | null = null;
  resultado3: string = '';
  calcularAumento(): void {
    if (this.valorAumento === null || this.percentagemAumento === null) {
      this.resultado3 = 'Digite valores válidos.';
      return;
    }
    const aumento = (this.percentagemAumento / 100) * this.valorAumento;
    const resultado = this.valorAumento + aumento;
    this.resultado3 = `${this.valorAumento} + ${this.percentagemAumento}% = ${resultado}`;
  }
  // ========================================== 
  // // 4. DIMINUIR UM VALOR 
  // // ========================================== 
  valorDesconto: number | null = null;
  percentagemDesconto: number | null = null;
  resultado4: string = '';
  calcularDesconto(): void {
    if (this.valorDesconto === null || this.percentagemDesconto === null) {
      this.resultado4 = 'Digite valores válidos.';
      return;
    }
    const desconto = (this.percentagemDesconto / 100) * this.valorDesconto;
    const resultado = this.valorDesconto - desconto;
    this.resultado4 = `${this.valorDesconto} - ${this.percentagemDesconto}% = ${resultado}`;
  }
}
