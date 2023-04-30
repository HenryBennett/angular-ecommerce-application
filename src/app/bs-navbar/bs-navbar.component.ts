import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser | undefined;
  shoppingCartItemCount!: number;

  constructor(private auth : AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser: any) => this.appUser = appUser);
    /*let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });*/
    // Watch episode 9 - displaying the number of shopping cart items to figure out
  }

  logout(){
    this.auth.logout();
  }

}
