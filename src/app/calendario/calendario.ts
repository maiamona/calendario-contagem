import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data';
interface DataGuardada {
  id: number;
  data_final: string;
  criado_em?: string;
}
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss'
})
export class Calendario implements OnInit, OnDestroy {
  // ======================================== 
  // // DATA E HORA QUE ESTÁ SENDO ESCOLHIDA 
  // // ======================================== 
  dataSelecionada: string = '';
  // ======================================== 
  // // TODAS AS DATAS DO BANCO 
  // // ======================================== 
  datas: DataGuardada[] = [];
  // ======================================== 
  // // CONTADORES 
  // // ======================================== 
  contadores: {
    [id: number]: {
      dias: number;
      horas: number;
      minutos: number;
      segundos: number;
      chegou: boolean;
    }
  } = {};
  intervalo: any;
  constructor(private dataService: DataService) { }
  // ======================================== 
  // // INICIAR 
  // // ======================================== 
  ngOnInit(): void {
    this.carregarDatas();
    this.intervalo = setInterval(() => {
      this.calcularTodosOsContadores();
    },
      1000);
  }
  // ======================================== 
  // // DESTRUIR 
  // // ======================================== 
  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }
  // ======================================== 
  // // BUSCAR DATAS DO MYSQL 
  // // ======================================== 
  carregarDatas(): void {
    this.dataService.buscarDatas().subscribe({
      next: (resposta) => {
        this.datas = resposta; this.calcularTodosOsContadores();
      },
      error: (erro) => {
        console.error('Erro ao buscar datas:', erro);
      }
    });
  }
  // ======================================== 
  // // GUARDAR NOVA DATA E HORA 
  // // ======================================== 
  guardarData(): void {
    if (!this.dataSelecionada) {
      alert('Selecione a data e a hora.');
      return;
    }
    this.dataService.guardarData(this.dataSelecionada)
      .subscribe({
        next: () => {
          alert('Data e hora guardadas com sucesso!');
          this.dataSelecionada = '';
          this.carregarDatas();
        },
        error: (erro) => {
          console.error(erro);
          alert('Não foi possível guardar a data e hora.');
        }
      });
  }
  // ========================================
  //  // APAGAR DATA 
  // // ======================================== 
  apagarData(id: number): void {
    const confirmar = confirm('Tem certeza que deseja apagar esta data?');
    if (!confirmar) {
      return;
    }
    this.dataService.apagarData(id).subscribe({
      next: () => {
        // Remover imediatamente da tela 
        this.datas = this.datas.filter(data => data.id !== id);
        // Remover também o contador 
        delete this.contadores[id]; alert('Data apagada com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao apagar data:', erro);
        alert('Não foi possível apagar a data.');
      }
    });
  }
  // ======================================== 
  // // CALCULAR TODOS OS CONTADORES 
  // // ======================================== 
  calcularTodosOsContadores(): void {
    for (const data of this.datas) {
      this.calcularContador(data);

    }
  }
  // ======================================== 
  // // CALCULAR CONTADOR 
  // // ======================================== 
  calcularContador(data: DataGuardada): void {
    const agora = new Date();
    /* O MySQL normalmente devolve: 2026-10-06T14:30:00.000Z ou: 2026-10-06 14:30:00 Por isso pegamos apenas: ano mês dia hora minuto segundo */
    const valor = data.data_final.replace('Z', '')
      .replace(' ', 'T');
    const partesDataHora = valor.substring(0, 19).split('T');
    const partesData = partesDataHora[0]
      .split('-');
    const partesHora = partesDataHora[1] ? partesDataHora[1]
      .split(':') : ['00', '00', '00'];
    const ano = Number(partesData[0]);
    const mes = Number(partesData[1]) - 1;
    const dia = Number(partesData[2]);
    const hora = Number(partesHora[0]);
    const minuto = Number(partesHora[1]);
    const segundo = Number(partesHora[2] || 0);
    /* Agora criamos exatamente a data e hora escolhidas pelo usuário. */
    const dataFinal = new Date(ano, mes, dia, hora, minuto, segundo);
    const diferenca = dataFinal.getTime() - agora.getTime();
    // ======================================== 
    // // DATA E HORA JÁ CHEGARAM
    //  // ======================================== 
    if (diferenca <= 0) {
      this.contadores[data.id] = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
        chegou: true
      };
      return;
    }
    // ======================================== 
    // // AINDA NÃO CHEGOU 
    // // ======================================== 
    const totalSegundos = Math.floor(diferenca / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const restoDias = totalSegundos % 86400;
    const horas = Math.floor(restoDias / 3600);
    const restoHoras = restoDias % 3600;
    const minutos = Math.floor(restoHoras / 60);
    const segundos = restoHoras % 60;
    this.contadores[data.id] = {
      dias,
      horas,
      minutos,
      segundos,
      chegou: false
    };
  }
  // ======================================== 
  // // FORMATAR DATA E HORA 
  // // ========================================
  formatarData(data: string): string {
    const valor = data.replace('Z', '')
      .replace(' ', 'T');
    const partesDataHora = valor
      .substring(0, 16).split('T');
    const partesData = partesDataHora[0]
      .split('-');
    const hora = partesDataHora[1] || '00:00';
    return `${partesData[2]}/${partesData[1]}/${partesData[0]} às ${hora}`;
  }
  // ======================================== 
  // // OBTER CONTADOR 
  // // ======================================== 
  obterContador(id: number) {
    return this.contadores[id];
  }
}