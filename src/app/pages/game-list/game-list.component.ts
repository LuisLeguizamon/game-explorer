import { Game } from 'src/app/models/games.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  gamesAll: any;
  gamesPortion: any = {};
  loading: boolean = true;
  pageSize: number = 10;
  private searchInput$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  genreOptions: Array<any> = [];
  platformOptions: Array<any> = [];

  constructor(private gameDataService: GameDataService){}

  ngOnInit() {
    this.getGames();
    this.subscribeToSearchInput();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getGames(queryParamType?: string, queryParam?: string) {
    this.loading = true;
    this.gameDataService
    .getGames(queryParamType, queryParam)
    .subscribe({
      next: (games) => {
        this.gamesAll = games;
        this.genreOptions = Array.from(new Set(this.gamesAll.map((game: Game) => game.genre)));
        this.platformOptions = Array.from(new Set(this.gamesAll.map((game: Game) => game.platform)));
        this.gamesPortion = this.gamesAll.slice(0, this.pageSize);
      },
      error: (error) => {
        console.log(error);
        alert("An error has ocurred");
      },
      complete: () => this.loading = false,
    });
  }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnScroll(){
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // Check if the user has reached the bottom of the page
    if (scrollY + visibleHeight >= totalHeight) {
      this.loading = true;
      // Calculate the current page number (add +1 to account for 0-based indexing)
      let pageNumber = Math.floor(scrollY/visibleHeight)+1;

      let index = pageNumber*this.pageSize;
      let nextPageGames = this.gamesAll.slice(index, index + this.pageSize);

      // Check if there are more games to load
      if (nextPageGames.length > 0) {
        this.gamesPortion = this.gamesPortion.concat(nextPageGames);
      }
      this.loading = false;
    }
  }

  // Filters
  subscribeToSearchInput() {
    this.searchInput$
      .pipe( debounceTime(300) )
      .subscribe((searchTerm: string) => this.onSearch(searchTerm));
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value;
    this.searchInput$.next(searchTerm);
  }

  onSearch(searchTerm: string) {
    this.gamesPortion = this.gamesAll.filter((game: Game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onSelect(queryParamType: string, optionSelected: string) {
    if (queryParamType == 'platform') {
      this.gamesPortion = this.gamesAll.filter((game: Game) =>
        game.platform.includes(optionSelected)
      );
    } else if (queryParamType == 'genre') {
      this.gamesPortion = this.gamesAll.filter((game: Game) =>
        game.genre.includes(optionSelected)
      );
    }
  }

  isObjectEmpty(): boolean {
    return Object.keys(this.gamesPortion).length === 0;
  }
}
