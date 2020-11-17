import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.addPageEvent();
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  addPageEvent(){
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (user && user.id){
      this.eventService
      .addPageEvent()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {

      });
    }
  }

}
