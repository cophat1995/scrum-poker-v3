import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class DataMenuPage {

  deckcolors = [];
  deckTime = [];

  largest_PlaningPoker = [];
  largest_Fibonacci = [];
  largest_Natural = [];

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
    this.largest_PlaningPoker = [7, 8, 9];
    this.largest_Fibonacci = [10, 20];
    this.largest_Natural = [10, 11, 12];
  }
}