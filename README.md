# CryptoCharts

CryptoCharts is a web application built with Angular that displays real-time cryptocurrency price charts and related information. This project is part of the Udemy course [30 Days of Angular: Build 30 Web Projects with Angular](https://www.udemy.com/course/30-days-of-angular/).

## Features

- Select from a list of popular cryptocurrencies
- View interactive price charts
- Responsive and modern UI
- Built with Angular best practices

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.io/cli)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd crypto-charts
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development server

Start the local development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will reload automatically if you change any source files.

### Building

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running unit tests

To execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Running end-to-end tests

To run end-to-end (e2e) tests:

```bash
ng e2e
```

## Project Structure

- `src/app/components/` – Angular components (crypto options, price chart, header)
- `src/app/services/` – Services for fetching crypto price data
- `src/app/` – Main app module and configuration

## About the Course

This project is one of 30 hands-on web projects built in the Udemy course [30 Days of Angular: Build 30 Web Projects with Angular](https://www.udemy.com/course/30-days-of-angular/). The course is designed to help you master Angular by building real-world applications.

## License

This project is for educational purposes as part of the Udemy course. For more details, refer to the course page.
