import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import { routing }             from './app.routing';
import {DashboardComponent } from './dashboard.component';
import { ChartComponent } from './chart.component';
import {ModalModule} from "ng2-modal";
import {PushNotificationsModule,SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    ModalModule,
    PushNotificationsModule,
    SimpleNotificationsModule,

  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    ChartComponent,

  ],
  providers: [
    HeroService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}