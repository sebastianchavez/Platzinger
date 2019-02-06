import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { RegisterPage } from '../register/register';
import { User } from '../../interfaces/user'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService) {
    this.user.status = "AppearOffline"
   }
  login(){
    if(this.user.email != null || this.user.password != null || this.user.status != null){
      this.authService.loginWithEmail(this.user.email,this.user.password)
      .then(response=>{
        alert('logeado correctamente')
        let usr: User
        this.userService.getUserById(response.user.uid).valueChanges()
        .subscribe((resp: User) =>{
          usr = resp
          usr.status = this.user.status
          this.userService.editUser(usr)
          this.navCtrl.setRoot(HomePage)
        }, error =>{
          alert('Error: ' + error)
        })
      }
      ).catch(error =>{
        alert('Ocurrio un error: '+error)
       
      })
    }
  }
  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }
  validatorEmail(){
    var corr = this.user.email
    var b = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    if (corr != "") {
        if (!b.test(corr)) {
            alert('La dirección de email es incorrecta.')
            this.user.email = null
        } else {
          this.user.status = "Online"
        }
    }
  }
}
