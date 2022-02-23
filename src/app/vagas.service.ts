import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {Vaga} from './models/Vagas.model';

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  url = 'http://localhost:3000/vagas'; // api rest fake com json serve

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getVagas(): Observable<Vaga[]> {
    return this.httpClient.get<Vaga[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getVagaById(id: number): Observable<Vaga> {
    return this.httpClient.get<Vaga>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /*  TODO
  saveVaga(vaga: Vaga): Observable<Vaga> {
    return this.httpClient.post<Vaga>(this.url, JSON.stringify(vaga), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateVaga(vaga: Vaga): Observable<Vaga> {
    return this.httpClient.put<Vaga>(this.url + '/' + vaga.id, JSON.stringify(vaga), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteVaga(vaga: Vaga) {
    return this.httpClient.delete<Vaga>(this.url + '/' + vaga.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  } 
  */

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}