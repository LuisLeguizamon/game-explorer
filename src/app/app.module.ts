import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './components/game-card/game-card.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { FormsModule } from '@angular/forms';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { GameListComponent } from './pages/game-list/game-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    LoadingModalComponent,
    SelectFilterComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
