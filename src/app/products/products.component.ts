import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { Subscription, switchMap } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string;
  cart: any;
  subscription!: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { 

    productService
      .getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category') as string;
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category && p.isActive === true) : 
          this.products.filter(p => p.isActive === true);
      });
  }

    async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => {
        return this.cart = cart;
      });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
