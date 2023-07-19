import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  games: any;

  constructor(private http: HttpClient){}
  
  ngOnInit() {
    const corsurl = 'https://cors-anywhere.herokuapp.com/';
    const baseurl = 'https://www.freetogame.com/api/';
    const endpoint = 'games';
    const url = corsurl+baseurl+endpoint; 

    this.http.get(url).subscribe(data => {
      this.games = data;
    });
  }
}
