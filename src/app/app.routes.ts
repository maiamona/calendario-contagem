import { Routes } from '@angular/router';
import { Calendario } from './calendario/calendario';
import { Calculadora } from './calculadora/calculadora';
import { CalculadoraOperacoes } from './calculadora-operacoes/calculadora-operacoes';
import { AdicionarDias } from './adicionar-dias/adicionar-dias';
export const routes: Routes = [
    // ========================================== 
    // // CALENDÁRIO //
    //  ========================================== 
    {
        path: '', component: Calendario
    },
    // ========================================== 
    // // CALCULADORA DE PERCENTAGEM 
    // // ==========================================
    {
        path: 'calculadora-percentagem', component: Calculadora
    },
    // ========================================== // 
    // CALCULADORA NORMAL //
    //  ========================================== 
    {
        path: 'calculadora', component: CalculadoraOperacoes
    },
    // ========================================== 
    // // ADICIONAR DIAS //
    //  ==========================================
    {
        path: 'adicionar-dias', component: AdicionarDias
    },
    // ========================================== 
    // // ROTA NÃO ENCONTRADA 
    // // ========================================== 
    {
        path: '**',
        redirectTo: ''
    }
];
