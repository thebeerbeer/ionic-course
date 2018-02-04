import { SetNotificationPage } from './../pages/set-notification/set-notification';
import { ChartPage } from './../pages/chart/chart';
import { EditmoviePage } from './../pages/editmovie/editmovie';
import { AddmoviePage } from './../pages/addmovie/addmovie';
import { LoginPage } from './../pages/login/login';
import { TabPage } from './../pages/tab/tab';
import { ListPage } from './../pages/list/list';
import { ProfilePage } from './../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LocalNotifications } from '@ionic-native/local-notifications';

 var config = {
    apiKey: "AIzaSyBufLiVS-1cqZ9xWaY-DmIyCflX4Gb4QuI",
    authDomain: "ionic-course-f0b38.firebaseapp.com",
    databaseURL: "https://ionic-course-f0b38.firebaseio.com",
    projectId: "ionic-course-f0b38",
    storageBucket: "ionic-course-f0b38.appspot.com",
    messagingSenderId: "844581875404"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddmoviePage,
    EditmoviePage,
    ChartPage,
    SetNotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddmoviePage,
    EditmoviePage,
    ChartPage,
    SetNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications
  ]
})
export class AppModule {}
