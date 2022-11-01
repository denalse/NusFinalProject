import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MaterialModule } from './material.module';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
// import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ImageComponent } from './components/image/image.component';
import { WelcomeComponent } from './components/welcome.component';
import { CalendarComponent } from './components/calendar/calendar.component';
 
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { httpInterceptorProviders } from './components/helpers/http.interceptor';

const appRoute: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome/:username', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'account/:username', component: AccountComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'about', component: AboutComponent },
  { path: 'search', component: ImageComponent },
  // { path: 'search/:type/:width/:height/:search', component: ImageComponent },
  { path: 'mood', component: CalendarComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent, AboutComponent,
    ImageComponent, CalendarComponent,
    LoginComponent, RegisterComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, MdbCarouselModule, 
    NgbModalModule, FlatpickrModule.forRoot(), 

    // RouterModule.forChild(appRoute),
    RouterModule.forRoot(appRoute, {useHash: true}), //, {useHash: true}

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [RouterModule],

  providers: [UserService, AuthService, StorageService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
