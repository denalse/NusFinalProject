import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test.component';
import { WelcomeComponent } from './components/welcome.component';
import { RegisterlistComponent } from './components/register/registerlist.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ImageComponent } from './components/image/image.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { RegisterService } from './services/register.service';
import { CalendarService } from './services/calendar.service';


const appRoute: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: ImageComponent },
  { path: 'search/:type/:width/:height/:search', component: ImageComponent },
  { path: 'plan', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent },
  { path: 'probe', component: TestComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,TestComponent, 
    WelcomeComponent, AboutComponent, 
    ImageComponent, CalendarComponent,
    RegisterComponent, RegisterlistComponent, LoginComponent, 
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, MdbCarouselModule,
    RouterModule.forRoot(appRoute), //, {useHash: true}
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [ RegisterService, CalendarService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
