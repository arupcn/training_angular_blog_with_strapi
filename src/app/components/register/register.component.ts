import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CosmicService } from '../../services/cosmic.service'
import {config} from '../../../config/cosmo.config' 

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message = "";
  data;
  img;
  errorMessage = '';
  ifExist: boolean = false;

  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router, private cosmicService: CosmicService,) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'fullName': ['', Validators.required],
      'password': ['', Validators.required],

    });
  } 

  // imagesave(e: Event) {
  //   const target: HTMLInputElement = e.target as HTMLInputElement;
  //   let file = target.files[0];
  //   this.img = file;
  //   console.log(this.img);
  // }

  //registering the user
  register() {
     const credentials = this.registerForm.value;
    // console.log(credentials.image);
    // credentials.write_key = config.write_key;
    // credentials.read_key = config.read_key;

    // this.cosmicService.getUser(credentials)
    //   .subscribe(res => {
    //     this.data = res;
    //     var jsondata = JSON.parse(this.data._body);
    //     if (jsondata.message == "No objects returned.") {
    //       this.cosmicService.addUser(credentials)
    //         .subscribe(res => {
    //           console.log(res);
    //           if (res) {
    //             this.router.navigate(['login']);
    //           }
    //         })
    //     }
    //     else {
    //       return this.message = "Username already exists";

    //     }
    //   })

      this.cosmicService.addUser(credentials).then((res: any) => {
        alert("your registration in successfull, please login to continue");
        this.router.navigateByUrl('/login')
      }).catch(err => {
        // console.log("=====>err",err.error.message[0].message[0].message);
        this.ifExist = true;
        this.errorMessage = err.error.message[0].messages[0].message;
        // console.log(err);
      })
  }

  loginCall() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
