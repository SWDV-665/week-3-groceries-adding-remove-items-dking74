import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AddGroceryItemModal } from './modal/modal.component';
import Grocery from '@models/grocery';

enum ToastClass {
  ADD_ITEM,
  REMOVE_ITEM
}

@Component({
  selector: 'grocery-tab',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {
  groceries: Array<Grocery> = [];

  constructor(
      private modalController: ModalController,
      private toastController: ToastController,
      private storage: Storage
  ) {
    this.storage.get('groceries')
      .then(val => {
        if (val === null) {
          this.groceries = [
            new Grocery('Milk', 5, 3.50),
            new Grocery('Soap', 3, .50),
            new Grocery('Toilet Paper', 8, 5.30),
            new Grocery('Chicken', 2, 7.85),
            new Grocery('Frosted Flakes', 1, 4.10),
            new Grocery('Apple', 12, .35)
          ];
          this.saveGroceriesToStorage();
        } else {
          this.groceries = JSON.parse(val);
        }
      });
  }

  async addGroceryItem() {
    await this.modalController.create({
      component: AddGroceryItemModal,
      cssClass: 'add-grocery-modal',
      componentProps: {
        currentGroceries: this.groceries
      }
    }).then(async modal => {
      this.addGroceryItemFromModal(modal);

      await modal.present();
    });
  }

  deleteGroceryItem(groceryItem: Grocery) {
    this.groceries = this.groceries.filter(item => item.name != groceryItem.name);
    this.saveGroceriesToStorage();

    this.displayToastMessage(`Grocery item '${groceryItem.name}' was removed`, ToastClass.REMOVE_ITEM);
  }

  addQuantityToGroceryItem(grocery: Grocery) {
    this.groceries
      .filter(groceryItem => groceryItem.name === grocery.name)
      .map(item => item.quantity++);
    this.saveGroceriesToStorage();
  }

  dropQuantityToGroceryItem(grocery: Grocery) {
    this.groceries
      .filter(groceryItem => groceryItem.name === grocery.name)
      .map(item => item.quantity > 0 && item.quantity--);
    this.saveGroceriesToStorage();
  }

  private addGroceryItemFromModal(modal: HTMLIonModalElement) {
    modal.onDidDismiss()
      .then((groceryItem) => {
        if (
            groceryItem.data && this.groceries.filter(
              grocery => grocery.name === groceryItem.data.name
            ).length === 0
        ) {
          this.groceries.push(groceryItem.data);
          
          this.displayToastMessage(`Grocery item '${groceryItem.data.name}' was added`, ToastClass.ADD_ITEM);
        }
      });
    this.saveGroceriesToStorage();
  }

  private saveGroceriesToStorage() {
    this.storage.set('groceries', JSON.stringify(this.groceries));
  }

  private displayToastMessage(message: string, messageClass: ToastClass) {
    this.toastController.create({
      message,
      position: 'top',
      color: messageClass === ToastClass.ADD_ITEM ? 'success' : 'danger',
      duration: 3000
    }).then((ctrl) => ctrl.present());
  }
}
