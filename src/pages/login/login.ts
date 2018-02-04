import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RegisterPage } from './../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { registerLocaleData } from '@angular/common/src/i18n/locale_data';
import BasePage from '../base';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public friebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl,loadingCtrl) //class extend 
  }

  login() {
    this.showLoading("Logging in...")
    this.hideLoading();
    this.friebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
      }) //true can login
      .catch((error) => {
        this.showToast(error.message);
      }) //flase case
  }

  navigateRegister(){ //regis new user ,when click open regis page
    this.navCtrl.push(RegisterPage);

  }
}


