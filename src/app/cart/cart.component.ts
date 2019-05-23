import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  total = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.showProducts();
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  back() {
    this.navigateToProducts();
  }

  clearShoppingCart() {
    localStorage.clear();
    this.navigateToProducts();
  }

  showProducts() {
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
      for(let i = 0; i < this.products.length; i++) {
        this.total += this.products[i].price;
      }
      return this.total;
    }
  }

}
