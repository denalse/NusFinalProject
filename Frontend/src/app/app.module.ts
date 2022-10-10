import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { FrontendService } from './services/frontend.service';
import { TestComponent } from './components/test.component';
import { WelcomeComponent } from './components/welcome.component';

const appRoute: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent },
  { path: 'probe', component: TestComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent, RegisterComponent, TestComponent, WelcomeComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, RouterModule.forRoot(appRoute, {useHash: true}),
  ],
  providers: [ FrontendService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
