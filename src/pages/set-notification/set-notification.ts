import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LocalNotifications} from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends BasePage {

  date: string;
  time: string;

  movie: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public LocalNotifications: LocalNotifications,
    public toastCtrl : ToastController,
    public loadingCtrl : LoadingController
  ) {
    super(toastCtrl,loadingCtrl);

    this.movie = this.navParams.get('movie');
    console.log(this.movie)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNotificationPage');
  }

  set() {
    // console.log(this.date, this.time);
    let parsedDateTime = Date.parse(this.date + ' ' + this.time);
    let datetime = new Date(parsedDateTime);

    console.log(datetime.toDateString());

    this.LocalNotifications.schedule({
      id: 1,
      text: 'คุณีนัดดูหนังเรื่อง' + this.movie.data.name,
      firstAt: datetime,
      every: 'minute'
    });

    this.showToast(JSON.stringify(this.LocalNotifications.get(1)));
  }

  turnOff(){
    this.LocalNotifications.cancelAll();
  }



}
