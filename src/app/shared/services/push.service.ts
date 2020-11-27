import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PushService {

    currentMessage = new BehaviorSubject(null);
    
    constructor(private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messages.subscribe((res) => {
            console.log(res);
            res.onMessages = res.onMessage.bind(res);
            res.onTokenRefresh = res.onTokenRefresh.bind(res);
        });
    }

    requestPermission = () => {
        return this.angularFireMessaging.requestPermission.pipe(
            mergeMapTo(this.angularFireMessaging.tokenChanges)
        );
    }

    // requestPermission = () => {
    //     this.angularFireMessaging.requestToken.subscribe((token) => {
    //         console.log(token);
    //     }, (err) => {
    //         console.error('Unable to get permission to notify.', err);
    //     });
    // }




    receiveMessage = () => {
        this.angularFireMessaging.messages.subscribe((payload) => {
            console.log("new message received. ", payload);
            this.currentMessage.next(payload);
        })
    }

}