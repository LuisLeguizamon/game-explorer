import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './components/game-card/game-card.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    LoadingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
