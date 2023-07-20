import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  addUser(user: User){
    
  }

  getUsers(){
   return this.http.get('http://onehealth-1.us-west-2.elasticbeanstalk.com/users')
  }
  
}
