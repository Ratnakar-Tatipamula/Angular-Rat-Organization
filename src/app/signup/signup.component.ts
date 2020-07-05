import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm : FormGroup;
  alert : boolean = false;

  name : any;
  email: any;
  password: any;

  formDetails: any;


  constructor(private demoService: DemoService) { }

  ngOnInit() {
    this.angForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.minLength(5)]),
      email : new FormControl('', Validators.required),
      password : new FormControl('',Validators.required)
     
    })
  }

  onSubmit() {
    this.alert = true;
    this.name = this.angForm.value.name;
    this.email = this.angForm.value.email;
    this.password = this.angForm.value.password;
    console.log(this.name,this.email,this.password);
    this.angForm.reset();
    this.formDetails = {names : this.name, emails : this.email, passwords : this.password };

    this.demoService.postData(this.formDetails);

  }

  closeAlert() {
   this.alert = false;
  }

}
