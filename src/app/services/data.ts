import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiUrl = 'http://localhost:3000/api/datas';


    constructor(private http: HttpClient) { }


    // Buscar TODAS as datas
    buscarDatas(): Observable<any[]> {

        return this.http.get<any[]>(this.apiUrl);

    }


    // Guardar nova data
    guardarData(data_final: string): Observable<any> {

        return this.http.post(this.apiUrl, {
            data_final: data_final
        });

    }


    // Apagar uma data específica
    apagarData(id: number): Observable<any> {

        return this.http.delete(`${this.apiUrl}/${id}`);

    }

}