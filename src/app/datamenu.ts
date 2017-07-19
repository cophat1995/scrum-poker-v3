import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class DataMenuPage {

  deckcolors = [];
  deckTime = [];
  largest_PlaningPoker =[];
  largest_Fibonacci=[];
  largest_Natural=[];

  constructor() {
    this.deckcolors = [
       {
        value: '#0099FF',
        title: 'Blue'
      }, {
        value: '#FF6600',
        title: 'Orange'
      }, {
        value: '#97d897',
        title: 'Green'
      },{
        value: 'rgb(150, 152, 154)',
        title: 'Gray'
      },{
        value: '#861515',
        title: 'Falu Red'
      },{
        value: 'rgb(71, 117, 117)',
        title: 'Ming'
      },{
        value: 'rgb(108, 140, 173)',
        title: 'Bermuda Grey'
      },
    ];

    this.deckTime = [20,10,7,5,3];

    this.largest_PlaningPoker = [5, 8, 13, 20, 40, 100];
    this.largest_Fibonacci = [8,13,21,34,55,89,144,233,377,610,987];
    this.largest_Natural = [6,7,8,9,10,11,12,13,14,15,16];
  }
}