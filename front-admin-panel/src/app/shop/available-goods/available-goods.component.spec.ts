import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableGoodsComponent } from './available-goods.component';

describe('AvailableGoodsComponent', () => {
  let component: AvailableGoodsComponent;
  let fixture: ComponentFixture<AvailableGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
