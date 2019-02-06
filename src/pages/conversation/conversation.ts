import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { ConversationService } from '../../service/conversation.service';
import { Vibration } from '@ionic-native/vibration';
// import { HomePage } from '../home/home';
// import { User, Status } from '../../interfaces/user';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  user: User
  friend: User
  conversationId: any
  message: string
  conversation: any
  shake: boolean
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public authService: AuthService, public conversationService: ConversationService, public vibration: Vibration) {
    this.friend = this.navParams.get('user')
    console.log(this.user)
    this.authService.getStatus().subscribe((data)=>{
      this.userService.getUserById(data.uid).valueChanges().subscribe((usr:User)=>{
        this.user = usr
        let idsArray = [this.user.uid, this.friend.uid].sort()
        this.conversationId = idsArray.join('||')
        this.getConversation()
      },error=>{

      })
    },error=>{

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  goBack(){
    this.navCtrl.popToRoot()
  }
  sendMessage(){
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      reciever: this.friend.uid,
      type: 'text',
      content: this.message
    }
    this.conversationService.add(messageObject).then(response =>{
      this.message = ''
    }).catch(error=>{

    })
  }
  getConversation(){
    this.conversationService.getById(this.conversationId).valueChanges().subscribe(response=>{
      this.conversation = response
    },error=>{

    })
  }
  getUserNickById(uid){
    if(uid === this.friend.uid){
      return this.friend.nick
    } else {
      return this.user.nick
    }
  }
  doZumbido(){
    const audio = new Audio('assets/icon/sound/zumbido.m4a')
    audio.play()
    this.shake = true
    this.vibration.vibrate([200,80,150])
    window.setTimeout(()=>{
      this.shake = false
    },800)
  }
  sendZumbido(){
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      reciever: this.friend.uid,
      type: 'zumbido'
    }
    this.conversationService.add(messageObject).then(response =>{
      this.doZumbido()
    }).catch(error=>{

    })
  }
}
