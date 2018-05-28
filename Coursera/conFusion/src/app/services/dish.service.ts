import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Dish } from '../shared/Dish';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    // return this.http.get(baseURL + 'dishes')
    //   .map(res => this.processHTTPMsgService.extractData(res))
    //   .catch(error => this.processHTTPMsgService.handleError(error));
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    // return this.http.get(baseURL + 'dishes/' + id)
    //   .map(res => this.processHTTPMsgService.extractData(res))
    //   .catch(error => this.processHTTPMsgService.handleError(error));
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    // return this.http.get(baseURL + 'dishes?featured=true')
    //   .map(res => this.processHTTPMsgService.extractData(res)[0])
    //   .catch(error => this.processHTTPMsgService.handleError(error));
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id));
      //.catch(error => error;
  }

}
