import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  username = '';
  constructor(private demoservice: DemoService, private router: Router) { 
     this.demoservice.getUserName()
     .subscribe(
       data => this.username = data.toString(),
       error => console.log('error in getting username')
     );
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.demoservice.isLoggedIn = false;    
    this.router.navigate(['../signin']);
  }

  

}
