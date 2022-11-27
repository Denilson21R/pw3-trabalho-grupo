import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarIngredienteComponent } from './salvar-ingrediente.component';

describe('SalvarIngredienteComponent', () => {
  let component: SalvarIngredienteComponent;
  let fixture: ComponentFixture<SalvarIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalvarIngredienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalvarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
