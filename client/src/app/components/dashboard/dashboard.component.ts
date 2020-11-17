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
        this.updateUser();
      }
    });
  }

  ngOnInit(): void {
    this.addPageEvent();
    const clickEventObj = new ClickEvents(this.http);
    const image1 = document.getElementById('image1') as HTMLElement;
    const image2 = document.getElementById('image2') as HTMLElement;
    const image3 = document.getElementById('image3') as HTMLElement;
    const download = document.getElementById('download') as HTMLElement;
    const upload = document.getElementById('upload') as HTMLElement;
    const reset = document.getElementById('reset') as HTMLElement;

    const eventsObj = new Events();
    this.eventsObj = eventsObj;
    const uid = this.user.id;

    // Clicks
    // e.button == 0 -> left click
    //             1 -> Middle click
    //             2 -> Right Click
    image1.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'image1', eventsObj, e.button);
    };
    image2.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'image2', eventsObj, e.button);
    };
    image3.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'image3', eventsObj, e.button);
    };
    download.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'download', eventsObj, e.button);
    };
    upload.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'upload', eventsObj, e.button);
    };
    reset.onmousedown =  (e) => {
      clickEventObj.Onclick(uid, 'reset', eventsObj, e.button);
    };
  }

  updateUser() {
    if (this.eventsObj.eventsArray.length){
    console.log(this.eventsObj);
    var data = {
      eventObj: this.eventsObj.eventsArray
    };

    this.eventService
      .addEvent(data)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
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

  addPageEvent(){
    this.eventService
      .addPageEvent()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {

      });
  }
}
class ClickEvents {
  constructor(private http: HttpClient) {}

  Onclick(uid, element, eventsObj, clickId) {
    const timeStamp = Math.floor(Date.now() / 1000);

    const eventsData = {
      eventType: clickId,
      tag: element,
      timeStamp,
    } as eventsDataInterface;
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
// tslint:disable-next-line: class-name
interface eventsDataInterface {
  eventType: Number;
  tag: String;
  timeStamp: Number;
}

