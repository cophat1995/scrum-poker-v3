import {Component, ViewChild} from '@angular/core';
import {MenuController} from 'ionic-angular';
import {NavController, Navbar} from 'ionic-angular';
import {NativeAudio} from '@ionic-native/native-audio';
@Component({templateUrl: 'time.html'})

export class TimeDetails {
  @ViewChild(Navbar)navBar : Navbar;

  mytimeout = null;
  time : any;
  atTime = 0;
  duraTion : any;
  sound_value;
  constructor(public menuCtrl : MenuController, public navCtrl : NavController, private nativeAudio : NativeAudio) {
    if (typeof(Storage) !== "undefined") {
      this.duraTion = localStorage.getItem('duraTion') || 10;
      this.sound_value = localStorage.getItem('sound_value');
    }
    this.startTimer(this.duraTion);
    this
      .menuCtrl
      .enable(false);
    this
      .nativeAudio
      .preloadSimple('time', 'assets/audio/clock-ticking.mp3');
  }
  startTimer(duraTion) {
    this.time = duraTion;
    var _this = this;
    this.mytimeout = setInterval(function () {
      _this.onTimeout();
    }, 1000);
    this.nativeAudio.stop('time');
  }
  onTimeout() {
    this.nativeAudio.play('time');
    if (this.time == 0) {
      clearInterval(this.mytimeout);
      this.nativeAudio.stop('time');
    } else {
      this.time--;
    }
  };

  start_stopTimer() {
    if (this.time == 0) {
      this.time = this.duraTion;
      this.atTime = 1;
      this.nativeAudio.stop('time');
    }
    if (this.atTime == 0) {
      this.atTime = 1;
      this.time = this.duraTion;
      clearTimeout(this.mytimeout);
      this.nativeAudio.stop('time');
    } else {
      this.atTime = 0;
      clearTimeout(this.mytimeout);
      this.startTimer(this.duraTion);
      this.nativeAudio.stop('time');
    }
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = (e : UIEvent) => {
      this
        .navCtrl
        .pop();
      this
        .menuCtrl
        .enable(true);
    };
  }
}
