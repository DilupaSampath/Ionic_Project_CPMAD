import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user ={} as User;
userType='User';
togglestate=false;
  constructor(private aFauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams ,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
 async register(user:User){
  console.log("register --> "+user.email);
   try{ 
     
    const result = await this.aFauth.auth.createUserWithEmailAndPassword(user.email,user.password); 
    this.showAlert();
    this.navCtrl.push(WelcomePage);
    console.log("register message --> "+result['message']);
   }
   catch(e){
    this.ErrorshowAlert(e.message);
     console.error(e.message);


     
   }


  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registerd Successfully!',
      subTitle: 'Your registation was successfuly done with <strong style="color: orange"> EasyPooky</strong>',
      buttons: ['OK']
    });
    alert.present();
  }
  ErrorshowAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: '<strong style="color: red">Registation failed!<strong>',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  changeUserTpe(){
    console.log("toggle work");
    if(this.togglestate){
    
      console.log("true work");
      this.userType='Worker';
    }else{
      console.log("false user");
      this.userType='User';
    }
   
  }

}
