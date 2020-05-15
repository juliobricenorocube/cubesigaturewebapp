import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-server-side-pagination',
  templateUrl: './server-side-pagination.component.html',
  styleUrls: ['./server-side-pagination.component.scss']
})
export class ServerSidePaginationComponent implements OnInit, OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 10;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  showPages: number[] = [];
  activePage: number;
  blockPage = 0;
  totalBlockPages = 0;
  startBlock = 0;
  endBlock = 0;

  constructor() { }

  ngOnInit() {
    this.showPages = this.getArrayOfPage2(2);
  }

  ngOnChanges() {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.showPages = this.getArrayOfPage2(3);
    this.onPageChange.emit(1);
  }

  getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  goFirstLastPage(accion) {
    let maxBlock = this.getCountBlockPage();
    if (accion == 1) {
      this.blockPage = 0;
      this.getArrayOfPage2(2);
    } else {
      this.blockPage = maxBlock + 1;
      this.getArrayOfPage2(1);
    }
  }

  getArrayOfPage2(accion): number[] {

    if (accion == 1) {
      this.blockPage = this.blockPage - 1;
    } else if (accion == 2) {
      this.blockPage += 1;
    } else {
      this.blockPage = 1;
    }

    const pageArray: number[] = [];
    const countBlock = this.getCountBlockPage();

    if (this.blockPage > 1 && this.blockPage > countBlock) {
      this.blockPage = countBlock;
    }

    if (this.blockPage <= 0) {
      this.blockPage = 1;
    }

    let end = this.blockPage !== countBlock ? this.blockPage * 10 :  ((this.blockPage - 1) * 10) + countBlock;
    let start = (this.blockPage !== countBlock ? (end - 9) : (end + 1) - (end % 10));

    this.startBlock = start;
    this.endBlock = end;

    for (let i = start; i <= end; i++) {
      pageArray.push(i);
    }

    this.showPages = pageArray;
    this.onClickPage(pageArray[0]);
    return pageArray;
  }

  getCountBlockPage() {
    let countPage = Math.trunc((this.getPageCount() / 10));
    countPage += this.getPageCount() % 10 > 0 ? 1 : 0;

    // this.totalBlockPages = countPage;
    return countPage;
  }

  onClickPage(pageNumber: number) {
    // if (pageNumber < 1) return;
    // if(pageNumber > this.pages.length) return;

    this.activePage = pageNumber;
    this.onPageChange.emit(this.activePage);
  }

}
