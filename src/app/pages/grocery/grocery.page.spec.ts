import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroceryPage } from './grocery.page';

describe('GroceryPage', () => {
  let component: GroceryPage;
  let fixture: ComponentFixture<GroceryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroceryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
