import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private baseUrl = 'https://www.freetogame.com/api/';

  constructor(private http: HttpClient) { }

  getGames(queryParamType?: string, queryParam?: string) {
    const endpoint = 'games';
    let url = this.corsUrl+this.baseUrl+endpoint;

    if (queryParamType == 'platform') {
      url = url+'?platform='+queryParam;
    }

    return this.http.get(url);
  }

  getGame(gameId: string) {
    const endpoint = 'game';
    let url = this.corsUrl+this.baseUrl+endpoint;

    url = url+'?id='+gameId;

    return this.http.get(url);
  }
}
