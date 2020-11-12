import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { EventService } from '../../services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  user: any;
  eventsObj: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    var count = 0;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log(count++);
        this.updateUser();
      }
    });
  }

  ngOnInit(): void {
    var clickEventObj = new ClickEvents(this.http);
    var image1 = <HTMLElement>document.getElementById('image1');
    var image2 = <HTMLElement>document.getElementById('image2');
    var image3 = <HTMLElement>document.getElementById('image3');
    var image4 = <HTMLElement>document.getElementById('image4');
    var image5 = <HTMLElement>document.getElementById('image5');

    var eventsObj = new Events();
    this.eventsObj = eventsObj;
    var uid = this.user.id;

    // Clicks
    // e.button == 0 -> left click
    //             1 -> Middle click
    //             2 -> Right Click
    image1.onmousedown = function (e) {
      clickEventObj.Onclick(uid, 'image1', eventsObj, e.button);
    };
    image2.onmousedown = function (e) {
      clickEventObj.Onclick(uid, 'image2', eventsObj, e.button);
    };
    image3.onmousedown = function (e) {
      clickEventObj.Onclick(uid, 'image3', eventsObj, e.button);
    };
    image4.onmousedown = function (e) {
      clickEventObj.Onclick(uid, 'image4', eventsObj, e.button);
    };
    image5.onmousedown = function (e) {
      clickEventObj.Onclick(uid, 'image5', eventsObj, e.button);
    };
  }

  updateUser() {
    if(this.eventsObj.eventsArray.length){
    console.log(this.eventsObj);
    var data = {
      eventObj: this.eventsObj.eventsArray
    };

    this.eventService
      .addEvent(data)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        //clearing the activity array after updating the database
        this.eventsObj.eventsArray = [];

        if (data.success) {
          console.log('click is added');
        }
      });
    }
  }

  ngOnDestroy() {
    // this.componentDestroyed$.next(true);
    // this.componentDestroyed$.complete();
  }
}
class ClickEvents {
  constructor(private http: HttpClient) {}

  Onclick(uid, element, eventsObj, clickId) {
    var timeStamp = Math.floor(Date.now() / 1000);

    let eventsData = <eventsDataInterface>{
      eventType: clickId,
      tag: element,
      timeStamp: timeStamp,
      userId: uid,
    };
    eventsObj.addEvent(eventsData);
  }
}

class Events {
  eventsArray: Array<eventsDataInterface> = [];

  constructor() {}

  addEvent(node: eventsDataInterface): void {
    this.eventsArray.push(node);
  }
}
interface eventsDataInterface {
  userId: any;
  eventType: Number;
  tag: String;
  timeStamp: Number;
}

