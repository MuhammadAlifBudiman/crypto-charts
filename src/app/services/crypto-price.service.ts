import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoPriceService {
  coin: string = 'bitcoin';
  currency: string = 'usd';
  days: string = '7';
  private apiUrl: string = this.generateApiUrl();

  // Subject to notify when data is updated
  private dataUpdatedSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  updateCryptoOptions(coin: string, currency: string, days: string) {
    this.coin = coin;
    this.currency = currency;
    this.days = days;
    this.generateApiUrl();

    // Emit change to notify subscribers to refresh data
    this.dataUpdatedSubject.next();
  }

  private generateApiUrl(): string {
    return `https://api.coingecko.com/api/v3/coins/${this.coin}/market_chart?vs_currency=${this.currency}&days=${this.days}`;
  }

  getCryptoPriceData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // convert dataUpdatedSubject to observable for subscribing to data updates
  getDataUpdated$(): Observable<void> {
    return this.dataUpdatedSubject.asObservable();
  }
}
