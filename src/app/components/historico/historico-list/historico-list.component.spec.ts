import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoListComponent } from './historico-list.component';

describe('HistoricoListComponent', () => {
  let component: HistoricoListComponent;
  let fixture: ComponentFixture<HistoricoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoListComponent]
    });
    fixture = TestBed.createComponent(HistoricoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
