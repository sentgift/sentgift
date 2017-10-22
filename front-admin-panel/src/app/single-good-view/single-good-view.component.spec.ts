import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGoodViewComponent } from './single-good-view.component';

describe('SingleGoodViewComponent', () => {
  let component: SingleGoodViewComponent;
  let fixture: ComponentFixture<SingleGoodViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGoodViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGoodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
