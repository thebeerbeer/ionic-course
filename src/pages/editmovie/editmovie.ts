import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';

@Component({
  selector: 'page-editmovie',
  templateUrl: 'editmovie.html',
})
export class EditmoviePage extends BasePage {

  uid: string;
  id: string;

  name: string;
  description: string;
  length: number;
  image: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, //  ตัวที่พาค่ามาให้เรา
    public toastCtrl: ToastController,
    public LoadingCtrl: LoadingController,
    public firebaseAuth: AngularFireAuth,
    public firebasrFirestore: AngularFirestore
  ) {
    super(toastCtrl, LoadingCtrl)

    this.id = this.navParams.get('id');

  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebasrFirestore
      .collection('users')
      .doc(this.uid)
      .collection('movies')
      .doc(this.id)
      .valueChanges()
      .subscribe((movie:any) => {
        this.name = movie.name;
        this.description = movie.description;
        this.length = movie.length;
        this.image = movie.img;
    })
  }

  save(){
    this.showLoading("Updating...")
    this.firebasrFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .doc(this.id)
    .update({
      name : this.name,
      description : this.description,
      length : this.length,
      img : this.image 
    })
    .then(() => {
      this.showToast("Updated successfully");
      this.hideLoading();

      this.navCtrl.pop();

    })
    .catch(error => {
      this.showToast(error);
      this.hideLoading();

    })
  }

}
