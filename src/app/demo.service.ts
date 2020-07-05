import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

@Injectable()
export class DemoService {

    isLoggedIn : boolean = false;
    
    constructor(private http: HttpClient) { }

    postData(formDetails:any) {
        console.log('Demo Service is Executing');
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');

        this.http.post('http://localhost:3000/api/user-ins', JSON.stringify(formDetails), {
        headers: headers
      })
       .subscribe(data => {
         console.log(data);
       });
        console.log('Demo Service is Terminating');
     }

    postLoginData(formDetails:any) {
        console.log('Login Demo Service is Executing');
        return this.http.post('http://localhost:3000/api/user-ret', formDetails, {observe: 'body'});
        console.log('Demo Service is Terminating');
     }

    getUserName() {
        this.isLoggedIn = true;
        return this.http.get('http://localhost:3000/api/username', {
            observe: 'body',
            params: new HttpParams().append('token', localStorage.getItem('token') )
        })
    }

    // getData(){
    //   this.http.get('http://localhost:3000/api/user-ret')
    //   .subscribe(data => {
    //     console.log('retreiving users...');
    //     console.log(data);
    //   });
    // }
}