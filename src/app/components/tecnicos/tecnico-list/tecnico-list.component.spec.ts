import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoListComponent } from './tecnico-list.component';

describe('TecnicoListComponent', () => {
  let component: TecnicoListComponent;
  let fixture: ComponentFixture<TecnicoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoListComponent]
    });
    fixture = TestBed.createComponent(TecnicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
