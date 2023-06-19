import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaAddComponent } from './conta-add.component';

describe('ContaAddComponent', () => {
  let component: ContaAddComponent;
  let fixture: ComponentFixture<ContaAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaAddComponent]
    });
    fixture = TestBed.createComponent(ContaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
