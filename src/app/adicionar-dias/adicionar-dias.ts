import { Component } from '@angular/core';
 import { FormsModule } from '@angular/forms';
  @Component({
     selector: 'app-adicionar-dias', 
    standalone: true, 
    imports: [FormsModule], 
    templateUrl: './adicionar-dias.html', 
    styleUrl: './adicionar-dias.scss' 
  })
   export class AdicionarDias { 
    // ========================================== 
    // // VARIÁVEIS // 
    // ========================================== //
    //  Data escolhida pelo utilizador 
    dataInicial: string = '';
     // Quantidade de dias que será adicionada 
     quantidadeDias: number | null = null; 
     // Resultado da operação 
     resultado: string = '';
      // Dia da semana da data calculada
       diaSemana: string = ''; 
       // ========================================== 
       // // CALCULAR DATA // 
       // ========================================== 
       calcular(): void { 
        // Verificar se existe uma data
         if (!this.dataInicial) {
           this.resultado = 'Escolha uma data inicial.'; 
           this.diaSemana = ''; 
           return;
           }
            // Verificar quantidade de dias
             if ( this.quantidadeDias === null || this.quantidadeDias < 0 ) { 
              this.resultado = 'Digite uma quantidade de dias válida.'; 
              this.diaSemana = '';
               return; 
              } 
              // ======================================== 
              // // TRANSFORMAR A DATA 
              // // ======================================== 
              const partes = this.dataInicial.split('-'); 
              const ano = Number(partes[0]);
               const mes = Number(partes[1]) - 1;
                const dia = Number(partes[2]);
                 // Criar a data inicial
                  const data = new Date( ano, mes, dia );
                   // ======================================== 
                   // // ADICIONAR OS DIAS 
                   // // ======================================== 
                   data.setDate( data.getDate() + this.quantidadeDias );
                    // ========================================
                    //  // OBTER O RESULTADO 
                    // // ======================================== 
                    const novoDia = String(data.getDate()) .padStart(2, '0');
                     const novoMes = String(data.getMonth() + 1)
                      .padStart(2, '0');
                       const novoAno = data.getFullYear();
                        // ======================================== 
                        // // DIA DA SEMANA 
                        // // ======================================== 
                        const diasSemana = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ]; 
                        this.diaSemana = diasSemana[data.getDay()];
                         // ======================================== 
                         //// MOSTRAR RESULTADO 
                         // // ======================================== 
                         this.resultado = `${novoDia}/${novoMes}/${novoAno}`; 
                        } 
                        // ==========================================
                        //  // USAR DATA DE HOJE //
                        //  ========================================== 
                        usarHoje(): void { 
                          const hoje = new Date();
                           const ano = hoje.getFullYear(); 
                           const mes = String(hoje.getMonth() + 1) .padStart(2, '0');
                            const dia = String(hoje.getDate()) .padStart(2, '0');
                             this.dataInicial = `${ano}-${mes}-${dia}`; 
                             // Limpar resultado anterior
                              this.resultado = ''; 
                              this.diaSemana = '';
                             } 
                             // ==========================================
                             //  // LIMPAR // 
                             // ========================================== 
                             limpar(): void { 
                              this.dataInicial = '';
                               this.quantidadeDias = null;
                                this.resultado = '';
                                 this.diaSemana = '';
                                 }
                                 }