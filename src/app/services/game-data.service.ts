import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  getGames(queryParamType?: string, queryParam?: string) {
    const corsurl = 'https://cors-anywhere.herokuapp.com/';
    const baseurl = 'https://www.freetogame.com/api/';
    const endpoint = 'games';

    let url = corsurl+baseurl+endpoint;

    if (queryParamType == 'platform') {
      url = url+'?platform='+queryParam;
    }

    return this.http.get(url);
  }

  getGame(gameId: string) {
    const corsurl = 'https://cors-anywhere.herokuapp.com/';
    const baseurl = 'https://www.freetogame.com/api/';
    const endpoint = 'game';

    let url = corsurl+baseurl+endpoint;

    url = url+'?id='+gameId;

    return this.http.get(url);
  }
}
