import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

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
  // DATA QUE ESTÁ SENDO ESCOLHIDA
  // ========================================

  dataSelecionada: string = '';


  // ========================================
  // TODAS AS DATAS DO BANCO
  // ========================================

  datas: DataGuardada[] = [];


  // ========================================
  // CONTADORES
  // ========================================

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


  constructor(
    private dataService: DataService
  ) {}


  // ========================================
  // INICIAR
  // ========================================

  ngOnInit(): void {

    this.carregarDatas();


    this.intervalo = setInterval(() => {

      this.calcularTodosOsContadores();

    }, 1000);

  }


  // ========================================
  // DESTRUIR
  // ========================================

  ngOnDestroy(): void {

    if (this.intervalo) {

      clearInterval(this.intervalo);

    }

  }


  // ========================================
  // BUSCAR DATAS DO MYSQL
  // ========================================

  carregarDatas(): void {

    this.dataService.buscarDatas().subscribe({

      next: (resposta) => {

        this.datas = resposta;

        this.calcularTodosOsContadores();

      },


      error: (erro) => {

        console.error(
          'Erro ao buscar datas:',
          erro
        );

      }

    });

  }


  // ========================================
  // GUARDAR NOVA DATA
  // ========================================

  guardarData(): void {

    if (!this.dataSelecionada) {

      alert('Selecione uma data.');

      return;

    }


    this.dataService
      .guardarData(this.dataSelecionada)
      .subscribe({

        next: () => {

          alert(
            'Data guardada com sucesso!'
          );


          this.dataSelecionada = '';


          this.carregarDatas();

        },


        error: (erro) => {

          console.error(erro);


          alert(
            'Não foi possível guardar a data.'
          );

        }

      });

  }


  // ========================================
  // APAGAR DATA
  // ========================================

  apagarData(id: number): void {

  const confirmar = confirm(
    'Tem certeza que deseja apagar esta data?'
  );

  if (!confirmar) {
    return;
  }

  this.dataService
    .apagarData(id)
    .subscribe({

      next: () => {

        // Remover imediatamente da tela
        this.datas = this.datas.filter(
          data => data.id !== id
        );

        // Remover também o contador
        delete this.contadores[id];

        alert(
          'Data apagada com sucesso!'
        );

      },

      error: (erro) => {

        console.error(
          'Erro ao apagar data:',
          erro
        );

        alert(
          'Não foi possível apagar a data.'
        );

      }

    });

}


  // ========================================
  // CALCULAR TODOS OS CONTADORES
  // ========================================

  calcularTodosOsContadores(): void {

    for (const data of this.datas) {

      this.calcularContador(data);

    }

  }


  // ========================================
  // CALCULAR CONTADOR DE UMA DATA
  // ========================================

  calcularContador(data: DataGuardada): void {

    const agora = new Date();


    /*
      Criamos a data manualmente para evitar
      problemas de fuso horário.
    */

    const partes = data.data_final
      .substring(0, 10)
      .split('-');


    const ano = Number(partes[0]);

    const mes = Number(partes[1]) - 1;

    const dia = Number(partes[2]);


    /*
      Consideramos o final do dia escolhido.
    */

    const dataFinal = new Date(
      ano,
      mes,
      dia,
      23,
      59,
      59
    );


    const diferenca =
      dataFinal.getTime() -
      agora.getTime();


    // ========================================
    // DATA JÁ CHEGOU
    // ========================================

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
    // AINDA NÃO CHEGOU
    // ========================================

    const totalSegundos =
      Math.floor(
        diferenca / 1000
      );


    const dias =
      Math.floor(
        totalSegundos / 86400
      );


    const restoDias =
      totalSegundos % 86400;


    const horas =
      Math.floor(
        restoDias / 3600
      );


    const restoHoras =
      restoDias % 3600;


    const minutos =
      Math.floor(
        restoHoras / 60
      );


    const segundos =
      restoHoras % 60;


    this.contadores[data.id] = {

      dias,

      horas,

      minutos,

      segundos,

      chegou: false

    };

  }


  // ========================================
  // FORMATAR DATA
  // ========================================

  formatarData(data: string): string {

    const partes = data
      .substring(0, 10)
      .split('-');


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

  }


  // ========================================
  // OBTER CONTADOR
  // ========================================

  obterContador(id: number) {

    return this.contadores[id];

  }

}