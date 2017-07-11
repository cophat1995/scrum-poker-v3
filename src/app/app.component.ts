import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { Scrum } from '../pages/scrum/scrum';
//import { TimeDetails } from '../time/time';

import { Insomnia } from '@ionic-native/insomnia';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  insomnia: Insomnia;
  rootPage: any = Scrum;
  pages: Array<{title: string, component: any}>;
  mainPage: any = Scrum;
  deckcolors =[];
  largestCard =[];
  deckTime = [];
  model:any = {};
  autoHide_value:boolean;
  keepScreen_value:boolean;
  constructor(storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Scrum', component: Scrum }
    ];

    this.deckcolors = [
      { value: 'white',title: 'White'},
      { value: 'gainsboro',title: 'Gainsboro'},
      { value: 'cyan',title: 'Cyan'},
      { value: 'pink',title: 'Pink'},
      { value: 'lightgreen',title: 'Light Green'},
      { value: 'lightyellow',title: 'Light Yellow'},
      { value: 'lightblue',title: 'Light Blue'},
    ]
    this.largestCard=[5,6,7,8,9,10]
    this.deckTime =[
      { value: '10', title: '10'},
      { value: '7', title: '7'},
      { value: '5', title: '5'},
      { value: '3', title: '3'},
    ]
    
    // load data to the UI
    this.model.background = sessionStorage.getItem('backgroundColor');
    this.model.maxCardNumber = sessionStorage.getItem('maxCardNumber');
    this.model.duration = sessionStorage.getItem('duraTion');
    if(this.model.background == null)
      this.model.background = 'white';

    if(this.model.maxCardNumber == null)
      this.model.maxCardNumber = 10;

    if(this.model.duration == null)
      this.model.duration = 10;

    if( sessionStorage.getItem('autoHide_value') == 'rotateY(180deg)')
        this.autoHide_value = true
    else
        this.autoHide_value = false
  }       
  changeBackground(){
    var backgroundColor = this.model.background;
    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem('backgroundColor', backgroundColor);
    } else {
      // using session
    }
    location.reload();
  }
  changeLargest(){
    var maxCardNumber = this.model.maxCardNumber;
    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem('maxCardNumber', maxCardNumber);
    } else {
      // using session
    }
    location.reload();
  }
  changeDuration(){
    var duraTion = this.model.duration;
    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem('duraTion', duraTion);
    } else {
      // using session
    }
    //location.reload();
  }
  autoHide(){
    if (typeof(Storage) !== "undefined") {
      if(this.autoHide_value == true)
        sessionStorage.setItem('autoHide_value', 'rotateY(180deg)');
      else
        sessionStorage.setItem('autoHide_value', 'rotateY(0)');
    } else {
      // using session
    }
  }
  keepScreenOn(){
      if (typeof(Storage) !== "undefined") {
        if(this.keepScreen_value == true)
          this.insomnia.keepAwake();
        else {
          this.insomnia.allowSleepAgain();
        }
      } else {
        // using session
      }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }
}
