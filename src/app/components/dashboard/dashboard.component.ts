import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CosmicService } from '../../services/cosmic.service';
import {config} from '../../../config/cosmo.config'
import {blogModel} from '../../models/cosmic.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data; 
  allBlogs;
  allPosts;
  blogForm: FormGroup;
  count = false;
  show = false;
  message;
  menu : boolean = false;
  constructor(private router: Router, private _http: Http, private fb: FormBuilder,private cosmicService: CosmicService,

  ) {
    this.blogForm = this.fb.group({
      'title': ['', [Validators.required]],
      'content': ['', Validators.required],
    });
  }

  //to add new blog
  addNewBlog() {
    this.show = false;
    this.count = true;
  }
  toggleMenu()
  {
    this.menu = !this.menu;
  }
  //getting all blogs' data

  viewAllBlogs() {

    // this.count = false;
     this.show = true;
    // this.cosmicService.showAllBlogs().subscribe(res => {
    //     this.data = res;
    //     var jsondata = JSON.parse(this.data._body);
    //     this.allBlogs = jsondata.objects;
    //   })

    this.cosmicService.showAllBlogs().then((res: any) => {
      this.allBlogs = res;
      console.log("ressss======>",this.allBlogs);
    }).catch(err => {
      this.message = err.error.message[0].messages[0].message;
      console.log(err);

  });

  }
  //view Blogs of logged in user
  viewBlogs() {
    this.count = false;
    this.show = true;
    
    this.cosmicService.showBlogs()
    
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;

      })
  }
  //logging user out
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  submitForm() {
      
    const data = this.blogForm.value;
    
    // this.cosmicService.addBlog(data).subscribe(res => {
    //     console.log(res);
    //     this.message = "Blog added successfully";
    //   })
    const postData = {
      tittle:this.blogForm.value.title,
      description:this.blogForm.value.content
    }
    console.log("====================",postData);
    this.cosmicService.addBlog(postData).then((res: any) => {
      console.log("ressss======>",res);
      this.count = false;
      this.ngOnInit();
      // localStorage.setItem('user', res.user);
      // this.router.navigate(["dashboard"]);
    }).catch(err => {
      this.router.navigate(["dashboard"]);
      // this.message = err.error.message[0].messages[0].message;
      console.log(err);

  });
  }

  // hitId()
  // {
  //   this.cosmicService.hitId()
    
  //     .subscribe(res => {
  //       console.log(res);
        
  //     })
  // }

  ngOnInit() {
    this.viewAllBlogs();
  }

}
