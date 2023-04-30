import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' +cartId+ '/items/' + productId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId as string;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key as string;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem (cartId, product.title);

    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      if (item){ 
        item$.update({ quantity : item.quantity +1 })
      } else {
        item$.set({ product: product, quantity: 1}); 
      }
    });
  }

  async removeFromCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem (cartId, product.title);

    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      if (item){ 
        item$.update({ quantity : item.quantity - 1 })
      } else {
        item$.set({ product: product, quantity: 0}); 
      }
    });
  }
}