import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CosmicService } from '../../services/cosmic.service'

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  author;
  jdata;
  message;
  constructor(private _http: Http, private route: Router, private cosmicService: CosmicService) { }
  
  //fetching all blogs from server
  showAllBlogs() {
  //   this.cosmicService.showAllBlogs()
  //  .subscribe(res => {
  //       this.data = res;
  //       var jsondata = JSON.parse(this.data._body);
  //       this.allBlogs = jsondata.objects;
  //       console.log(this.allBlogs);
  //     })

  this.cosmicService.showAllBlogs().then((res: any) => {
    console.log("resssswwwwwwwwwwwww======>",res);
    this.allBlogs = res;
  }).catch(err => {
    this.message = err.error.message[0].messages[0].message;
    console.log(err);

});
  }

  loginCall() {
    this.route.navigate(['login']);
  }

  ngOnInit() {

    this.showAllBlogs()
  }

}
