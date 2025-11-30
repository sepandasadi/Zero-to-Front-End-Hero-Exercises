import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <!-- TODO: Add image -->
      <!-- TODO: Add product name -->
      <!-- TODO: Add price -->
      <!-- TODO: Add description -->

      <!-- TODO: Add quantity selector -->

      <!-- TODO: Display total -->

      <!-- TODO: Add to cart button -->
    </div>
  `,
  styles: [`
    /* Add your styles here */
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  // TODO: Add quantity property

  // TODO: Add getter for total

  // TODO: Add increment method

  // TODO: Add decrement method

  // TODO: Add addToCart method
}

