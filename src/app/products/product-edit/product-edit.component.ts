import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-edit',
  styleUrls: ['./product-edit.component.css'],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  public pageTitle = 'Product Edit';
  public errorMessage = '';
  public productForm: FormGroup;

  public product: IProduct | null;
  public sub: Subscription;

  // Use with the generic validation message class
  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private productService: ProductService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productCode: {
        required: 'Product code is required.',
      },
      productName: {
        maxlength: 'Product name cannot exceed 50 characters.',
        minlength: 'Product name must be at least three characters.',
        required: 'Product name is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      description: '',
      productCode: [ '', Validators.required ],
      productName: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ] ],
      starRating: [ '', NumberValidators.range(1, 5) ],
    });

    // Watch for changes to the currently selected product
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => this.displayProduct(selectedProduct),
    );

    // Watch for value changes
    this.productForm.valueChanges.subscribe(
      (value) => this.displayMessage = this.genericValidator.processMessages(this.productForm),
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  public blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  public displayProduct(product: IProduct | null): void {
    // Set the local product property
    this.product = product;

    if (this.product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
      this.productForm.patchValue({
        description: this.product.description,
        productCode: this.product.productCode,
        productName: this.product.productName,
        starRating: this.product.starRating,
      });
    }
  }

  public cancelEdit(): void {
    this.displayProduct(this.product);
  }

  public deleteProduct(): void {
    if (this.product && this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe(
          () => this.productService.changeSelectedProduct(null),
          (err) => this.errorMessage = err.error,
        );
      }
    } else {
      this.productService.changeSelectedProduct(null);
    }
  }

  public saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p).subscribe(
            (product) => this.productService.changeSelectedProduct(product),
            (err) => this.errorMessage = err.error,
          );
        } else {
          this.productService.updateProduct(p).subscribe(
            (product) => this.productService.changeSelectedProduct(product),
            (err) => this.errorMessage = err.error,
          );
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
