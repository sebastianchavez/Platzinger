import { Injectable } from "@angular/core";
import { User, Status } from "../interfaces/user";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable()
export class UserService{
  friends: User[]
  user: User
    constructor(public afdb: AngularFireDatabase , private angularFireStorage: AngularFireStorage){
    
    }
    getUsers(){
      return this.afdb.list('/users')
    }
    getUserById(uid){
      return this.afdb.object('/users/' + uid)
    }
    createUser(user){
      return this.afdb.object('/users/'+ user.id).set(user) 
    }
    editUser(user){
      return this.afdb.object('/users/' + user.uid).set(user)
    }
    uploadPicture(picture_name, image) {
      return this.angularFireStorage.ref('pictures/' + picture_name).putString(image, 'data_url');
    }
    getDownloadURL(picture_name) {
      return this.angularFireStorage.ref('pictures/' + picture_name).getDownloadURL();
    }
    addFriend(uid, friendId) {
      this.afdb.object('users/' + uid + '/friends/' + friendId).set(friendId);
      return this.afdb.object('users/' + friendId + '/friends/' + uid).set(uid);
    }
}