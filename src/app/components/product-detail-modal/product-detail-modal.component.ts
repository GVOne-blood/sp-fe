import { Component, Input, Output, EventEmitter, signal, computed, effect, OnDestroy, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';

interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
}

interface CustomizationGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelection: number;
  options: CustomizationOption[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sold: number;
  likes: number;
  rating?: number;
  isSoldOut: boolean;
  categoryId: number;
  description?: string;
  customizationGroups?: CustomizationGroup[];
}

interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
  selectedOptions?: Map<string, string>;
}

@Component({
  selector: 'app-product-detail-modal',
  imports: [CommonModule, FormsModule, StarRatingComponent],
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.css'
})
export class ProductDetailModalComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() product: Product | null = null;
  @Input() isOpen: boolean = false;
  @Input() editingCartItem: {item: CartItem, index: number} | null = null;
  @Output() addToCart = new EventEmitter<CartItem>();
  @Output() updateCart = new EventEmitter<{index: number, cartItem: CartItem}>();
  @Output() close = new EventEmitter<void>();
  
  @ViewChild('modalContent') modalContent?: ElementRef;

  selectedOptions = signal<Map<string, string>>(new Map());
  quantity = signal<number>(1);
  customerNote = signal<string>('');
  isAddingToCart = signal<boolean>(false);
  isClosing = signal<boolean>(false);
  validationErrors = signal<Map<string, string>>(new Map());
  isEditMode = signal<boolean>(false);
  editingCartItemIndex = signal<number | null>(null);
  
  private readonly FALLBACK_PRODUCT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
  private addToCartTimeout?: ReturnType<typeof setTimeout>;
  private previouslyFocusedElement?: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private keydownListener?: (e: KeyboardEvent) => void;

  totalPrice = computed(() => {
    if (!this.product) return 0;
    
    const basePrice = this.product.price;
    let optionsTotal = 0;
    
    if (this.product.customizationGroups) {
      this.selectedOptions().forEach((optionId, groupId) => {
        const group = this.product!.customizationGroups!.find(g => g.id === groupId);
        if (group) {
          const option = group.options.find(o => o.id === optionId);
          if (option) {
            optionsTotal += option.priceModifier;
          }
        }
      });
    }
    
    return (basePrice + optionsTotal) * this.quantity();
  });

  /**
   * Angular lifecycle hook - called after view initialization
   */
  ngAfterViewInit(): void {
    // Setup will happen when modal opens
  }

  /**
   * Angular lifecycle hook - called when input properties change
   * Ensures modal data is reset whenever the product input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Reset modal data whenever the product input changes
    if (changes['product']) {
      const currentProduct = changes['product'].currentValue;
      const previousProduct = changes['product'].previousValue;
      
      // Reset if we have a new product (different from previous)
      if (currentProduct && currentProduct !== previousProduct) {
        this.resetModalData();
      }
    }
    
    // Handle edit mode when editingCartItem changes
    if (changes['editingCartItem']) {
      const editingItem = changes['editingCartItem'].currentValue;
      if (editingItem) {
        this.openForEdit(editingItem.item, editingItem.index);
      } else {
        this.isEditMode.set(false);
        this.editingCartItemIndex.set(null);
      }
    }
    
    // Setup focus trap when modal opens
    if (changes['isOpen']) {
      if (changes['isOpen'].currentValue) {
        setTimeout(() => this.setupFocusTrap(), 100);
      } else {
        this.teardownFocusTrap();
      }
    }
  }

  /**
   * Reset all modal data to default values
   * Called when product changes to ensure clean state
   */
  private resetModalData(): void {
    // Reset quantity to 1
    this.quantity.set(1);
    
    // Clear customer note
    this.customerNote.set('');
    
    // Clear validation errors
    this.validationErrors.set(new Map());
    
    // Reset selectedOptions to defaults (required groups only)
    const newSelections = new Map<string, string>();
    if (this.product?.customizationGroups) {
      this.product.customizationGroups.forEach(group => {
        if (group.required && group.options.length > 0) {
          newSelections.set(group.id, group.options[0].id);
        }
      });
    }
    this.selectedOptions.set(newSelections);
  }

  onOverlayClick() {
    this.closeModal();
  }

  closeModal() {
    // Trigger closing animation
    this.isClosing.set(true);
    
    // Teardown focus trap
    this.teardownFocusTrap();
    
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      this.isClosing.set(false);
      this.close.emit();
      
      // Restore focus to previously focused element
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = undefined;
      }
    }, 300); // Match animation duration
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  selectOption(groupId: string, optionId: string) {
    this.selectedOptions.update(options => {
      const newOptions = new Map(options);
      newOptions.set(groupId, optionId);
      return newOptions;
    });
    
    // Clear validation error for this group when an option is selected
    this.validationErrors.update(errors => {
      const newErrors = new Map(errors);
      newErrors.delete(groupId);
      return newErrors;
    });
  }

  isOptionSelected(groupId: string, optionId: string): boolean {
    return this.selectedOptions().get(groupId) === optionId;
  }
  
  // Validate that all required customization options are selected
  private validateSelections(): boolean {
    if (!this.product || !this.product.customizationGroups) return true;
    
    const errors = new Map<string, string>();
    
    for (const group of this.product.customizationGroups) {
      if (group.required) {
        const selectedOption = this.selectedOptions().get(group.id);
        if (!selectedOption) {
          errors.set(group.id, 'Vui lòng chọn một tùy chọn');
        }
      }
    }
    
    this.validationErrors.set(errors);
    return errors.size === 0;
  }
  
  // Check if there are any validation errors for a specific group
  getValidationError(groupId: string): string | undefined {
    return this.validationErrors().get(groupId);
  }

  onAddToCart() {
    if (!this.product || this.isAddingToCart()) return;
    
    // Validate selections before proceeding
    if (!this.validateSelections()) {
      return; // Show validation errors, don't proceed
    }
    
    this.isAddingToCart.set(true);

    const cartItem: CartItem = {
      product: this.product,
      quantity: this.quantity(),
      note: this.customerNote() || undefined,
      selectedOptions: new Map(this.selectedOptions())
    };

    // Debounce to prevent rapid clicks - emit after 500ms
    this.addToCartTimeout = setTimeout(() => {
      if (this.isEditMode()) {
        // Update existing cart item
        this.updateCart.emit({
          index: this.editingCartItemIndex()!,
          cartItem: cartItem
        });
      } else {
        // Add new cart item
        this.addToCart.emit(cartItem);
      }
      this.isAddingToCart.set(false);
      this.addToCartTimeout = undefined;
      this.closeModal();
    }, 500);
  }
  
  // Open modal for editing existing cart item
  openForEdit(cartItem: CartItem, index: number): void {
    this.isEditMode.set(true);
    this.editingCartItemIndex.set(index);
    this.quantity.set(cartItem.quantity);
    this.customerNote.set(cartItem.note || '');
    
    // Pre-select options from cart item
    if (cartItem.selectedOptions) {
      this.selectedOptions.set(new Map(cartItem.selectedOptions));
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN');
  }

  // Categorize customization groups into small (2-column) and large (full-width)
  getSmallGroups(): CustomizationGroup[] {
    if (!this.product?.customizationGroups) return [];
    
    // Small groups: size, temperature, ice level, sugar level (typically 2-4 options)
    const smallGroupNames = ['size', 'kích thước', 'temperature', 'nhiệt độ', 'ice', 'đá', 'sugar', 'đường'];
    
    return this.product.customizationGroups.filter(group => {
      const groupNameLower = group.name.toLowerCase();
      const hasSmallName = smallGroupNames.some(name => groupNameLower.includes(name));
      const hasFewerOptions = group.options.length <= 4;
      return hasSmallName || hasFewerOptions;
    });
  }

  getLargeGroups(): CustomizationGroup[] {
    if (!this.product?.customizationGroups) return [];
    
    const smallGroups = this.getSmallGroups();
    const smallGroupIds = new Set(smallGroups.map(g => g.id));
    
    return this.product.customizationGroups.filter(group => !smallGroupIds.has(group.id));
  }

  // TrackBy functions for performance optimization
  trackByGroup(index: number, group: CustomizationGroup): string {
    return group.id;
  }

  trackByOption(index: number, option: CustomizationOption): string {
    return option.id;
  }
  
  // Error handling for images
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    // Prevent infinite loop by checking if already on fallback
    if (!img.src.startsWith('data:image/svg+xml')) {
      img.src = this.FALLBACK_PRODUCT_IMAGE;
    }
  }
  
  ngOnDestroy() {
    // Clean up timeout on component destroy
    if (this.addToCartTimeout) {
      clearTimeout(this.addToCartTimeout);
    }
    
    // Clean up focus trap
    this.teardownFocusTrap();
  }
  
  /**
   * Setup focus trap to keep focus within modal
   */
  private setupFocusTrap(): void {
    // Store currently focused element to restore later
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    
    // Get all focusable elements within modal
    const modalElement = document.querySelector('[role="dialog"]');
    if (!modalElement) return;
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    this.focusableElements = Array.from(
      modalElement.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
    
    // Focus first focusable element (close button)
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
    
    // Add keyboard event listener
    this.keydownListener = (e: KeyboardEvent) => this.handleKeyDown(e);
    document.addEventListener('keydown', this.keydownListener);
  }
  
  /**
   * Teardown focus trap
   */
  private teardownFocusTrap(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = undefined;
    }
    this.focusableElements = [];
  }
  
  /**
   * Handle keyboard navigation within modal
   */
  private handleKeyDown(e: KeyboardEvent): void {
    // Close modal on Escape key
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closeModal();
      return;
    }
    
    // Handle Tab key for focus trap
    if (e.key === 'Tab') {
      if (this.focusableElements.length === 0) return;
      
      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];
      
      if (e.shiftKey) {
        // Shift + Tab: move focus backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move focus forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
}
