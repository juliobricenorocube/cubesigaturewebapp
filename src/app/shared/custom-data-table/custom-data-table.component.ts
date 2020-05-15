import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomDataTable } from 'src/app/models/custom-data-table';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss']
})
export class CustomDataTableComponent implements OnInit, OnChanges {

  @Input() data: CustomDataTable = new CustomDataTable();
  filtersType = environment.DataTableFiltersType;

  @Output() searchOutput = new EventEmitter<any>();

  /* #region  VARIABLES FOR PAGINATION */
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 10;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSort: EventEmitter<number> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onNew: EventEmitter<number> = new EventEmitter();

  @Input() activePage = 1;
  @Input() collapseFilters = true;
  startBlock = 0;
  endBlock = 0;
  /* #endregion */

  headSelected = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.onClickPage(this.activePage);
  }

  search() {
    this.searchOutput.emit(this.data.filterBody);
  }

  sortHead(item) {
    if (item.position == this.headSelected) {
      // item.position = item.position * -1;
      this.headSelected = item.position * -1;
    } else {
      this.headSelected = item.position;
    }

    this.onSort.emit(this.headSelected);
    this.onClickPage(1);
    console.log('item', item);
  }

  clearFilter() {
    this.data.filterBody.forEach(element => {
      element.filterValue = undefined;
    });
  }

  // REGION PAGINATION
  getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
    // return totalPage ;
  }

  goFirstLastPage(accion) {
    let maxPage = this.getPageCount();
    if (accion == 1) {
      // this.activePage = 0;
      // this.getArrayOfPage2(2);
      this.onClickPage(1);
    } else {
      // this.activePage = maxPage + 1;
      // this.getArrayOfPage2(1);
      this.onClickPage(maxPage);
    }
  }

  getRangeOfPage(page) {

    let totalpages = this.getPageCount();

    const end = totalpages !== page ? page * 10 : this.totalRecords;

    // tslint:disable-next-line: max-line-length
    const start = page !== totalpages ? end - 9 : this.totalRecords % 10 > 0 ? this.totalRecords - (this.totalRecords % 10) + 1 : (((this.totalRecords / 10) - 1) * 10) + 1;

    this.endBlock = end;
    this.startBlock = start;

  }


  getCountBlockPage() {
    let countPage = Math.trunc((this.getPageCount() / 10));
    countPage += this.getPageCount() % 10 > 0 ? 1 : 0;

    // this.totalBlockPages = countPage;
    return countPage;
  }

  onClickPage(pageNumber: number) {
    if (pageNumber < 1) return;
    // if(pageNumber > this.pages.length) return;

    this.activePage = pageNumber;
    this.getRangeOfPage(pageNumber);
    this.onPageChange.emit(this.activePage);
  }
  // END REGION PAGINATION

}
