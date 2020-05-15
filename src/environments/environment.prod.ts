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
