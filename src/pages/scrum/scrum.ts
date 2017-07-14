import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';

import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ScrumDetails} from '../scrum-details/scrum-details';
import {TimeDetails} from '../time/time';

@Component({selector: 'scrum', templateUrl: 'scrum.html'})
export class Scrum {
  IMG_SEQUENCE = ['assets/coffee.png']
  SPECIAL_SEQUENCE = ['$'];
  PLANING_POCKER_SEQUENCE = [
    0, 1 / 2,
    1,
    2,
    3,
    5,
    8,
    13,
    20,
    40
  ];
  FIBONACI_SEQUENCE = [
    0,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55
  ];
  T_SHIRT_SEQUENCE = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL'
  ];
  NATURAL_SEQUENCE = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
  ];
  arrCard = [];
  bgColor = 'white';
  selectedItem : any;
  scrumPoker : string = "ppoker"
  maxCardNumber;
  cardWidth;
  cardHeight;
  paddingTopLabel;
  fontSizeNumber = 2;
  isFewCards: boolean = true;

  constructor(storage : Storage, public navCtrl : NavController, public navParams : NavParams, public modalCtrl : ModalController) {
    this.loadData();
    var curSequenceArray = this.PLANING_POCKER_SEQUENCE; //default = Planning Poker
    this.loadCardNumber(curSequenceArray);
    this.caculateSizeCard(this.arrCard.length + 1); // number of cards = length of arrCard + 1
  }
  loadData() {
    var sequenceType; // fibonaci, planing-pocker, natural, t-shirt
    var backgroundColor; // default is #fffff;\
    if (typeof(Storage) !== "undefined") {
    backgroundColor = localStorage.getItem('backgroundColor');
    this.maxCardNumber = parseInt(localStorage.getItem('maxCardNumber')) || 200;
  }
  if (sequenceType == null) {
    sequenceType = "fibonaci"; // fibonaci, planing-pocker, natural, t-shirt
  }
  if (backgroundColor == null) {
    backgroundColor = "white"; // white, gray, cyan
  }
  this.bgColor = backgroundColor;
}
loadCardNumber(a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] <= this.maxCardNumber) {
      if (a[i] == 0.5) {
        this.arrCard[i] = "1/2";
      } else {
        this.arrCard[i] = "" + a[i];
      }
    }
  }
  var maxCard = this.arrCard.length + this.SPECIAL_SEQUENCE.length;
  for (var j = this.arrCard.length; j < maxCard; j++) 
    this.arrCard[j] = "" + this.SPECIAL_SEQUENCE[j - this.arrCard.length];
  }

caculateSizeCard(numOfCards) {
  console.log("num of cards", numOfCards);
  var cardFrame = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  this.fontSizeNumber = (numOfCards <= 9) ? 2.5:2; //bigger if 3 cards/row
  cardFrame.width = (numOfCards <= 9) ? ((cardFrame.width-30)/3) : ((cardFrame.width-10*5)/4);
  cardFrame.height = (cardFrame.width*8)/5; //card ratio 5:8
  this.cardWidth = cardFrame.width*0.9;
  this.cardHeight = cardFrame.height*0.9; 
  this.paddingTopLabel = (this.cardHeight - this.fontSizeNumber*16)/2;
  this.isFewCards = (numOfCards <= 9) ? true:false;
}

changeSegment() {
  var curSequenceArray = [];
  this.arrCard = [];

  if (this.scrumPoker == "fibonacci") {
    curSequenceArray = this.FIBONACI_SEQUENCE;
  } else if (this.scrumPoker == "ppoker") {
    curSequenceArray = this.PLANING_POCKER_SEQUENCE;
  } else if (this.scrumPoker == "natural") {
    curSequenceArray = this.NATURAL_SEQUENCE;
  } else if (this.scrumPoker == "tshirt") {
    curSequenceArray = this.T_SHIRT_SEQUENCE;
  }
  if (this.scrumPoker != "tshirt") {
    this.loadCardNumber(curSequenceArray);
  } else {
    this.arrCard = this.T_SHIRT_SEQUENCE;
  }
  this.caculateSizeCard(this.arrCard.length + 1);
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
}