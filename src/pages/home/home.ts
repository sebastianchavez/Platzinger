import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { User, Status} from '../../interfaces/user';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { UserService } from '../../service/user.service';
import {RequestService} from "../../service/request.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: User[]
  query: string = ''
  status: Status
  user: User;
  constructor(public navCtrl: NavController, private userService: UserService,private alertController: AlertController,private requestService: RequestService, public toastController: ToastController) {
   this.userService.getUsers().valueChanges()
   .subscribe((resutl: User[])=>{
    this.friends = resutl
    console.log(resutl)
   },error => {
    console.log(error)
   })
  }
  
  goToConversation(user: User){
    this.navCtrl.push(ConversationPage, {'user':user})
  }
  goToLogin(){
    this.navCtrl.push(LoginPage)
  }
  goToAbout(){
    this.navCtrl.push(AboutPage)
  }
  getIconByStatus(status){
    let icon = ''
    switch(status){
      case 'Online':
        icon = 'logo_live_online.png'
      break;
      case 'Offline':
        icon = 'logo_live_offline.png'
      break;
      case 'Busy':
        icon = 'logo_live_busy.png'
      break;
      case 'Away':
        icon = 'logo_live_away.png'
      break;
      case 'AppearOffline':
        icon = 'logo_live_appear_offline.png'
      break;
    }
    return icon
  }
  sendRequest() {
    const prompt = this.alertController.create({
      title: 'Agregar Amigo',
      message: 'Ingresar email del amigo para agregar',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.requestService.createRequest(request).then((data) => {
              let toast = this.toastController.create({
                message: 'Solicitud Enviada',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
