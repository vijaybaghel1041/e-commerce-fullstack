import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  private cartService = inject(CartService);

  cart: any;
  loading = true;
  error = '';
  totalPrice = 0;
  userId: number | null = null;

  ngOnInit(): void {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? Number(userIdStr) : null;

    if (this.userId !== null && !isNaN(this.userId)) {
      this.fetchCart();
    } else {
      this.error = 'Invalid or missing user ID';
      this.loading = false;
    }
  }

  fetchCart(): void {
    if (this.userId === null) return;

    this.cartService.getCart(this.userId).subscribe({
      next: (res: any) => {
        this.cart = res;
        this.calculateTotal();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch cart';
        this.loading = false;
      }
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cart.items?.reduce((sum: number, item: any) => {
      return sum + item.product.specialPrice * item.quantity;
    }, 0) || 0;
  }

  updateQuantity(productId: number, action: 'add' | 'delete') {
    const mappedAction = action === 'add' ? 'inc' : 'dec';
    this.cartService.updateQuantity(productId, mappedAction).subscribe({
      next: () => this.fetchCart(),
      error: () => alert('Failed to update quantity.')
    });
  }

  removeFromCart(productId: number) {
    const cartId = this.cart.cartId;
    this.cartService.deleteFromCart(cartId, productId).subscribe({
      next: () => this.fetchCart(),
      error: (err: any) => {
        console.error('Error removing item:', err);
      }
    });
  }
}
