import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class APIService {
  public apiURL = 'https://swapi.co/api/';
  private nextNamesURL = '';

  constructor(private http: HttpClient) { }

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

  prearrangeItemsData(itemsList){
    let properItemData = [];
    itemsList.map(item => {
      let splittedURL = item.url.split("/");
      item.id = splittedURL[splittedURL.length-2];
      if(!item.name)
        item.name = item.title;
      properItemData.push({['id']: item.id, ['name']: item.name});
    });
    return properItemData;
  }

  getDetailedInfo(category,id){
    return this.http.get(this.apiURL + category + "/" + id).map(res => {
      return this.prearrangeItemData(res);
    });
  }

  prearrangeItemData(itemData){
    let properItemData = {
      name: '',
      info: [],
      linksInCategories: [],
    };

    if(!itemData.name)
      itemData.name = itemData.title;
    properItemData.name = itemData.name;

    for (let dataLabel in itemData) {
      if(dataLabel != 'name' && dataLabel != 'title' && dataLabel != 'url')
        if(typeof itemData[dataLabel] == 'object')
          properItemData.linksInCategories[this.makePrettierKey(dataLabel)] = this.properLinks(itemData[dataLabel]);
        else
          properItemData.info[this.makePrettierKey(dataLabel)] = this.properData(itemData[dataLabel]);
    }
    return properItemData;
  }

  properLinks(linksList){
    for(let link in linksList)
      linksList[link] = linksList[link].replace('https://swapi.co/api/','/');
    return linksList;
  }
  properData(data){
    if(typeof data == 'string')
      return data.replace('https://swapi.co/api/','/')
    else
      return data;
  }
  makePrettierKey(key){
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

}
