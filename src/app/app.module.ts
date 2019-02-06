import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { UserService } from '../service/user.service';
import { SearchPipe } from '../pipes/search';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "angularfire2/storage";
import { AuthService } from '../service/auth.service';
import { RegisterPage } from '../pages/register/register';
import { ConversationService } from '../service/conversation.service';
import { RequestService } from '../service/request.service';
import { Camera } from '@ionic-native/camera'
import { Geolocation } from '@ionic-native/geolocation'
import { Vibration } from '@ionic-native/vibration'

export const firebaseConfig = {
  apiKey: "AIzaSyDRWOG2Gs2wNmB72jF16i1f4i2F0qFKEXU",
  authDomain: "platziner.firebaseapp.com",
  databaseURL: "https://platziner.firebaseio.com",
  projectId: "platziner",
  storageBucket: "platziner.appspot.com",
  messagingSenderId: "771838416303"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
    AboutPage,
    SearchPipe,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
    AboutPage,
    RegisterPage
    // SearchPipe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    ConversationService,
    RequestService,
    Camera,
    Geolocation,
    Vibration
  ]
})
export class AppModule {}
