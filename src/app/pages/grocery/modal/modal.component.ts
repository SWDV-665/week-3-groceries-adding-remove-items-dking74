import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import Grocery from '@models/grocery';

@Component({
  selector: 'add-grocery-item-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class AddGroceryItemModal implements OnInit {
  @Input() currentGroceries: Grocery[];

  formErrors: Boolean;
  addGroceryForm: FormGroup;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.formErrors = false;
    this.addGroceryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), this.noCurrentGroceryValidator.bind(this)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.pattern(/^(\d{1,3}(\d*))(\.\d{1,2})?$/)])
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  submitNewGrocery() {
    if (this.addGroceryForm.valid) {
      const { name, quantity, price } = this.addGroceryForm.value;
      this.modalCtrl.dismiss(
        new Grocery(name, quantity, price)
      );
    } else {
      this.formErrors = true;
    }
  }

  private noCurrentGroceryValidator(control: AbstractControl): { [key: string]: boolean } {
    return this.currentGroceries
      .map(listItem => listItem.name.toLowerCase())
      .includes(control.value !== undefined && control.value.toLowerCase()) ? { 'uniqueGrocery': true } : null;
  }
}
