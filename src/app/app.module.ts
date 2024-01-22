import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { FormsModule } from '@angular/forms';
import { MuseumPieceComponent } from './museum-piece/museum-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    MuseumPieceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
