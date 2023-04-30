import { Product } from './../models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: any;
  shoppingCartService!: ShoppingCartService;


  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0; // 0 is the Response in Browserterminal
    } else {
      let item = this.shoppingCart.items[this.product.title];
      return item ? item.quantity : 0;
    }
  }
}