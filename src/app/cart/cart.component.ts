import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ToastService } from '../shared/modules/toastr.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  total: number;

  constructor(
    private router: Router,
    private toastService: ToastService,
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
    this.toastService.showToast(
      'info',
      `Product Cart cleared!`,
      3000);
    localStorage.clear();
    this.navigateToProducts();
  }

  showProducts() {
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
      this.getTotal();
    }
  }

  getTotal() {
    this.total = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.total += this.products[i].price;
    }
    return this.total;
  }

  deleteProduct(id) {
    this.products = JSON.parse(localStorage.getItem('products'));
    const removedItem = this.products.findIndex( item => item.id === id);
    this.products.splice(removedItem, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.toastService.showToast(
      'warning',
      `Product deleted from Cart!`,
      3000);
    this.getTotal();
  }

}
