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

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    const userId = 1; // Replace with actual logic to get user ID
    this.cartService.getCart(userId).subscribe({
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
    this.totalPrice = this.cart?.items?.reduce((sum: number, item: any) => {
      return sum + item.product.specialPrice * item.quantity;
    }, 0) || 0;
  }

  removeFromCart(productId: number): void {
    const userId = 1; // Replace with actual user ID logic
    this.cartService.removeFromCart(userId, productId).subscribe({
      next: () => this.fetchCart(),
      error: (err) => console.error('Error removing item:', err)
    });
  }

  /**
   * Updates the quantity of a cart item.
   * @param productId - ID of the product
   * @param action - 'add' to increase or 'delete' to decrease
   */
  updateQuantity(productId: number, action: 'add' | 'delete'): void {
    const userId = 1; // Replace with dynamic user logic
    this.cartService.updateCartQuantity(userId, productId, action).subscribe({
      next: () => this.fetchCart(),
      error: (err) => console.error(`Error updating quantity:`, err)
    });
  }
}
