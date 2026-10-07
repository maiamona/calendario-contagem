import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/datas';

  constructor(private http: HttpClient) {}

  listarDatas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  guardarData(dados: {
    data_inicial: string;
    data_final: string;
  }): Observable<any> {

    return this.http.post(
      this.apiUrl,
      dados
    );
  }

  apagarData(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}