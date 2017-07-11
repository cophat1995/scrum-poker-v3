import { Component,ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController,Navbar } from 'ionic-angular';
@Component({
  templateUrl: 'time.html'
})

export class TimeDetails {
    @ViewChild(Navbar) navBar:Navbar;

    mytimeout = null;
    time: any;
    atTime = 0;
    duraTion:any;
    constructor(public menuCtrl: MenuController,public navCtrl: NavController) { 
        if (typeof(Storage) !== "undefined") {
        this.duraTion = parseInt(sessionStorage.getItem('duraTion')) || 10;
        }
        this.startTimer(this.duraTion);
        this.menuCtrl.enable(false);
    }
    startTimer(duraTion){
        this.time = duraTion;      
        var _this = this;
        this.mytimeout = setInterval(function(){
            _this.onTimeout();
        }, 1000);
    }
    onTimeout() {
        if(this.time == 0) {
            clearInterval(this.mytimeout);
        }
        else{
            this.time --;       
        }
    };

    start_stopTimer(){
        if(this.time == 0)
        {
            this.time = this.duraTion;
            this.atTime = 1;
        }
        if(this.atTime == 0){
            this.atTime = 1;
            this.time = this.duraTion;
            clearTimeout(this.mytimeout);
        }
        else{
            this.atTime = 0;
            clearTimeout(this.mytimeout);
            
            this.startTimer(this.duraTion);
        }
    }
    ionViewDidLoad() {
        this.navBar.backButtonClick = (e:UIEvent) => {
            this.navCtrl.pop();
            this.menuCtrl.enable(true);
        };
    }
}
