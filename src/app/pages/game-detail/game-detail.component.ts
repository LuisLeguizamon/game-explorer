import { Component } from '@angular/core';
import { Game } from 'src/app/models/games.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  game: Game = {
    id: 1,
    developer: 'Blizzard',
    title: 'Game 1',
    platform: 'Web',
    genre: 'Shooter',
    publisher: 'Activision Blizzard',
    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment.',
    thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg'
  };
}
