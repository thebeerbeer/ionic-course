import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import BasePage from '../base';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BasePage {

  email: string = '';
  password: string = '';
  displayName: string = '';
  age: number;
  tel: string = '';

  loader: Loading;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  register() {
    this.showLoading("Registering...")
    this.hideLoading();
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword

      (this.email, this.password)
      .then(user => {
        user.updateProfile({
          displayName: this.displayName,
          photoURL: 'https://cdn.thinglink.me/api/image/796766103450681347/1240/10/scaletowidth'
        })

        this.firebaseFirestore
          .collection('users')
          .doc(user.uid)
          .set({
            name: this.displayName,
            email: this.email,
            tel: this.tel,
            age: this.age
          })

        this.firebaseFirestore
          .collection('users')


        this.hideLoading();

      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error.message);
      })
  }
}
