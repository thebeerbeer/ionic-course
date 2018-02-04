import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AddmoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addmovie',
  templateUrl: 'addmovie.html',
})
export class AddmoviePage {

  name: string;
  description: string;
  length: number;
  image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  create() {
    this.firebaseFirestore
    .collection('users')
    .doc(this.firebaseAuth.auth.currentUser.uid)
    .collection('movies')
    .add({
      name: this.name,
      description: this.description,
      length: this.length,
      img: this.image
    })
    .then(() => {
      this.navCtrl.pop();
    })

  }

}
