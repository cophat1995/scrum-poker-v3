import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NativeAudio} from '@ionic-native/native-audio';
import {TimeDetails} from '../time/time';

@Component({templateUrl: 'scrum-details.html'})
export class ScrumDetails {
  selectedItem : any;
  navItem : any;
  currentDeg;
  bgColor = 'white';
  img;
  autoHide_value;
  sound_value;
  typeCard;
  contentChild = {width: 0, height: 0, marginLeft: 0, marginTop: 0};

  constructor(public navCtrl : NavController, public navParams : NavParams, private nativeAudio : NativeAudio) {
    var backgroundColor; // default is #fffff;\
    this.navItem = navParams.get('item');
    if (this.navItem.constructor === String) 
      this.selectedItem = this.navItem;
    else {
      this.img = this.navItem;
    }
    if (typeof(Storage) !== "undefined") {
      backgroundColor = localStorage.getItem('backgroundColor');
      this.autoHide_value = localStorage.getItem('autoHide_value');
      this.sound_value = localStorage.getItem('sound_value');
    }
    if(backgroundColor == null)
      this.bgColor = 'white';
    else 
      this.bgColor = backgroundColor;
    if (this.autoHide_value == null) 
      this.currentDeg = 'rotateY(0)';
    else {
      this.currentDeg = 'rotateY(0)';
      var _this = this;
      var autoFold = setInterval(function (data) {
        _this.roTate();
        if(_this.currentDeg == _this.autoHide_value) {
          clearInterval(autoFold);
        }
      }, 100);
    }
    this
      .nativeAudio
      .preloadSimple('card', 'assets/audio/time.wav');
    if(typeof(this.navItem) == 'string') {
      this.typeCard = true;
    } else {
      this.typeCard = false;
    }
    this.changeSize();
  }
  changeSize() {
    var ratioScreen = Math.round((window.innerHeight/window.innerWidth)*100)/100;
    if(ratioScreen > 1.45) { //1.4 is standard card
      this.contentChild.width = window.innerWidth;
      this.contentChild.height = window.innerWidth*1.4;
      this.contentChild.marginTop = (window.innerHeight - 56 - this.contentChild.height)/2; // translate to center of page (vertically)
    }
    else if(ratioScreen < 1.35) {
      this.contentChild.height = window.innerHeight - 56; //56 is Nav bar Size
      this.contentChild.width = window.innerHeight/1.4;
      this.contentChild.marginLeft = (window.innerWidth - this.contentChild.width)/2; // translate to center of page (horizontally)
    }
    else {
      this.contentChild.width = window.innerWidth;
      this.contentChild.height = window.innerHeight;
    }
  }
  roTate() {
    if (this.currentDeg == 'rotateY(0)') {
      this.currentDeg = 'rotateY(180deg)';
      document
        .getElementById("item")
        .style
        .transform = 'rotateY(180deg)';
    } else {
      this.currentDeg = 'rotateY(0)';
      document
        .getElementById("item")
        .style
        .transform = 'rotateY(0)';
    }
    if (this.sound_value == 'true') 
      this.nativeAudio.play('card');
    else 
      this
        .nativeAudio
        .stop('card');

    }
  timeOver() {
    this
      .navCtrl
      .push(TimeDetails);
  }
}