import { GameDataService } from './services/game-data.service';
import { Component, HostListener } from '@angular/core';
// import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  gamesAll: any;
  gamesPortion: any = {};
  loading: boolean = true;
  pageSize: number = 10;
  searchTerm: string = '';
  platformOptions: Array<any> = [];
  // searchTerm$ = new Subject<string>();TODO

  constructor(private gameDataService: GameDataService){}
  
  ngOnInit() {
    this.getGames();
  }

  getGames(queryParamType?: string, queryParam?: string) {
    this.loading = true;
    this.gameDataService
    .getGames(queryParamType, queryParam)
    .subscribe({
      next: (games) => {
        this.gamesAll = games;
        this.platformOptions = Array.from(new Set(this.gamesAll.map((game: any) => game.platform)));//TODO: interface for game
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
  onSearch() {
    this.gamesPortion = this.gamesAll.filter((game: any) =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSelect(queryParamType: string, optionSelected: string) {
    if (queryParamType == 'platform') {
      this.gamesPortion = this.gamesAll.filter((game: any) =>
        game.platform.includes(optionSelected)
      );
    }
  }

  isObjectEmpty(): boolean {
    return Object.keys(this.gamesPortion).length === 0;
  }
}
