import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/games.model';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  game: any = {
    id: 1,
    developer: '',
    title: '',
    platform: '',
    genre: '',
    publisher: '',
    short_description: '',
    thumbnail: ''
  };

  loading: boolean = true;

  private gameId: any;

  constructor(private route: ActivatedRoute, private gameDataService: GameDataService){}

  ngOnInit() {
    this.getGameData();
  }

  getGameData() {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.gameDataService
    .getGame(this.gameId)
    .subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (error) => {
        console.log(error);
        alert("An error has ocurred");
      },
      complete: () => this.loading = false,
    });
  }
}
