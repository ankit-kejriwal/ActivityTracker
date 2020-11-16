import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  locationData: any[] = [];
  displayFlag: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(private eventService: EventService) { }
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.eventService
      .getUser()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        data.forEach(element => {
          this.locationData.push(element.location);
        });
        this.displayFlag = true;
      });
  }

}
