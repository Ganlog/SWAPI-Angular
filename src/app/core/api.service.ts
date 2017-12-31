import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class APIService {
  private apiURL = 'https://swapi.co/api/';
  private nextNamesURL = '';

  constructor(private http: HttpClient) { }

  prearrangeItemsData(ItemsList){
    ItemsList.map(item => {
      let splittedURL = item.url.split("/");
      item.id = splittedURL[splittedURL.length-2];
      if(!item.name){
        item.name = item.title;
        delete item.title;
      }
    });
    return ItemsList;
  }

  getCategories(){
    return this.http.get(this.apiURL).map(response => {
      return Object.keys(response);
    });
  }

  getListOfNamesFromCategory(category){
    return this.http.get(this.apiURL + category).map(res => {
      this.nextNamesURL = res['next'];
      let response = {
        list: this.prearrangeItemsData(res['results']),
        nextExists: (res['next']) ? true : false,
      };
      return response;
    });
  }

  loadMoreNames(){
    return this.http.get(this.nextNamesURL).map(res => {
      this.nextNamesURL = res['next'];
      let response = {
        list: this.prearrangeItemsData(res['results']),
        nextExists: (res['next']) ? true : false,
      };
      return response;
    });
  }

  getDetailedInfo(category,id){
    return this.http.get(this.apiURL + category + "/" + id).map(res => {
      console.log(this.apiURL + category + "/" + id);
      console.log(res);
      // this.nextNamesURL = res['next'];
      // let response = {
      //   list: this.prearrangeItemsData(res['results']),
      //   nextExists: (res['next']) ? true : false,
      // };
      // return response;
    });
  }
}
