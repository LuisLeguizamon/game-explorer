import { GameDataService } from './services/game-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  games: any;

  constructor(private gameDataService: GameDataService){}
  
  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameDataService.getGames().subscribe((games) =>{
      this.games = games;
    });
  }
}
