import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {config} from '../../config/cosmo.config'
import {blogModel} from '../models/cosmic.model';
import {registerModel} from '../models/cosmic.model';
import { DispatcherService } from "src/app/servicesDispatcher/dispatcher.service";
import { environment } from "src/environments/environment";


@Injectable()

export class CosmicService {
    data;
    message;
    URL = config.URL;
    bucket_slug = config.bucket_slug;
    baseUserUrl: string;
    constructor(private _http: Http,  private router: Router,private dispatcher: DispatcherService)
    {this.baseUserUrl =environment.baseUserUrl;}

    /**  getting details of user */
    getUser(registerModel: registerModel) {     
       return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {
       params: {
            metafield_key: 'username',
            metafield_value: registerModel.username,
            limit: 1,
            read_key: config.read_key
          }
        })
          .map(res => {
            return res;
          })
      }

      /**  register new user */
addUser(params)
      {
    return new Promise((resolve, reject) => {
      this.dispatcher.post(this.baseUserUrl + "auth/local/register", params)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
      }
      /**  add blog to backend */
      addBlog(data)
      {
        return new Promise((resolve, reject) => {
          const headers = {
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
          this.dispatcher.post(this.baseUserUrl + "posts", data,headers).subscribe(
            (res: any) => {
              resolve(res);
            },
            err => {
              reject(err);
            }
          );
        }); 


}

//showing all blogs

showAllBlogs()
{
  return new Promise((resolve, reject) => {
    this.dispatcher.get(this.baseUserUrl + "posts", '')
      .subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
  });
}

 //show blogs of logged in user
showBlogs()
{
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;
   return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/search", {

      params: {

        metafield_key: 'author',
        metafield_value: userName,
        read_key: config.read_key,
      }
    })
}

/**  showing single post on dashboard */
showSinglePostDashboard()
{
   return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/", {
      params: {

        read_key: config.read_key,
      }
    })
    .map(res => {
        return res;
      })
}

/**  showing single post on home page */
singlePostHome(data)
{
  return new Promise((resolve, reject) => {
    this.dispatcher.get(this.baseUserUrl + "posts", {id:data})
      .subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
  });
}

/**  loggin user in */
login(params)
{
  return new Promise((resolve, reject) => {
    this.dispatcher.post(this.baseUserUrl + "auth/local", params).subscribe(
      (res: any) => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
}

// saveComment(commentModel: commentModel )
// {
//   return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
//     title: commentModel.name, content: commentModel.comment, slug: commentModel.name, type_slug: 'comments', write_key: config.write_key,
//     metafields: [
//       {
//         key: "name",
//         type: "text",
//         value: commentModel.name
//       },
//       {
//         key: "slug",
//         type: "text",
//         value: commentModel.slug
//       },
//     ]
//   })
//   .map(res => {
//     return res;
//   })
  
// }
}
