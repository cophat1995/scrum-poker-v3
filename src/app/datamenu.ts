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

    this.deckTime = [20,10,7,5,3];

    this.largest_PlaningPoker = [5, 8, 13, 20, 40, 100];
    this.largest_Fibonacci = [8,13,21,34,55,89,144,233,377,610,987];
    this.largest_Natural = [6,7,8,9,10,11,12,13,14,15,16];
  }
}