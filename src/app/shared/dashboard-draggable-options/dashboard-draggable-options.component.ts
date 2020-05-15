import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-draggable-options',
  templateUrl: './dashboard-draggable-options.component.html',
  styleUrls: ['./dashboard-draggable-options.component.scss']
})
export class DashboardDraggableOptionsComponent implements OnInit {


  items = [];
  @Input() sizeSelected;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSizeChange: EventEmitter<number> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    for (let index = 3; index <= 12; index++) {
      this.items.push(index);
    }
  }

  sizeChange(size) {
    this.sizeSelected = size;
    this.onSizeChange.emit(size);
  }

  remove() {
    this.onRemove.emit();
  }

}
