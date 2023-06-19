import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaUpdateComponent } from './conta-update.component';

describe('ContaUpdateComponent', () => {
  let component: ContaUpdateComponent;
  let fixture: ComponentFixture<ContaUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaUpdateComponent]
    });
    fixture = TestBed.createComponent(ContaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
