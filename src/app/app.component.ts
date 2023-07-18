import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OneHealth';

  user: User = {
    id: '',
    first_name: 'Juan',
    last_name: 'Arguello',
    email: 'jdiegoquan@gmail.com',
    mobile: '8682-7269'   
  };   

  constructor(private userService: UsersService) {
    console.log("Prueba")
    this.createUser()

    
    this.userService.getUsers().subscribe(users => {
      console.log(users)
    })
  }

  async createUser() {
    const response = await this.userService.addUser(this.user)
    console.log(response)
  }




}
