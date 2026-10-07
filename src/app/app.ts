import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DatePipe
  ],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  dataAtual = new Date();

  ngOnInit(): void {

    // Atualiza a data/hora a cada minuto
    setInterval(() => {
      this.dataAtual = new Date();
    }, 60000);

  }

}

//npm run dev
//ng serve