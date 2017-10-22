import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableGoodComponent } from './available-good.component';

describe('AvailableGoodComponent', () => {
  let component: AvailableGoodComponent;
  let fixture: ComponentFixture<AvailableGoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableGoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
