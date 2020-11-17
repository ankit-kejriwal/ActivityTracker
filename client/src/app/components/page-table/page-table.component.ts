import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.scss']
})
export class PageTableComponent implements OnInit {
  @Input() item: any;
  pageData = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.item);
  }

}
