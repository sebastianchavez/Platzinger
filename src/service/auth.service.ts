import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class AuthService{
    API_ENDPOINT = 'https://platziner.firebaseio.com'
    constructor(public afauth:AngularFireAuth ,private afDB: AngularFireDatabase){
    }
    register(user){
       return this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email,user.password)
            .then(response =>{
                user.password = null
                user.password2 = null
                const usr = {
                    uid: response.user.uid,
                    email: user.email,
                    nick: user.nick,
                    status: user.status
                }
                this.saveUser(usr).then(
                    (data)=>{
                        alert('usuario registrado con éxito')
                    }).catch(error=>{
                        alert('Ocurrio un error: ' + error)
                    })
            })
            .catch(error =>{
                alert('ha ocurrido un error: '+ error)
            })
    }
    saveUser(user){
        return this.afDB.object('/users/'+user.uid).set(user)
    }
    loginWithEmail(email,password){
        return this.afauth.auth.signInWithEmailAndPassword(email,password)
    }
    getStatus(){
        return this.afauth.authState
    }
    logOuth(){
        return this.afauth.auth.signOut()
    }
}