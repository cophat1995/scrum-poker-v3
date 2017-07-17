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

    this.deckTime = [20,10,7,5,3];
    this.largest_PlaningPoker = [
      {value:10,
      check: false},
      {value:20,
      check: false},
      {value:30,
      check: false},
      {value:40,
      check: false},

    ];
    this.largest_Fibonacci = [
      {value:20,
      check: false},
      {value:30,
      check: false},
      {value:40,
      check: false},
      {value:50,
      check: false},
      {value:60,
      check: false},
    ];
    this.largest_Natural = [
      {value:9,
      check: false},
      {value:12,
      check: false},
      {value:15,
      check: false},
    ];
  }
}