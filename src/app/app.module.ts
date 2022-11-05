import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MainPanelModule} from "./main-panel/main-panel.module";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {AuthModule} from "./auth/auth.module";
import {MyAuthGuard} from "./MyAuthGuard";
import {UploadFileModule} from "./upload-file/upload-file.module";

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MainPanelModule,
    AuthModule,
    UploadFileModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    LottieModule.forRoot({player: playerFactory})
  ],
  providers: [
    MyAuthGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
