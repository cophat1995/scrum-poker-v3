import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';

import {Scrum} from '../pages/scrum/scrum';
import {Insomnia} from '@ionic-native/insomnia';

@Component({templateUrl: 'app.html'})
export class MyApp {
  @ViewChild(Nav)nav : Nav;
  rootPage : any = Scrum;
  pages : Array < {
    title: string,
    component: any
  } >;
  mainPage : any = Scrum;

  deckcolors = [];
  largestCard = [];
  deckTime = [];
  model : any = {};
  autoHide_value : boolean;
  keepScreen_value : boolean;
  sound_value : boolean;

  constructor(storage : Storage, public platform : Platform, public statusBar : StatusBar, public splashScreen : SplashScreen, private insomnia : Insomnia) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.loadData();
  }
  loadData() {
    this.deckcolors = [
      {
        value: 'white',
        title: 'White'
      }, {
        value: 'gainsboro',
        title: 'Gainsboro'
      }, {
        value: 'cyan',
        title: 'Cyan'
      }, {
        value: 'pink',
        title: 'Pink'
      }, {
        value: 'lightgreen',
        title: 'Light Green'
      }, {
        value: 'lightyellow',
        title: 'Light Yellow'
      }, {
        value: 'lightblue',
        title: 'Light Blue'
      }
    ];
    this.largestCard = [
      10,
      20,
      30,
      40,
      50,
      60
    ];
    this.deckTime = [
      {
        value: '10',
        title: '10'
      }, {
        value: '7',
        title: '7'
      }, {
        value: '5',
        title: '5'
      }, {
        value: '3',
        title: '3'
      }
    ];
    // load data to the UI
    this.model.background = localStorage.getItem('backgroundColor');
    this.model.maxCardNumber = localStorage.getItem('maxCardNumber');
    this.model.duration = localStorage.getItem('duraTion');

    if (this.model.background == null) 
      this.model.background = 'white';
    
    if (this.model.maxCardNumber == null) 
      this.model.maxCardNumber = 60;
    
    if (this.model.duration == null) 
      this.model.duration = 10;
    
    if (localStorage.getItem('autoHide_value') == 'rotateY(180deg)') {
      this.autoHide_value = true;
    } else {
      this.autoHide_value = false;
    }

    if (localStorage.getItem('sound_value') == 'true') {
      this.sound_value = true;
    } else {
      this.sound_value = false;
    }

    if (localStorage.getItem('keepScreen_value') == 'true') {
      this.keepScreen_value = true;
    } else {
      this.keepScreen_value = false;
    }
    this.changeScreen(this.keepScreen_value);
  }
  changeBackground() {
    var backgroundColor = this.model.background;
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('backgroundColor', backgroundColor);
    } else {
      // using session
    }
    this.nav.setRoot(this.rootPage);
  }
  changeLargest() {
    var maxCardNumber = this.model.maxCardNumber;
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('maxCardNumber', maxCardNumber);
    } else {
      // using session
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
