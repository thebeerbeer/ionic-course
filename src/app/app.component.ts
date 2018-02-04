import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../pages/login/login';
import { TabPage } from './../pages/tab/tab';
import { ListPage } from './../pages/list/list';
import { ProfilePage } from './../pages/profile/profile';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public firebaseAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {

      this.firebaseAuth
        .authState
        .subscribe((user) => {
          if(user){
            this.rootPage = TabPage;
          }else {
            this.rootPage = LoginPage;
          }
        })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

