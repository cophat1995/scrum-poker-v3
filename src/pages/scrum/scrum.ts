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
    12
  ];
  arrCard = [];
  bgColor = 'white';
  selectedItem : any;
  scrumPoker;
  maxCardNumber;

  constructor(storage : Storage, public navCtrl : NavController, public navParams : NavParams, public modalCtrl : ModalController) {
    this.loadData();
  }
  loadData() {
    var curSequenceArray = [];
    var sequenceType; // fibonaci, planing-pocker, natural, t-shirt
    var backgroundColor; // default is #fffff;\
    if (typeof(Storage) !== "undefined") {
    sequenceType = localStorage.getItem('sequenceType');
    backgroundColor = localStorage.getItem('backgroundColor');
    this.maxCardNumber = parseInt(localStorage.getItem('maxCardNumber')) || 100;
  }
  if (sequenceType == null || sequenceType == 'ppoker') {
    curSequenceArray = this.PLANING_POCKER_SEQUENCE;
    this.scrumPoker = 'ppoker';
  } else if (sequenceType == 'fibonacci') {
    curSequenceArray = this.FIBONACI_SEQUENCE;
    this.scrumPoker = 'fibonacci';
  } else if (sequenceType == 'tshirt') {
    curSequenceArray = this.T_SHIRT_SEQUENCE;
    this.scrumPoker = 'tshirt';
  } else {
    curSequenceArray = this.NATURAL_SEQUENCE;
    this.scrumPoker = 'natural';
  }
  if (backgroundColor == null) {
    backgroundColor = "white"; // white, gray, cyan
  }
  this.bgColor = backgroundColor;
  this.loadCardNumber(curSequenceArray);
}
loadCardNumber(a) {
  if(a != this.T_SHIRT_SEQUENCE){
  for (var i = 0; i < a.length; i++) {
    if (a[i] <= this.maxCardNumber) {
      if (a[i] == 0.5) {
        this.arrCard[i] = "1/2";
      } else {
        this.arrCard[i] = "" + a[i];
      }
    }
  }
  }
  else{
    this.arrCard = this.T_SHIRT_SEQUENCE;
  }
  this.add_SpecialCard();
}
  add_SpecialCard(){
    var maxCard = this.arrCard.length + this.SPECIAL_SEQUENCE.length;
    for (var j = this.arrCard.length; j < maxCard; j++) 
      this.arrCard[j] = "" + this.SPECIAL_SEQUENCE[j - this.arrCard.length];
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
  this.loadCardNumber(curSequenceArray);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem('sequenceType', this.scrumPoker);
  } else {
    // using session
  }
  console.log(curSequenceArray)
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