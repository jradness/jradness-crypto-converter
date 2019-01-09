import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_KEY, URL_COIN_API } from '../util/constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinApiService {
  rate: number;

  constructor(private http: HttpClient) {}

  getCoinValue = (url: string): Observable<number> => {
    return Observable.create(observable => {
      const headers = new HttpHeaders().set('X-CoinAPI-Key', API_KEY);
      this.http.get<CoinApiService>(`${URL_COIN_API}/${url}`, {headers: headers}).subscribe(data => {
        this.rate = data.rate;
        console.log(this.rate);
        observable.next(data.rate);
      }, err => {
        observable.error(err);
      });
    });
  }
}

