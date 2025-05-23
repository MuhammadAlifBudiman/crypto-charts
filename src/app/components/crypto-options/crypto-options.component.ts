// Import Angular common module for common directives
import { CommonModule } from '@angular/common';
// Import Component and OnInit for component creation and lifecycle hook
import { Component, OnInit } from '@angular/core';
// Import FormsModule for template-driven forms
import { FormsModule } from '@angular/forms';
// Import the CryptoPriceService to interact with crypto price data
import { CryptoPriceService } from '../../services/crypto-price.service';

/**
 * CryptoOptionsComponent
 *
 * This component provides a form for selecting cryptocurrency options (coin, currency, days)
 * and updates the CryptoPriceService with the selected values.
 */
@Component({
  selector: 'app-crypto-options', // Component selector for usage in templates
  imports: [CommonModule, FormsModule], // Import required Angular modules
  templateUrl: './crypto-options.component.html', // HTML template for the component
  styleUrl: './crypto-options.component.scss', // SCSS styles for the component
})
export class CryptoOptionsComponent implements OnInit {
  /**
   * Selected coin name (e.g., 'bitcoin')
   */
  coin: string = '';
  /**
   * Selected currency (e.g., 'usd')
   */
  currency: string = '';
  /**
   * Selected number of days for price history
   */
  days: string = '';
  /**
   * List of available coin options for selection
   */
  coinOptions: string[] = [
    'bitcoin',
    'ethereum',
    'litecoin',
    'dogecoin',
    'cardano',
    'binancecoin',
    'solana',
    'polkadot',
    'ripple',
    'dogecoin', // Duplicate entry, consider removing if not intentional
    'uniswap',
    'chainlink',
    'shiba-inu',
    'avalanche',
    'tron',
  ];
  /**
   * List of available currency options for selection
   */
  currencyOptions: string[] = [
    'usd',
    'eur',
    'gbp',
    'jpy',
    'aud',
    'cad',
    'chf',
    'cny',
    'inr',
    'brl',
  ];
  /**
   * List of available day range options for selection
   */
  daysOptions: string[] = ['7', '14', '30', '90', '180', '365'];

  /**
   * Constructor injects the CryptoPriceService for managing crypto options
   * @param cryptoPriceService Service to update and retrieve crypto options
   */
  constructor(private cryptoPriceService: CryptoPriceService) {}

  /**
   * OnInit lifecycle hook
   * Initializes the form fields with values from the CryptoPriceService
   */
  ngOnInit(): void {
    this.coin = this.cryptoPriceService.coin;
    this.currency = this.cryptoPriceService.currency;
    this.days = this.cryptoPriceService.days;
  }

  /**
   * Handles form submission
   * Updates the CryptoPriceService with the selected options
   */
  onSubmit() {
    this.cryptoPriceService.updateCryptoOptions(
      this.coin,
      this.currency,
      this.days
    );
  }
}
