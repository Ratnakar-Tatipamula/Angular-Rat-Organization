import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemoService } from '../demo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  angForm : FormGroup;
  name : any;
  password: any;
  formDetails: any;

  constructor(private demoService: DemoService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.angForm = new FormGroup({
    name : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
     
    })
  }

  onSubmit() {
    this.name = this.angForm.value.name;
    this.password = this.angForm.value.password;
    console.log("The values are: ",this.name,this.password);
    this.angForm.reset();
    this.formDetails = {names : this.name, passwords : this.password };

    this.demoService.postLoginData(this.formDetails)
    .subscribe(
      data => {
        console.log("The token is: ", data);
        localStorage.setItem('token', data.toString());
        this.demoService.isLoggedIn = true;
        this.router.navigate(['../welcome'], { relativeTo: this.activatedRoute } );

      },
      error => { console.log('Error while Logging In', error ); }
    );
    // this.demoService.isLoggedIn = true;
    // this.router.navigate(['../welcome'], { relativeTo: this.activatedRoute } );

  }

}
