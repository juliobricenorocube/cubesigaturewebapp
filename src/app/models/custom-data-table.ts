export class CustomDataTable {
  btnAddName: string;
  filterBody: Array<FilterBody> = new Array<FilterBody>();

  tableTitle: string;
  tableHeaders: any = [];
}

export class FilterBody {
  filterSize = 2;
  filterLabel: string;
  filterType: number;
  filterData?: any;
  filterValue: any;
}
