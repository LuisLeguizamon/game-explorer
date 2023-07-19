import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  getGames() {
    const corsurl = 'https://cors-anywhere.herokuapp.com/';
    const baseurl = 'https://www.freetogame.com/api/';
    const endpoint = 'games';
    const url = corsurl+baseurl+endpoint; 

    return this.http.get(url);
  }
}
