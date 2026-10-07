import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common'; 
 import { FormsModule } from '@angular/forms'; 
 import { DataService } from '../services/data';
  interface DataGuardada {
     id: number; 
     data_inicial: string; 
     data_final: string; 
     criado_em?: string; 
    }
     @Component({ 
      selector: 'app-calendario',
       standalone: true, 
       imports: [
        CommonModule,
         FormsModule],
          templateUrl: './calendario.html', 
          styleUrl: './calendario.scss'
         }) 
         export class Calendario implements OnInit { 
          // ========================================== 
          // // SELEÇÃO DA DATA
          //  // ==========================================
           dataSelecionada: string = ''; 
           horaSelecionada: string = '12:00';
            textoDataSelecionada: string = ''; 
            // ========================================== 
            // // CALENDÁRIO PRINCIPAL 
            // // ==========================================
             mesAtual: number = new Date().getMonth();
              anoAtual: number = new Date().getFullYear();
               nomeMesAtual: string = '';
                diasCalendario: (number | null)[] = [];
                 // ========================================== 
                 // // DATAS GUARDADAS 
                 // // ========================================== 
                 datas: DataGuardada[] = []; 
                 // ========================================== 
                 // // VISUALIZAÇÃO DO INTERVALO 
                 // // ========================================== 
                 dataVisualizada: DataGuardada | null = null;
                  diasVisualizacao: (number | null)[] = [];
                   mesVisualizacao: number = new Date().getMonth();
                    anoVisualizacao: number = new Date().getFullYear();
                     nomeMesVisualizacao: string = '';
                      // ========================================== 
                      // // MENSAGENS 
                      // // ==========================================
                       mensagem: string = ''; 
                       erro: string = '';
                        // ========================================== 
                        // // CONTADORES 
                        // // ==========================================
                         contadores: {
                           [id: number]: any } = {}; 
                           constructor(private dataService: DataService) {} 
                           // ========================================== 
                           // // INICIALIZAÇÃO
                           //  // ========================================== 
                           ngOnInit(): void {
                             this.definirDataAtual();
                              this.gerarCalendario();
                               this.carregarDatas(); 
                               // Atualiza os contadores a cada segundo 
                               setInterval(() => { 
                                this.atualizarContadores();
                               }, 1000); 
                              }
                               // ========================================== 
                               // // DATA ATUAL 
                               // // ========================================== 
                               definirDataAtual(): void { 
                                const hoje = new Date(); 
                                const ano = hoje.getFullYear(); 
                                const mes = String(hoje.getMonth() + 1).padStart(2, '0');
                                 const dia = String(hoje.getDate()).padStart(2, '0');
                                  this.dataSelecionada = `${ano}-${mes}-${dia}`;
                                   this.atualizarTextoDataSelecionada();
                                   } 
                                   // ========================================== 
                                   // // TEXTO DA DATA SELECIONADA 
                                   // // ==========================================
                                    atualizarTextoDataSelecionada(): void { 
                                      if (!this.dataSelecionada) {
                                         this.textoDataSelecionada = '';
                                          return; 
                                        } 
                                        const partes = this.dataSelecionada.split('-');
                                         if (partes.length !== 3) { 
                                          this.textoDataSelecionada = this.dataSelecionada;
                                           return;
                                           } 
                                           const ano = Number(partes[0]);
                                            const mes = Number(partes[1]) - 1;
                                             const dia = Number(partes[2]);
                                              const data = new Date(ano, mes, dia);
                                               this.textoDataSelecionada = data.toLocaleDateString('pt-PT',
                                                 { 
                                                  day: '2-digit',
                                                   month: 'long',
                                                    year: 'numeric' 
                                                  }); 
                                                }
                                                 // ========================================== 
                                                 // // GERAR CALENDÁRIO PRINCIPAL 
                                                 // // ========================================== 
                                                 gerarCalendario(): void { 
                                                  this.nomeMesAtual = this.obterNomeMes( this.mesAtual,
                                                     this.anoAtual );
                                                      const primeiroDia = new Date( this.anoAtual,
                                                         this.mesAtual, 
                                                         1
                                                         );
                                                          const ultimoDia = new Date( this.anoAtual,
                                                             this.mesAtual + 1, 0 );
                                                              const primeiroDiaSemana = primeiroDia.getDay();
                                                               const quantidadeDias = ultimoDia.getDate();
                                                                this.diasCalendario = [];
                                                                 // Espaços antes do primeiro dia
                                                                  for (let i = 0; i < primeiroDiaSemana; i++) { 
                                                                    this.diasCalendario.push(null); 
                                                                  } 
                                                                  // Dias do mês
                                                                   for (let dia = 1; dia <= quantidadeDias; dia++) {
                                                                     this.diasCalendario.push(dia); 
                                                                    } 
                                                                  } 
                                                                  // ==========================================
                                                                  //  // NOME DO MÊS //
                                                                  //  ========================================== 
                                                                obterNomeMes(mes: number, ano: number): string {
                                                                   const data = new Date(ano, mes, 1); 
                                                                   return data.toLocaleDateString('pt-PT', { 
                                                                    month: 'long'
                                                                   });
                                                                   } // ==========================================
                                                                   //  // MÊS ANTERIOR 
                                                                   // // ==========================================
                                                                    mesAnterior(): void { 
                                                                      if (this.mesAtual === 0) {
                                                                         this.mesAtual = 11;
                                                                          this.anoAtual--; 
                                                                        } 
                                                                        else { 
                                                                          this.mesAtual--;
                                                                         }
                                                                          this.gerarCalendario();
                                                                         }
                                                                          // ========================================== 
                                                                          // // MÊS SEGUINTE 
                                                                          // // ==========================================
                                                                           mesSeguinte(): void { 
                                                                            if (this.mesAtual === 11) { 
                                                                              this.mesAtual = 0; 
                                                                              this.anoAtual++; 
                                                                            }
                                                                             else { 
                                                                              this.mesAtual++; 
                                                                            }
                                                                             this.gerarCalendario();
                                                                             } 
                                                                             // ========================================== 
                                                                             // // SELECIONAR DIA 
                                                                             // // ========================================== 
                                                                            selecionarDia(dia: number | null): void { 
                                                                              if (dia === null) { 
                                                                                return;
                                                                               }
                                                                                const mes = String(this.mesAtual + 1)
                                                                                .padStart(2, '0'); 
                                                                                const diaFormatado = String(dia).padStart(2, '0');
                                                                                 this.dataSelecionada = `${this.anoAtual}-${mes}-${diaFormatado}`; 
                                                                                 this.atualizarTextoDataSelecionada();
                                                                                 } 
                                                                                 // ========================================== 
                                                                                 // // VERIFICAR SE É HOJE 
                                                                                 // // ==========================================
                                                                                  ehHoje(dia: number | null): boolean {
                                                                                     if (dia === null) {
                                                                                       return false; 
                                                                                      } 
                                                                                      const hoje = new Date();
                                                                                       return ( dia === hoje.getDate() && this.mesAtual === hoje
                                                                                       .getMonth() && this.anoAtual === hoje.getFullYear() ); 
                                                                                      } 
                                                                                      // ========================================== 
                                                                                      // // VERIFICAR DATA SELECIONADA 
                                                                                      // // ==========================================
                                                                                       ehDataSelecionada(dia: number | null): boolean {
                                                                                         if (dia === null || !this.dataSelecionada) {
                                                                                           return false;
                                                                                           }
                                                                                            const partes = this.dataSelecionada.split('-');
                                                                                             return ( Number(partes[0]) === this.anoAtual && Number(partes[1]) - 1 === this.mesAtual && Number(partes[2]) === dia ); 
                                                                                            } 
                                                                                            // ========================================== 
                                                                                            // // VERIFICAR SE ESTÁ NO INTERVALO 
                                                                                            // // ==========================================
                                                                                             estaNoIntervalo(dia: number | null): boolean {
                                                                                               if (dia === null || !this.dataSelecionada) { 
                                                                                                return false; 
                                                                                              }
                                                                                               const dataDia = new Date( this.anoAtual,
                                                                                                 this.mesAtual, 
                                                                                                 dia
                                                                                                 ); 
                                                                                                 const hoje = new Date(); 
                                                                                                 hoje.setHours(0, 0, 0, 0);
                                                                                                  dataDia.setHours(0, 0, 0, 0);
                                                                                                   return dataDia >= hoje; 
                                                                                                  }
                                                                                                   // ========================================== 
                                                                                                   // // VERIFICAR DATA PASSADA 
                                                                                                   // // ==========================================
                                                                                                    ehDataPassada(dia: number | null): boolean {
                                                                                                       if (dia === null) { 
                                                                                                        return false; 
                                                                                                      } const dataDia = new Date( this.anoAtual,
                                                                                                         this.mesAtual, dia );
                                                                                                          const hoje = new Date();
                                                                                                           hoje.setHours(0, 0, 0, 0);
                                                                                                            dataDia.setHours(0, 0, 0, 0);
                                                                                                             return dataDia < hoje; 
                                                                                                            } 
                                                                                                            // ========================================== 
                                                                                                            // // GUARDAR DATA 
                                                                                                            // // ==========================================
                                                                                                             guardarData(): void {
                                                                                                               this.mensagem = '';
                                                                                                                this.erro = '';
                                                                                                                 if (!this.dataSelecionada) { 
                                                                                                                  this.erro = 'Selecione uma data.'; 
                                                                                                                  return;
                                                                                                                 }
                                                                                                                  // Data inicial = hoje
                                                                                                                 const hoje = new Date(); 
                                                                                                                 const ano = hoje.getFullYear();
                                                                                                                  const mes = String( hoje.getMonth() + 1 )
                                                                                                                  .padStart(2, '0'); 
                                                                                                                  const dia = String( hoje.getDate() )
                                                                                                                  .padStart(2, '0');
                                                                                                                   const dataInicial = `${ano}-${mes}-${dia}`; 
                                                                                                                   // Data final + hora
                                                                                                                   const dataFinal = `${this.dataSelecionada} ${this.horaSelecionada}:00`;
                                                                                                                    const dados = { 
                                                                                                                      data_inicial: dataInicial, 
                                                                                                                      data_final: dataFinal 
                                                                                                                    }; 
                                                                                                                    this.dataService.guardarData(dados).subscribe({ 
                                                                                                                      next: (res) => {
                                                                                                                         this.mensagem = 'Data guardada com sucesso!'; 
                                                                                                                         this.carregarDatas(); 
                                                                                                                        }, error: (err) => { 
                                                                                                                          console.error(err); 
                                                                                                                          this.erro = 'Erro ao guardar a data.';
                                                                                                                         }
                                                                                                                         }); 
                                                                                                                        }
                                                                                                                         // ========================================== 
                                                                                                                         // // CARREGAR DATAS 
                                                                                                                         // // ========================================== 
                                                                                                                         carregarDatas(): void { 
                                                                                                                          this.dataService.listarDatas()
                                                                                                                          .subscribe({ next: (dados) => { 
                                                                                                                            this.datas = dados; this.atualizarContadores(); 
                                                                                                                          }, error: (err) => {
                                                                                                                             console.error(err);
                                                                                                                              this.erro = 'Erro ao carregar as datas.'; 
                                                                                                                            }
                                                                                                                           });
                                                                                                                           }
                                                                                                                            // ========================================== 
                                                                                                                            // // APAGAR DATA 
                                                                                                                            // // ========================================== 
                                                                                                                            apagarData(id: number): void { 
                                                                                                                              if (!confirm('Tem certeza que deseja apagar esta data?')) { 
                                                                                                                                return;
                                                                                                                               }
                                                                                                                                this.dataService.apagarData(id)
                                                                                                                                .subscribe({ next: () => { 
                                                                                                                                  this.mensagem = 'Data apagada com sucesso.'; 
                                                                                                                                  if ( this.dataVisualizada && this.dataVisualizada.id === id ) {
                                                                                                                                     this.dataVisualizada = null;
                                                                                                                                     }
                                                                                                                                      this.carregarDatas();
                                                                                                                                     }, 
                                                                                                                                     error: (err) => {
                                                                                                                                       console.error(err);
                                                                                                                                        this.erro = 'Erro ao apagar a data.';
                                                                                                                                       }
                                                                                                                                       });
                                                                                                                                       } 
                                                                                                                                       // ==========================================
                                                                                                                                       //  // CONTADOR 
                                                                                                                                       // // ==========================================
                                                                                                                                       obterContador(id: number): any {
                                                                                                                                         if (!this.contadores[id]) {
                                                                                                                                           return { 
                                                                                                                                            dias: 0, 
                                                                                                                                            horas: 0,
                                                                                                                                             minutos: 0, 
                                                                                                                                             segundos: 0, 
                                                                                                                                             chegou: false
                                                                                                                                             }; 
                                                                                                                                            } 
                                                                                                                                            return this.contadores[id];
                                                                                                                                           } 
                                                                                                                                           // ========================================== 
                                                                                                                                           // // ATUALIZAR CONTADORES
                                                                                                                                           //  // ========================================== 
                                                                                                                                          atualizarContadores(): void { 
                                                                                                                                            const agora = new Date().getTime();
                                                                                                                                             for (const data of this.datas) { 
                                                                                                                                              const dataFinal = this
                                                                                                                                               .criarDataLocal( data.data_final ).getTime(); 
                                                                                                                                              const diferenca = dataFinal - agora; 
                                                                                                                                              if (diferenca <= 0) { 
                                                                                                                                                this.contadores[data.id] = { 
                                                                                                                                                  dias: 0,
                                                                                                                                                   horas: 0,
                                                                                                                                                    minutos: 0, 
                                                                                                                                                    segundos: 0,
                                                                                                                                                     chegou: true 
                                                                                                                                                    }; 
                                                                                                                                                    continue; 
                                                                                                                                                  }
                                                                                                                                                   const segundosTotais = Math.floor(diferenca / 1000);
                                                                                                                                                    const dias = Math.floor( segundosTotais / (60 * 60 * 24) );
                                                                                                                                                     const horas = Math
                                                                                                                                                     .floor( (segundosTotais % (60 * 60 * 24)) / (60 * 60) );
                                                                                                                                                      const minutos = Math.floor( (segundosTotais % (60 * 60)) / 60 );
                                                                                                                                                       const segundos = segundosTotais % 60; this.contadores[data.id] = { 
                                                                                                                                                        dias,
                                                                                                                                                         horas,
                                                                                                                                                          minutos,
                                                                                                                                                           segundos,
                                                                                                                                                            chegou: false };
                                                                                                                                                           }
                                                                                                                                                           }
                                                                                                                                                            // ========================================== 
                                                                                                                                                            // // CRIAR DATA LOCAL 
                                                                                                                                                            // // ========================================== 
                                                                                                                                                            criarDataLocal(valor: string): Date { 
                                                                                                                                                              if (!valor) { return new Date();

                                                                                                                                                               }
                                                                                                                                                                const data = valor .replace('T', ' ') .replace('Z', ''); 
                                                                                                                                                                const partes = data.split(' ');
                                                                                                                                                                 const dataPartes = partes[0].split('-');
                                                                                                                                                                  const ano = Number(dataPartes[0]);
                                                                                                                                                                   const mes = Number(dataPartes[1]) - 1; 
                                                                                                                                                                   const dia = Number(dataPartes[2]); 
                                                                                                                                                                   let hora = 0;
                                                                                                                                                                    let minuto = 0;
                                                                                                                                                                     let segundo = 0;
                                                                                                                                                                      if (partes[1]) { 
                                                                                                                                                                        const horaPartes = partes[1].split(':');
                                                                                                                                                                         hora = Number(horaPartes[0]) || 0;
                                                                                                                                                                          minuto = Number(horaPartes[1]) || 0; 
                                                                                                                                                                          segundo = Number(horaPartes[2]) || 0;
                                                                                                                                                                         } 
                                                                                                                                                                         return new Date( ano,
                                                                                                                                                                           mes, 
                                                                                                                                                                           dia,
                                                                                                                                                                            hora, 
                                                                                                                                                                            minuto, 
                                                                                                                                                                            segundo
                                                                                                                                                                           );
                                                                                                                                                                           }
                                                                                                                                                                            // ==========================================
                                                                                                                                                                            //  // VISUALIZAR DATA 
                                                                                                                                                                            // // ========================================== 
                                                                                                                                                                            visualizarData(data: DataGuardada): void { 
                                                                                                                                                                              this.dataVisualizada = data;
                                                                                                                                                                               const dataInicial = this.obterDataInicial(data);
                                                                                                                                                                                this.mesVisualizacao = dataInicial.getMonth(); 
                                                                                                                                                                                this.anoVisualizacao = dataInicial.getFullYear();
                                                                                                                                                                                 this.gerarCalendarioVisualizacao();
                                                                                                                                                                                 } 
                                                                                                                                                                                 // ========================================== 
                                                                                                                                                                                 // // GERAR CALENDÁRIO DA VISUALIZAÇÃO 
                                                                                                                                                                                 // // ========================================== 
                                                                                                                                                                                gerarCalendarioVisualizacao(): void { 
                                                                                                                                                                                  this.nomeMesVisualizacao = this
                                                                                                                                                                                  .obterNomeMes( this.mesVisualizacao, this.anoVisualizacao );
                                                                                                                                                                                   const primeiroDia = new Date( this.anoVisualizacao,
                                                                                                                                                                                     this.mesVisualizacao, 1 ); 
                                                                                                                                                                                     const ultimoDia = new Date( this.anoVisualizacao, 
                                                                                                                                                                                      this.mesVisualizacao + 1, 0 ); 
                                                                                                                                                                                      const primeiroDiaSemana = primeiroDia.getDay(); 
                                                                                                                                                                                      const quantidadeDias = ultimoDia.getDate();
                                                                                                                                                                                       this.diasVisualizacao = [];
                                                                                                                                                                                        // Espaços antes do primeiro dia
                                                                                                                                                                                       for ( let i = 0; i < primeiroDiaSemana; i++ ) { 
                                                                                                                                                                                        this.diasVisualizacao.push(null); 
                                                                                                                                                                                      } 
                                                                                                                                                                                      // Dias 
                                                                                                                                                                                      for ( let dia = 1; dia <= quantidadeDias; dia++ ) { 
                                                                                                                                                                                        this.diasVisualizacao.push(dia);
                                                                                                                                                                                       } 
                                                                                                                                                                                      } 
                                                                                                                                                                                      // ==========================================
                                                                                                                                                                                      //  // DATA INICIAL 
                                                                                                                                                                                      // // ========================================== 
                                                                                                                                                                                      obterDataInicial(data: DataGuardada): Date { 
                                                                                                                                                                                        if (data.data_inicial) { 
                                                                                                                                                                                          return this.criarDataLocal( data.data_inicial );
                                                                                                                                                                                         } 
                                                                                                                                                                                         // Compatibilidade com dados antigos 
                                                                                                                                                                                        return this.criarDataLocal( data.data_final );
                                                                                                                                                                                       } 
                                                                                                                                                                                       // ========================================== 
                                                                                                                                                                                       // // DATA FINAL
                                                                                                                                                                                       //  // ========================================== 
                                                                                                                                                                                       obterDataFinal(data: DataGuardada): Date { 
                                                                                                                                                                                        return this.criarDataLocal( data.data_final ); 
                                                                                                                                                                                      } 
                                                                                                                                                                                      // ==========================================
                                                                                                                                                                                      //  // DATA DO DIA DA VISUALIZAÇÃO 
                                                                                                                                                                                      // // ==========================================
                                                                                                                                                                                       obterDataDiaVisualizacao( dia: number ): Date {
                                                                                                                                                                                         return new Date( this.anoVisualizacao,
                                                                                                                                                                                           this.mesVisualizacao,
                                                                                                                                                                                            dia 
                                                                                                                                                                                          ); 
                                                                                                                                                                                        } 
                                                                                                                                                                                        // ========================================== 
                                                                                                                                                                                        // // DIA PASSADO 
                                                                                                                                                                                        // // ==========================================
                                                                                                                                                                                       diaPassadoVisualizacao( dia: number | null ): boolean { 
                                                                                                                                                                                        if ( dia === null || !this.dataVisualizada ) {
                                                                                                                                                                                           return false; 
                                                                                                                                                                                          }
                                                                                                                                                                                           const dataDia = this.obterDataDiaVisualizacao(dia);
                                                                                                                                                                                            dataDia.setHours(0, 0, 0, 0); 
                                                                                                                                                                                            const hoje = new Date();
                                                                                                                                                                                             hoje.setHours(0, 0, 0, 0); 
                                                                                                                                                                                             const inicio = this
                                                                                                                                                                                             .obterDataInicial( this.dataVisualizada );
                                                                                                                                                                                              inicio.setHours(0, 0, 0, 0);
                                                                                                                                                                                               return ( dataDia >= inicio && dataDia < hoje ); 
                                                                                                                                                                                              }
                                                                                                                                                                                               // ==========================================
                                                                                                                                                                                               //  // DIA RESTANTE 
                                                                                                                                                                                               // // ==========================================
                                                                                                                                                                                               diaRestanteVisualizacao( dia: number | null ): boolean { 
                                                                                                                                                                                                if ( dia === null || !this.dataVisualizada ) { 
                                                                                                                                                                                                  return false;
                                                                                                                                                                                                 }
                                                                                                                                                                                                  const dataDia = this.obterDataDiaVisualizacao(dia);
                                                                                                                                                                                                   dataDia.setHours(0, 0, 0, 0); 
                                                                                                                                                                                                   const hoje = new Date(); 
                                                                                                                                                                                                   hoje.setHours(0, 0, 0, 0);
                                                                                                                                                                                                    const inicio = this.obterDataInicial( this.dataVisualizada );
                                                                                                                                                                                                     inicio.setHours(0, 0, 0, 0);
                                                                                                                                                                                                      const fim = this.obterDataFinal( this.dataVisualizada );
                                                                                                                                                                                                       fim.setHours(0, 0, 0, 0); 
                                                                                                                                                                                                       return ( dataDia >= inicio && dataDia <= fim && dataDia >= hoje && !this.diaHojeVisualizacao(dia) );
                                                                                                                                                                                                       } 
                                                                                                                                                                                                       // ==========================================
                                                                                                                                                                                                       //  // HOJE 
                                                                                                                                                                                                       // // ==========================================
                                                                                                                                                                                                        diaHojeVisualizacao( dia: number | null ): boolean { 
                                                                                                                                                                                                          if (dia === null) { 
                                                                                                                                                                                                            return false; 
                                                                                                                                                                                                          } 
                                                                                                                                                                                                          const hoje = new Date(); 
                                                                                                                                                                                                          return ( dia === hoje.getDate() && this.mesVisualizacao === hoje.getMonth() && this.anoVisualizacao === hoje.getFullYear() ); 
                                                                                                                                                                                                        } 
                                                                                                                                                                                                        // ========================================== 
                                                                                                                                                                                                        // // DIA FINAL 
                                                                                                                                                                                                        // // ==========================================
                                                                                                                                                                                                         diaFinalVisualizacao( dia: number | null ): boolean {
                                                                                                                                                                                                           if ( dia === null || !this.dataVisualizada ) { 
                                                                                                                                                                                                            return false;
                                                                                                                                                                                                           } const fim = this.obterDataFinal( this.dataVisualizada ); 
                                                                                                                                                                                                           return ( dia === fim.getDate() && this.mesVisualizacao === fim.getMonth() && this.anoVisualizacao === fim.getFullYear() ); 
                                                                                                                                                                                                          } 
                                                                                                                                                                                                          // ==========================================
                                                                                                                                                                                                          //  // MÊS ANTERIOR DA VISUALIZAÇÃO
                                                                                                                                                                                                          //  // ========================================== 
                                                                                                                                                                                                          mesAnteriorVisualizacao(): void { 
                                                                                                                                                                                                            if (this.mesVisualizacao === 0) { 
                                                                                                                                                                                                              this.mesVisualizacao = 11; 
                                                                                                                                                                                                              this.anoVisualizacao--; 
                                                                                                                                                                                                            } 
                                                                                                                                                                                                            else { 
                                                                                                                                                                                                              this.mesVisualizacao--;
                                                                                                                                                                                                             }
                                                                                                                                                                                                              this.gerarCalendarioVisualizacao();
                                                                                                                                                                                                             }
                                                                                                                                                                                                              // ==========================================
                                                                                                                                                                                                              //  // MÊS SEGUINTE DA VISUALIZAÇÃO 
                                                                                                                                                                                                              // // ========================================== 
                                                                                                                                                                                                              proximoMesVisualizacao(): void {
                                                                                                                                                                                                                 if (this.mesVisualizacao === 11) {
                                                                                                                                                                                                                   this.mesVisualizacao = 0;
                                                                                                                                                                                                                    this.anoVisualizacao++; 
                                                                                                                                                                                                                  } 
                                                                                                                                                                                                                  else { 
                                                                                                                                                                                                                    this.mesVisualizacao++; 
                                                                                                                                                                                                                  } 
                                                                                                                                                                                                                  this.gerarCalendarioVisualizacao(); 
                                                                                                                                                                                                                } 
                                                                                                                                                                                                                // ========================================== 
                                                                                                                                                                                                                // // FORMATAR DATA
                                                                                                                                                                                                                //  // ==========================================
                                                                                                                                                                                                                 formatarData(data: string): string {
                                                                                                                                                                                                                   if (!data) { 
                                                                                                                                                                                                                    return '';
                                                                                                                                                                                                                   } 
                                                                                                                                                                                                                   const valor = data .replace('Z', '') .replace('T', ' ');
                                                                                                                                                                                                                    const partes = valor.substring(0, 10).split('-'); 
                                                                                                                                                                                                                    if (partes.length !== 3) {
                                                                                                                                                                                                                       return data;
                                                                                                                                                                                                                       } 
                                                                                                                                                                                                                       const ano = partes[0];
                                                                                                                                                                                                                        const mes = partes[1];
                                                                                                                                                                                                                         const dia = partes[2];
                                                                                                                                                                                                                          return `${dia}/${mes}/${ano}`;
                                                                                                                                                                                                                         } 
                                                                                                                                                                                                                        }