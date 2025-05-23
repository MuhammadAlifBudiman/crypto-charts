// crypto-price-chart.component.ts
// Angular component for displaying a cryptocurrency price chart using Chart.js
// Handles chart creation, updates, and cleanup on destroy

import { Component, OnDestroy, OnInit } from '@angular/core'; // Angular lifecycle hooks
import { Chart, registerables } from 'chart.js'; // Chart.js for rendering charts
import { Subscription } from 'rxjs'; // RxJS Subscription for managing observables
import { CryptoPriceService } from '../../services/crypto-price.service'; // Service for fetching crypto price data

// Register Chart.js components
Chart.register(...registerables);

/**
 * Component for rendering a cryptocurrency price chart.
 * - Fetches price data from CryptoPriceService
 * - Subscribes to data updates
 * - Renders a responsive line chart using Chart.js
 */
@Component({
  selector: 'app-crypto-price-chart', // Component selector for template usage
  imports: [], // No additional imports
  templateUrl: './crypto-price-chart.component.html', // HTML template
  styleUrl: './crypto-price-chart.component.scss', // SCSS styles
})
export class CryptoPriceChartComponent implements OnInit, OnDestroy {
  /**
   * Holds the Chart.js chart instance
   */
  chart: any;
  /**
   * Subscription to the data update observable
   */
  private dataUpdatedSubscription?: Subscription;

  /**
   * Injects the CryptoPriceService for data fetching
   */
  constructor(private cryptoPriceService: CryptoPriceService) {}

  /**
   * Angular lifecycle hook: called after component initialization
   * - Initializes the chart
   * - Subscribes to data update events
   */
  ngOnInit(): void {
    this.updateChart(); // Initial chart rendering

    // Subscribe to data update event from the service
    this.dataUpdatedSubscription = this.cryptoPriceService
      .getDataUpdated$()
      .subscribe(() => {
        this.updateChart(); // Update chart on new data
      });
  }

  /**
   * Angular lifecycle hook: called before component is destroyed
   * - Unsubscribes from observables
   * - Destroys the chart instance
   */
  ngOnDestroy(): void {
    if (this.dataUpdatedSubscription) {
      this.dataUpdatedSubscription.unsubscribe(); // Prevent memory leaks
    }

    if (this.chart) {
      this.chart.destroy(); // Clean up chart instance
    }
  }

  /**
   * Fetches crypto price data and updates the chart
   * - Destroys previous chart instance if exists
   * - Extracts labels (dates) and prices from API response
   * - Creates a new Chart.js line chart
   */
  updateChart(): void {
    // Fetch updated data from the CryptoPriceService
    this.cryptoPriceService.getCryptoPriceData().subscribe((data: any) => {
      // Extract labels (dates) from the API response
      // Each price entry is a tuple [timestamp, price]
      const labels = data.prices.map(
        (price: [number, number]) => new Date(price[0]).toLocaleDateString() // Convert timestamp to a human-readable date
      );
      // Extract prices from the API response (second element of each tuple)
      const prices = data.prices.map((price: [number, number]) => price[1]);
      // If a chart instance already exists, destroy it before creating a new one
      if (this.chart) {
        this.chart.destroy();
      }
      // Create a new Chart.js line chart
      this.chart = new Chart('cryptoChart', {
        type: 'line', // Chart type: Line chart
        data: {
          labels: labels, // Set the labels (x-axis) as the extracted dates
          datasets: [
            {
              label: `${this.cryptoPriceService.coin} price (${this.cryptoPriceService.currency})`, // Dynamic label for the dataset
              data: prices, // Set the y-axis data as the extracted prices
              borderColor: 'rgb(75, 192, 192)', // Line color
              fill: false, // No fill under the line
              tension: 0.1, // Set the line curve tension for a smoother look
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive to the container's size
          scales: {
            y: {
              beginAtZero: false, // Do not force the y-axis to start at zero (allow dynamic range)
            },
          },
        },
      });
    });
  }
}
