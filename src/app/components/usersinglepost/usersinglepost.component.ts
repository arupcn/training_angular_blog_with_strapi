
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { CosmicService } from '../../services/cosmic.service'


@Component({
  selector: 'app-usersinglepost',
  templateUrl: './usersinglepost.component.html',
  styleUrls: ['./usersinglepost.component.css']
})
export class UsersinglepostComponent implements OnInit {
  data;
  allPosts;
  singlePost: any;
  constructor(private router: ActivatedRoute, private route: Router, private _http: Http, private cosmicService: CosmicService) { }

  ngOnInit() {

    this.data = this.router.snapshot.queryParamMap;
    this.post();
  } 

  /**  to show single post */
  post() {
    var data = this.data.params.post_id;
      // this.cosmicService.singlePostHome().subscribe(res => {
      //   this.data = res;
      //   var jsondata = JSON.parse(this.data._body);
      //   this.allPosts = jsondata.objects;
      //   this.singlePost = this.allPosts.filter(
      //     post => post._id === data);
      //   var da = this.singlePost[0];
      //   console.log(da)
      // })

      this.cosmicService.singlePostHome(data).then((res: any) => {
        this.singlePost = res;
        console.log("singlePost======>",this.singlePost);
      }).catch(err => {
        // this.message = err.error.message[0].messages[0].message;
        console.log(err);
  
    });
  }

  dashboardCall()
  {
    this.route.navigate(['dashboard'])
  }


}
