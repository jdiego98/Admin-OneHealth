import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  addUser(user: User){
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

}
