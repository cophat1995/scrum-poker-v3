import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { TimeDetails } from '../time/time';

@Component({
  templateUrl: 'scrum-details.html'
})
export class ScrumDetails {
  selectedItem: any;
  navItem:any;
  currentDeg;
  bgColor = 'white';
  img;
  autoHide_value;
  sound_value;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio ) {
    var backgroundColor; // default is #fffff;\
    this.navItem = navParams.get('item');
    if(this.navItem.constructor === String)
      this.selectedItem = this.navItem;
    else{
      this.img =this.navItem;
    }
    if (typeof(Storage) !== "undefined") {
      backgroundColor = localStorage.getItem('backgroundColor');
      this.autoHide_value = localStorage.getItem('autoHide_value');
      this.sound_value = localStorage.getItem('sound_value');
    }
    this.bgColor = backgroundColor;
    if(this.autoHide_value == null)
      this.currentDeg = 'rotateY(0)';
    else this.currentDeg = this.autoHide_value;

    if(this.sound_value == 'true')
      this.nativeAudio.preloadSimple('card', 'assets/audio/card.WAV');  
    else
      this.nativeAudio.preloadSimple('','');
  }
  roTate(){
    var randomIndex = Math.floor((Math.random() * 6) + 1);
    if(this.currentDeg == 'rotateY(0)'){
      this.currentDeg = 'rotateY(180deg)';
      document.getElementById("item").style.transform = 'rotateY(180deg)';   
      document.getElementById('card-back').setAttribute('src', "assets/image-scrum/b" + randomIndex + ".jpg");
    } else {
      this.currentDeg = 'rotateY(0)';
      document.getElementById("item").style.transform = 'rotateY(0)';
    }
    this.nativeAudio.play('card');
  }
  timeOver(){
    this.navCtrl.push(TimeDetails);
  }
}