import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  name: String;
  username: String;
  email: String;
  password: String;
  location: object;
  os: String;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.location = {
          type: 'point',
          coordinates: [longitude, latitude],
        };
        this.registerUser();
      });
    } else {
      console.log('No support for geolocation');
      this.location = {
        type: 'point',
        coordinates: [0, 0],
      };
      this.registerUser();
    }
  }

  onSubmit() {
    this.getLocation();
  }
  registerUser() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      os: this.getOsName(),
      location: this.location,
    };
    this.authService
      .registerUser(user)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        if (data.success) {
          alert('User is created');
          this.router.navigate(['/login']);
        } else {
          alert('Unable to create a user');
          this.router.navigate(['/register']);
        }
      });
  }
  getOsName() {
    let OSName = 'Unknown';
    if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) {
      OSName = 'Windows 10';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) {
      OSName = 'Windows 8';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) {
      OSName = 'Windows 7';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) {
      OSName = 'Windows Vista';
    } else if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) {
      OSName = 'Windows XP';
    } else if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) {
      OSName = 'Windows 2000';
    } else if (window.navigator.userAgent.indexOf('Mac') !== -1) {
      OSName = 'Mac/iOS';
    } else if (window.navigator.userAgent.indexOf('X11') !== -1) {
      OSName = 'UNIX';
    } else if (window.navigator.userAgent.indexOf('Linux') !== -1) {
      OSName = 'Linux';
    }
    return OSName;
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
