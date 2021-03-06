import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../service/auth.service';
import { ProfilePage } from '../pages/profile/profile';
// import { ProfilePage } from '../pages/profile/profile';
// import { ConversationPage } from '../pages/conversation/conversation';
// import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthService, public app: App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage},
      { title: 'List', component: ListPage }
      // { title: 'Login', component: LoginPage},
      // { title: 'Profile', component: ProfilePage},
      // { title: 'Conversation', component: ConversationPage},
      // { title: 'About', component: AboutPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.auth.logOuth().then(()=>{
      this.app.getRootNav().setRoot(LoginPage)
    }).catch( error => {
      console.log(error)
    })
  }
}
