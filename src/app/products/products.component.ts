import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MockDataService } from '../shared/services/mock-data.service';
import { Product } from '../interfaces/product';
import { ToastService } from '../shared/modules/toastr.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  hasProduct = false;
  productArray = [];

  constructor(
    private mockDataService: MockDataService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.checkProduct();
  }

  getProducts() {
    this.mockDataService.getProducts()
      .subscribe(
        res => {
          this.products = res;
        }, (err: HttpErrorResponse) => {
          console.log('error getProducts', err);
        }
      );
  }

  addToCart(id) {
    this.products.find( (x: any) => {
      const items = JSON.parse(localStorage.getItem('products'));
      if (items) {
        const find_index = items.findIndex(item => item.id === id);
        if (find_index === -1 && x.id === id) {
          this.productArray.push({
            id: x.id,
            label: x.label,
            name: x.name,
            price: x.price
          });
          localStorage.setItem('products', JSON.stringify(this.productArray));
          this.toastService.showToast(
            'success',
            `Замовлення додано!`,
            3000);
          return x;
        }
      }
      if (!items) {
        this.productArray.push({
          id: x.id,  // id
          label: x.label,
          name: x.name,
          price: x.price
        });
        localStorage.setItem('products', JSON.stringify(this.productArray));
        this.toastService.showToast(
          'success',
          `Замовлення додано!`,
          3000);
        return x;
      }
    });
    this.checkProduct();
  }

  checkProduct() {
    if (localStorage.getItem('products')) {
      this.hasProduct = true;
    }
  }

}
