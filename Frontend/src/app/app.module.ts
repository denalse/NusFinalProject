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

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
 
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { DoService } from './services/do.service';
import { httpInterceptorProviders } from './components/helpers/http.interceptor';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'account/:username', component: AccountComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'mood', component: CalendarComponent },
  { path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [
    AppComponent, AboutComponent, HomeComponent,
    SearchComponent, CalendarComponent,
    LoginComponent, RegisterComponent, FavouritesComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, MdbCarouselModule, 
    NgbModalModule, FlatpickrModule.forRoot(), 

    // RouterModule.forChild(appRoute),
    RouterModule.forRoot(appRoute, {useHash: true}),
    // RouterModule.forRoot(appRoute),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [RouterModule],

  providers: [UserService, AuthService, StorageService, DoService ,httpInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
