// This service provides methods to fetch cryptocurrency price data from the CoinGecko API
// and allows updating the selected coin, currency, and time range.
import { HttpClient } from '@angular/common/http'; // Angular HTTP client for making API requests
import { Injectable } from '@angular/core'; // Injectable decorator for dependency injection
import { BehaviorSubject, Observable } from 'rxjs'; // RxJS for reactive programming

/**
 * Injectable service for fetching and managing cryptocurrency price data.
 *
 * @remarks
 * - Uses CoinGecko API to fetch market chart data for a selected coin.
 * - Allows updating coin, currency, and days for the API query.
 * - Notifies subscribers when data options are updated.
 */
@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class CryptoPriceService {
  /**
   * The selected cryptocurrency (default: 'bitcoin').
   */
  coin: string = 'bitcoin';
  /**
   * The selected currency for price data (default: 'usd').
   */
  currency: string = 'usd';
  /**
   * The number of days for historical data (default: '7').
   */
  days: string = '7';
  /**
   * The API URL for fetching price data, generated from current options.
   */
  private apiUrl: string = this.generateApiUrl();

  /**
   * Subject to notify subscribers when crypto options are updated.
   */
  private dataUpdatedSubject = new BehaviorSubject<void>(undefined);

  /**
   * Constructor injects Angular's HttpClient for API requests.
   * @param http - Angular HttpClient instance
   */
  constructor(private http: HttpClient) {}

  /**
   * Updates the selected coin, currency, and days, and notifies subscribers.
   * @param coin - The cryptocurrency to fetch (e.g., 'bitcoin')
   * @param currency - The currency to use (e.g., 'usd')
   * @param days - The number of days for historical data
   */
  updateCryptoOptions(coin: string, currency: string, days: string) {
    this.coin = coin;
    this.currency = currency;
    this.days = days;
    this.generateApiUrl(); // Regenerate the API URL with new options

    // Emit change to notify subscribers to refresh data
    this.dataUpdatedSubject.next();
  }

  /**
   * Generates the CoinGecko API URL based on current options.
   * @returns The API URL string
   */
  private generateApiUrl(): string {
    return `https://api.coingecko.com/api/v3/coins/${this.coin}/market_chart?vs_currency=${this.currency}&days=${this.days}`;
  }

  /**
   * Fetches cryptocurrency price data from the API.
   * @returns Observable emitting the API response
   */
  getCryptoPriceData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Returns an observable to subscribe to data update notifications.
   * @returns Observable that emits when data options are updated
   */
  getDataUpdated$(): Observable<void> {
    return this.dataUpdatedSubject.asObservable();
  }
}
