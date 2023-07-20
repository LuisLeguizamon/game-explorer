import { GameDataService } from './services/game-data.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  gamesAll: any;
  gamesPortion: any;
  pageSize: number = 10;

  constructor(private gameDataService: GameDataService){}
  
  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameDataService.getGames().subscribe((games) =>{
      this.gamesAll = games;
      this.gamesPortion = this.gamesAll.slice(0, this.pageSize);
    });
  }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnScroll(){
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // Check if the user has reached the bottom of the page
    if (scrollY + visibleHeight >= totalHeight) {
      // Calculate the current page number (add +1 to account for 0-based indexing)
      let pageNumber = Math.floor(scrollY/visibleHeight)+1;

      let index = pageNumber*this.pageSize;
      let nextPageGames = this.gamesAll.slice(index, index + this.pageSize);

      // Check if there are more games to load
      if (nextPageGames.length > 0) {
        this.gamesPortion = this.gamesPortion.concat(nextPageGames);
      }
    }
  }
}
