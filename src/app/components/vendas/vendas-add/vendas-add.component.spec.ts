import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasAddComponent } from './vendas-add.component';

describe('VendasAddComponent', () => {
  let component: VendasAddComponent;
  let fixture: ComponentFixture<VendasAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasAddComponent]
    });
    fixture = TestBed.createComponent(VendasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
