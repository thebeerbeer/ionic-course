import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string = '';
  email: string = '';
  photoURL: string = '';
  age: number;
  tel: string = '';

  uid: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth, //everthing about user
    public firebaseFirestore: AngularFirestore

  ) {
  }

  ionViewDidLoad() { //auto load data when open page
    this.email = this.firebaseAuth.auth.currentUser.email;
    this.name = this.firebaseAuth.auth.currentUser.displayName;
    this.photoURL = this.firebaseAuth.auth.currentUser.photoURL;


    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .valueChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
      .subscribe((data: any) => { //ติดตามข้อมูล
        this.age = data.age;
        this.tel = data.tel;
        console.log(data)
      }) 


  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }


}
