import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from 'firebase';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user: any
pictureId
location: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,private userService: UserService, private camera: Camera, private toastCtrl: ToastController, private geolocation: Geolocation) {
  this.authService.getStatus().subscribe(data=>{
    this.userService.getUserById(data.uid).valueChanges().subscribe((usr: any)=>{
      this.user = usr
    },error=>{
      console.log(error)
    })
  }, error =>{
    console.log(error)
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  saveData(){
    this.userService.editUser(this.user).then(data =>{
      alert('Usuario editado')
    }).catch(error=>{
      console.log(error)
    })
  }
  async takePicture(source){
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true
      }
      cameraOptions.sourceType = (source == 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
      const result = await this.camera.getPicture(cameraOptions)
      const image = 'data:image/jpeg;base64,' + result
      this.pictureId = Date.now()
      this.userService.uploadPicture(this.pictureId+ '.jpg',image).then(response =>{
        this.userService.getDownloadURL(this.pictureId + '.jpg').subscribe((url)=>{
          this.user.avatar = url
          let toast = this.toastCtrl.create({
            message: 'Foto subida',
            duration: 3000,
            position: 'bottom'
          })
          toast.present()
        },error =>{

        })
      }).catch(error =>{

      })
      // console.log(image)

    } catch(e) {
      console.error(e)
    }
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then(response => {
      this.location = response
    }).catch(error =>{

    })
  }

}
