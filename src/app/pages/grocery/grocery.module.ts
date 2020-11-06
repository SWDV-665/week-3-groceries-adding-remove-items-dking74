import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroceryPage } from './grocery.page';
import { AddGroceryItemModal } from './modal/modal.component';

import { GroceryPageRoutingModule } from './grocery-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroceryPageRoutingModule
  ],
  declarations: [
    GroceryPage,
    AddGroceryItemModal
  ]
})
export class GroceryPageModule {}
