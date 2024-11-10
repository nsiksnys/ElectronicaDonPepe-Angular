# ElectronicaDonPepe-Angular
Advanced Programming II final project, with the fronted ported to Angular.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6 and uses [Bootstrap](https://getbootstrap.com) 5.3

This project consumes the API provided in the [ElectronicaDonPepe-Symfony](https://github.com/nsiksnys/ElectronicaDonPepe-Symfony) project, api-rest branch.

## Bussiness logic
The business logic for this project is explained in the logic.md file.

## Install packages
Run `npm install` to install all the packages.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Environments
The `environments` directory contains all the environment related variables, such as api endpoints and login credentials.
An example file looks like this

    export const environment = {
        production: false, // environment type
        apiUrl: "http://my-non-prod-url" // api endpoint url
    };

Two files, `environment.ts` (production) and `environment.development.ts` (development) are provided. Replace the apiUrl variable with the proper value.

For more information about this topic, please visit the [Build environments](https://angular.dev/tools/cli/environments) section in the official Angular documentation.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To build the `development` environment, add the `--configuration development` option.

To build the `production` environment, add the `--configuration production` option.

## Screenshots

* Homepage
![Homepage screenshot](/screenshots/Homepage.png)

* Sales
    * All items
    ![Sales page](/screenshots/Sales.png)
    * With search
    ![Sales page - search by date](/screenshots/Sales%20-%20with%20search.png)
    * Show details
    ![Sales page - show a sale details](/screenshots/Sales%20-%20details.png)
* Campaigns
![Campaigns page](/screenshots/Campaigns.png)
* Bonuses
    * No items
    ![Bonuses page - no results to display](/screenshots/Bonuses%20-%20no%20results.png)
    * All items
    ![Bonuses page - display all results](/screenshots/Bonuses%20-%20with%20results.png)