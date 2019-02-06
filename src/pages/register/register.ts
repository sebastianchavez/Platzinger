import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user: any = {}
varUser: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public authService: AuthService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  registerUser(){
    if (this.user.nick == null || this.user.email == null || this.user.password == null || this.user.password2 == null){
      alert('Debe llenar todos los campos')
    } else {
        this.user.status = 'Offline'
        this.authService.register(this.user).then(response =>{
          let toast = this.toastCtrl.create({
            message: 'Usuario registrado con éxito',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
    }
  }
  confirmPass(){
    if(this.user.password2 != this.user.password){
      alert('contraseña no coincide, ingrese nuevamente')
      this.user.password2 = null
      this.user.password = null
    }
  }
  validatorEmail(){
      var corr = this.user.email
      var b = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
      if (corr != "") {
          if (!b.test(corr)) {
              alert('La dirección de email es incorrecta.')
              this.user.email = null
          }
      }
  }

}
