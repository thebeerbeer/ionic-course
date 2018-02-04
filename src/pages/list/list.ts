import { SetNotificationPage } from './../set-notification/set-notification';
import { ChartPage } from './../chart/chart';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AddmoviePage } from './../addmovie/addmovie';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Action } from 'rxjs/scheduler/Action';
import BasePage from '../base';
import { EditmoviePage } from '../editmovie/editmovie';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends BasePage {
  // arry sample
  items = [];
  results = [];

  uid: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public ToastCtrl: ToastController,
    public LoadingCtrl: LoadingController
  ) {
    super(ToastCtrl, LoadingCtrl)
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;


    this.showLoading("Fetching data...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('movies')
      .snapshotChanges() //samesame value 
      .subscribe(
      data => {
        this.items = [];
        data.map(action => {
          this.items.push({
            id: action.payload.doc.id,
            data: action.payload.doc.data()
          })
        });

        this.results = this.items;

        this.hideLoading();

        console.log(this.items);
      },
      (error => {
        this.hideLoading();
        this.showToast(error);
      })
      )


  }
  navigateAddMovie() {
    this.navCtrl.push(AddmoviePage);
  }

  delete(movieId) {
    this.showLoading("Deleting...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('movies')
      .doc(movieId)
      .delete()
      .then(() => {
        this.hideLoading();
        this.showToast("Delete successfully")
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error)
      });
  }

  edit(movieId) {
    this.navCtrl.push(EditmoviePage, {
      id: movieId
    });
  }

  navigateChart() {
    this.navCtrl.push(ChartPage);
  }

  navigateSetNotification(movie) {
    this.navCtrl.push(SetNotificationPage, {
      movie: movie
    });
  }

  getItems(event) {
    let val = event.target.value;

    if (val == '') {
      this.results = this.items;
    }

    if (val && val.trim() != '') {
      this.results = this.items.filter((item) => {
        console.log(item.data.name.toLowerCase());
        return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

    }

  }
}
