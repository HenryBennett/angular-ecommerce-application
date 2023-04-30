import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]>{
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val() as Product;
              //console.log(data);
              const id = c.payload.key;
              //console.log(id);
              return { id, ...data };
          })
      )
  );
  }

  get(productId:any){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId:any, product:any){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId:any){
    return this.db.object('/products/' + productId).remove();
  }
}
