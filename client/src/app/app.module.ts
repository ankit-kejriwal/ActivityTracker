import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MapComponent } from './components/map/map.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    AdminDashboardComponent,
    MapComponent,
    PieChartComponent,
    UserTableComponent,
    AnalyticsComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
