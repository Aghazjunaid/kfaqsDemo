import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Login } from './login/login.component';
import { signup } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    signup
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
         path: 'login',
         component: Login
      },
      {
        path: 'signup',
        component: signup
     }
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }