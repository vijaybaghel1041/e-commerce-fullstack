import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  cartCount = signal(0);
  orderCountValue: number = 0;
  // username = signal(localStorage.getItem('username') || '');
  username = computed(() => localStorage.getItem('username') || '');

  searchQuery = ''; // track input

  ngOnInit(): void {
    this.orderCount();
    this.loadCartCount();

    // 🧠 Update whenever cart changes
    // If you want to update cart count when cart changes, subscribe to a cartChanged observable (you need to implement this in CartService if not present)
    // Only subscribe if cartChanged observable exists on cartService
    if ('cartChanged' in this.cartService && this.cartService.cartChanged && typeof (this.cartService as any).cartChanged.subscribe === 'function') {
      (this.cartService as any).cartChanged.subscribe(() => {
        this.loadCartCount();
      });
    }
  }

  // onSearch(e: Event) {
  //   e.preventDefault(); // prevent page reload
  //   if (this.searchQuery.trim()) {
  //     this.router.navigate(['/products'], { queryParams: { search: this.searchQuery.trim() } });
  //   }
  // }
  onSearch(e: Event) {
    e.preventDefault();

    const trimmed = this.searchQuery.trim();

    if (trimmed) {
      this.router.navigate(['/products'], {
        queryParams: { search: trimmed }
      });
    } else {
      // 👇 Navigate without query param to trigger all products
      this.router.navigate(['/products']);
    }
  }

  get userId(): number | null {
    const userIdStr = localStorage.getItem('userId');
    return userIdStr ? Number(userIdStr) : null;
  }

  loadCartCount() {
    if (this.username() && this.userId !== null && !isNaN(this.userId)) {
      this.cartService.getCart(this.userId).subscribe({
        next: (res: any) => {
          this.cartCount.set(res.products.length || 0);
        },
        error: (err) => {
          console.error('Error loading cart:', err);
          this.cartCount.set(0)
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  viewProfile() {
    console.log('View profile clicked');
    const stored = localStorage.getItem('roles');
    this.router.navigate(['/profile']); // Create profile component later
  }

  login() {
    alert('Login to your account');
    this.router.navigate(['/login']);
  }

  orderCount() {
    const userIdStr = localStorage.getItem('userId');
    const userId = userIdStr ? Number(userIdStr) : null;
    if (userId !== null && !isNaN(userId)) {
      this.orderService.getOrders(userId).subscribe({
        next: (res: any[]) => {
          this.orderCountValue = res.length;
        },
        error: (err: any) => {
          console.error('Failed to fetch orders:', err);
        }
      });
    } else {
      console.error('No valid userId found in localStorage.');
      this.orderCountValue = 0;
    }
  }

  hasAdminOrSellerRole(): boolean {
    const stored = localStorage.getItem('roles');
    const roles: string[] = stored ? JSON.parse(stored) : [];
  
    return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SELLER');
  }

}
