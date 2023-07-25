import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getGames(queryParamType?: string, queryParam?: string) {
    const endpoint = 'games';
    let url = this.baseUrl+endpoint;

    if (queryParamType == 'platform') {
      url = url+'?platform='+queryParam;
    }

    return this.http.get(url);
  }

  getGame(gameId: string) {
    const endpoint = 'game';
    let url = this.baseUrl+endpoint;

    url = url+'?id='+gameId;

    return this.http.get(url);
  }
}
