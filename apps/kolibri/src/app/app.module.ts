import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserInterfazModule } from '@fullstack-angular-nest/user-interfaz';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UserInterfazModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
