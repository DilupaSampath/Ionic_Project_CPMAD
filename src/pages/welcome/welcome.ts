import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import {FirebaseServicesProvider} from '../../providers/firebase-services/firebase-services'
import { AngularFireAuth } from 'angularfire2/auth';
import { PropertyListPage } from '../property-list/property-list';
import { BrokerListPage } from '../broker-list/broker-list';
import { FavoriteListPage } from '../favorite-list/favorite-list';
import { AboutPage } from '../about/about';
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})

export class WelcomePage {
    @ViewChild(Nav) nav: Nav;
    appMenuItems: Array<MenuItem>;
    
        accountMenuItems: Array<MenuItem>;
    
        helpMenuItems: Array<MenuItem>;


    constructor(public navCtrl: NavController,
         public navParams: NavParams,
        private fs: FirebaseServicesProvider,private aFauth:AngularFireAuth,
    private toast:ToastController) {
             this.appMenuItems = [
            {title: 'Home', component: WelcomePage, icon: 'home'},
            {title: 'Workers', component: PropertyListPage, icon: 'people'},
            {title: 'Chat Room', component: BrokerListPage, icon: 'md-chatbubbles'},
            {title: 'Favorites', component: FavoriteListPage, icon: 'star'},

        ];

        this.accountMenuItems = [
            {title: 'My Account', component: WelcomePage, icon: 'ios-contact'},
            {title: 'Logout', component: WelcomePage, icon: 'log-out'},
        ];

        this.helpMenuItems = [
            {title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
            {title: 'About', component: AboutPage, icon: 'information-circle'},
        ];
    }
    ionViewDidLoad() {
       this.aFauth.auth.onAuthStateChanged((user) => {
        console.log("user--> "+JSON.stringify(user));
            if (user && user.email && user.uid ) {
                this.toast.create({
                    message:'Welcome to EasyPooky , '+user.email,
                    duration:3000
                }).present();
               
            } else {
                // User is not logged in, redirect to where you need to.
                this.toast.create(
                    {
                        message:'Could not find authentication details.',
                        duration:3000
                    }
                ).present();
            }
        });
        
      }

    getData(){
        console.log("working");
        this.fs.getData();  
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
