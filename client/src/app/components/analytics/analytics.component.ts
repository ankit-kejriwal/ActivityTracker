import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  clickData: any[] = [];
  pageVisitedData = {};
  pageData = [];
  displayContent: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(private eventService: EventService) {}
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  ngOnInit(): void {
    this.addPageEvent();
    this.eventService
      .getUserEvent()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        data.clickEvent.forEach((ele) => {
          this.clickData[ele.tag] = (this.clickData[ele.tag] || 0) + 1;
        });
        this.displayContent = true;
      });
      this.getPageEvent();
  }
  addPageEvent() {
    this.eventService
      .addPageEvent()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {});
  }
  getPageEvent() {
    this.eventService
      .getPageEvent()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        data.pageEvent.forEach((ele) => {
          this.pageVisitedData[ele.page] =
            (this.pageVisitedData[ele.page] || 0) + 1;
        });
        // tslint:disable-next-line: forin
        for (let key in this.pageVisitedData) {
          const obj = {
            label: key,
            value: this.pageVisitedData[key],
          };
          this.pageData.push(obj);
        }
      });
  }
}
