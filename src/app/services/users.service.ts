import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userRef = collection(this.firestore, 'users');

  constructor(private firestore: Firestore) { }

  addUser(user: User){
    
    return addDoc(this.userRef, user);
  }

  getUsers(): Observable<User[]>{
    return collectionData(this.userRef, {idField: 'id'}) as Observable<User[]>;    
  }

}
