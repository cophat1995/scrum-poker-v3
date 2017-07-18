import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, MenuController, Nav, Events} from 'ionic-angular';
import {ScrumDetails} from '../scrum-details/scrum-details';
import {TimeDetails} from '../time/time';
import {MyApp} from '../../app/app.component';

@Component({selector: 'scrum', templateUrl: 'scrum.html'})
export class Scrum {
  @ViewChild(Nav)nav : Nav;
  menuPage : any = MyApp;

  IMG_SEQUENCE = ['assets/coffee.png']
  SPECIAL_SEQUENCE = ['$'];
    PLANING_POCKER_SEQUENCE = [0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  FIBONACI_SEQUENCE = [0,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987];
  T_SHIRT_SEQUENCE = ['XS','S','M','L','XL','XXL','XXXL'];
  NATURAL_SEQUENCE = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  arrCard = [];
  bgColor = 'white';
  selectedItem : any;
  scrumPoker;
  maxCardNumber;
  cardWidth;
  cardHeight;
  paddingTopLabel;
  fontSizeNumber = 2;
  isFewCards : boolean = true;
  maxCard_ppoker;
  maxCard_fibonacci;
  maxCard_natural;

  constructor(storage : Storage, public navCtrl : NavController, public navParams : NavParams, public menuCtrl : MenuController, public events: Events) {
    this.loadData();
    console.log(this.NATURAL_SEQUENCE);
  }
  loadData() {
    var curSequenceArray = [];
    var sequenceType; // fibonaci, planing-pocker, natural, t-shirt
    var backgroundColor; // default is #fffff;\
    if (typeof(Storage) !== "undefined") {
    sequenceType = localStorage.getItem('sequenceType');
    backgroundColor = localStorage.getItem('backgroundColor');
    this.maxCard_ppoker = parseInt(localStorage.getItem('maxCard_ppoker')) || 200;
    this.maxCard_fibonacci = parseInt(localStorage.getItem('maxCard_fibonacci')) || 200;
    this.maxCard_natural = parseInt(localStorage.getItem('maxCard_natural')) || 200;
  }
  if (sequenceType == null || sequenceType == 'ppoker') {
    curSequenceArray = this.PLANING_POCKER_SEQUENCE;
    this.scrumPoker = 'ppoker';
    this.loadCardNumber(curSequenceArray,this.maxCard_ppoker);
  } else if (sequenceType == 'fibonacci') {
    curSequenceArray = this.FIBONACI_SEQUENCE;
    this.scrumPoker = 'fibonacci';
    this.loadCardNumber(curSequenceArray,this.maxCard_fibonacci);
  } else if (sequenceType == 'tshirt') {
    curSequenceArray = this.T_SHIRT_SEQUENCE;
    this.scrumPoker = 'tshirt';
    this.loadCardNumber(curSequenceArray,200);
  } else {
    curSequenceArray = this.NATURAL_SEQUENCE;
    this.scrumPoker = 'natural';
    this.loadCardNumber(curSequenceArray,this.maxCard_natural);
  }
  if(backgroundColor == null)
    this.bgColor = 'white';
  else 
    this.bgColor = backgroundColor;
}
changeSegment() {
  var curSequenceArray = [];
  this.arrCard = [];
  if (this.scrumPoker == "ppoker") {
    curSequenceArray = this.PLANING_POCKER_SEQUENCE;
    this.loadCardNumber(curSequenceArray,this.maxCard_ppoker);
  } else if (this.scrumPoker == "fibonacci") {
    curSequenceArray = this.FIBONACI_SEQUENCE;
    this.loadCardNumber(curSequenceArray,this.maxCard_fibonacci);
  } else if (this.scrumPoker == "natural") {
    curSequenceArray = this.NATURAL_SEQUENCE;
    this.loadCardNumber(curSequenceArray,this.maxCard_natural);
      
  } else if (this.scrumPoker == "tshirt") {
    curSequenceArray = this.T_SHIRT_SEQUENCE;
    this.loadCardNumber(curSequenceArray,200);
  }
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem('sequenceType', this.scrumPoker);
  } else {
    // using session
  }
  this.caculateSizeCard(this.arrCard.length + 1);
  this.events.publish('segment: changed',this.scrumPoker);
}
loadCardNumber(a,maxCard) {
  if (a != this.T_SHIRT_SEQUENCE) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] <= maxCard) {
        if (a[i] == 0.5) {
          this.arrCard[i] = "1/2";
        } else {
          this.arrCard[i] = "" + a[i];
        }
      }
    }
  } else {
    this.arrCard = this.T_SHIRT_SEQUENCE;
  }
  this.add_SpecialCard();
}
add_SpecialCard() {
  var maxCard = this.arrCard.length + this.SPECIAL_SEQUENCE.length;
  for (var j = this.arrCard.length; j < maxCard; j++) {
    for (var z = 0; z < this.SPECIAL_SEQUENCE.length; z++) {
      if (this.arrCard[j - 1] != this.SPECIAL_SEQUENCE[z]) {
        this.arrCard[j] = "" + this.SPECIAL_SEQUENCE[j - this.arrCard.length];
      } else 
        break;
      }
    }
  this.caculateSizeCard(this.arrCard.length + 1);
}

caculateSizeCard(numOfCards) {
  var cardFrame = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  this.fontSizeNumber = (numOfCards <= 9)
    ? 2.5
    : 2; //bigger if 3 cards/row
  cardFrame.width = (numOfCards <= 9)
    ? ((cardFrame.width - 30) / 3)
    : ((cardFrame.width - 10 * 5) / 4);
  cardFrame.height = (cardFrame.width * 8) / 5; //card ratio 5:8
  this.cardWidth = cardFrame.width * 0.9;
  this.cardHeight = cardFrame.height * 0.9;
  this.paddingTopLabel = (this.cardHeight - this.fontSizeNumber * 16) / 2;
  this.isFewCards = (numOfCards <= 9)
    ? true
    : false;
}
itemTapped(event, item) {
  this
    .navCtrl
    .push(ScrumDetails, {item: item});
}
timeOver() {
  this
    .navCtrl
    .push(TimeDetails);
}
openMenu() {
  this
    .menuCtrl
    .open();
  this
    .navCtrl
    .setRoot(this.menuPage);
}
}