import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasListComponent } from './vendas-list.component';

describe('VendasListComponent', () => {
  let component: VendasListComponent;
  let fixture: ComponentFixture<VendasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasListComponent]
    });
    fixture = TestBed.createComponent(VendasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
