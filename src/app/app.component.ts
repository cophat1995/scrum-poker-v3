import {Component, ViewChild } from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {Insomnia} from '@ionic-native/insomnia';
import {Scrum} from '../pages/scrum/scrum';
import {DataMenuPage} from './datamenu';

@Component({templateUrl: 'app.html'})

export class MyApp {
  @ViewChild(Nav)nav : Nav;
  rootPage : any = Scrum;
  mainPage : any = Scrum;
  pages : Array < { 
    title: string,
    component: any
  } >;

  deckcolors = [];
  deckTime = [];
  model : any = {};
  autoHide_value : boolean;
  keepScreen_value : boolean;
  sound_value : boolean;

  largestCard = [];
  largest_PlaningPoker = [];
  largest_Fibonacci = [];
  largest_Natural = [];
  sequenceType;
  constructor(public data : DataMenuPage, storage : Storage, public platform : Platform, 
              public statusBar : StatusBar, public splashScreen : SplashScreen, 
              private insomnia : Insomnia,
              ) {
    this.initializeApp();
  }
  loadData() {
    this.deckcolors = this.data.deckcolors;
    this.deckTime = this.data.deckTime;
    // load data to the UI
    this.getSequenceType();
    this.getBackground();
    this.getDuration();
    this.getAuto_hide();
    this.getScreenOn();
    this.getSoundOn();
  }
  getSequenceType() {
    this.sequenceType = localStorage.getItem('sequenceType');
    if (this.sequenceType == null || this.sequenceType == 'ppoker') {
      this.largestCard = this.data.largest_PlaningPoker;
    } else if (this.sequenceType == 'fibonacci') {
      this.largestCard = this.data.largest_Fibonacci;
    } else if (this.sequenceType == 'natural') {
      this.largestCard = this.data.largest_Natural;
    }
    console.log(this.sequenceType + ' of menu');
    console.log("largestCard: " + this.largestCard);
  }
  changeBackground() {
    var backgroundColor = this.model.background;
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('backgroundColor', backgroundColor);
    } else {
      // using session
    }
    this
      .nav
      .setRoot(this.rootPage);
  }
  getBackground() {
    this.model.background = localStorage.getItem('backgroundColor');
    if (this.model.background == null) 
      this.model.background = 'white';
    }
  changeLargest() {
    var maxCardNumber = this.model.maxCardNumber;
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('maxCardNumber', maxCardNumber);
    } 
    this.nav.setRoot(this.rootPage);
  }
  changeDuration() {
    var duraTion = this.model.duration;
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('duraTion', duraTion);
    } else {
      // using session
    }
  }
  getDuration() {
    this.model.duration = localStorage.getItem('duraTion');
    if (this.model.duration == null) 
      this.model.duration = 10;
    }
  autoHide() {
    if (typeof(Storage) !== "undefined") {
      if (this.autoHide_value == true) 
        localStorage.setItem('autoHide_value', 'rotateY(180deg)');
      else 
        localStorage.setItem('autoHide_value', 'rotateY(0)');
      }
    else {
      // using session
    }
  }
  getAuto_hide() {
    if (localStorage.getItem('autoHide_value') == 'rotateY(180deg)') {
      this.autoHide_value = true;
    } else {
      this.autoHide_value = false;
    }
  }
  keepScreenOn() {
    if (typeof(Storage) !== "undefined") {
      if (this.keepScreen_value == true) {
        localStorage.setItem('keepScreen_value', 'true');
      } else {
        localStorage.setItem('keepScreen_value', 'false');
      }
    } else {
      // using session
    }
    this.changeScreen(this.keepScreen_value);
  }
  changeScreen(screen) {
    if (screen == true) {
      this
        .insomnia
        .keepAwake();
    } else {
      this
        .insomnia
        .allowSleepAgain();
    }
  }
  getScreenOn() {
    if (localStorage.getItem('keepScreen_value') == 'true') {
      this.keepScreen_value = true;
    } else {
      this.keepScreen_value = false;
    }
    this.changeScreen(this.keepScreen_value);
  }
  soundOn() {
    if (typeof(Storage) !== "undefined") {
      if (this.sound_value == true) {
        localStorage.setItem('sound_value', 'true');
      } else {
        localStorage.setItem('sound_value', 'false');
      }
    } else {
      // using session
    }
  }
  getSoundOn() {
    if (localStorage.getItem('sound_value') == 'true') {
      this.sound_value = true;
    } else {
      this.sound_value = false;
    }
  }
  initializeApp() {
    this
      .platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available. Here you can do
        // any higher level native things you might need.
        this
          .statusBar
          .styleDefault();
        this
          .splashScreen
          .hide();
      });
  }
}
