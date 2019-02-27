import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.onload = function () {
      console.log("HIT CALLBACK")
      var hash = window.location.hash;
      if (window.location.search.substring(1).indexOf("error") !== -1) {
        // login failure
        window.close();
      } else if (hash) {
        // login success
        var token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('spotify-token', token);
      }
    }
  }
}
