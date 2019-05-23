import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  products = [
    {
      'id': 1,
      'name': 'article 1',
      'label': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'price': 25
    },
    {
      'id': 2,
      'name': 'article 2',
      'label': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'price': 35
    },
    {
      'id': 3,
      'name': 'article 3',
      'label': 'Lorem ipsum dolor sit amet, 	consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 	labore et dolore magna aliqua.',
      'price': 45
    }];


  constructor() {
  }

  getProducts() {
    return of(this.products);
  }

}
