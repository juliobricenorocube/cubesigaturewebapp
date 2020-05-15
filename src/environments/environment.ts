// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 production: true,
 //apiUrlOld: 'http://cube-mia.com/cubeapi/api',
 // Para ejecutar remoto en desarrollo
 apiUrl: 'http://www.cube-mia.com/api2',
 //apiUrl: 'https://portal.cube-usa.com/api2/api2',
 // Para subir al servidor para pruebas Mónica
 //apiUrl: 'http://192.168.0.33/api2/api2',
 DashboardComponentsType: {
   table: 1,
   doughnut: 2,
   pie: 3,
   bar: 4,
   barHorizontal: 5,
   stacked: 6,
   indicator: 7,
   indicator2: 8,
   line: 9,
   radar: 10
 },
 DataTableFiltersType: {
   InputTypeNumber: 1,
   InputTypeText: 2,
   DropDown: 3,
   DatePicker: 4,
   DatePickerRange: 5
 }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
