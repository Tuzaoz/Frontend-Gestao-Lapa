import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListComponent } from './clientes-list.component';

describe('ClientesListComponent', () => {
  let component: ClientesListComponent;
  let fixture: ComponentFixture<ClientesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesListComponent]
    });
    fixture = TestBed.createComponent(ClientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
