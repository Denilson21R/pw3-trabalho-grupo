import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraReceitaComponent } from './cadastra-receita.component';

describe('CadastraReceitaComponent', () => {
  let component: CadastraReceitaComponent;
  let fixture: ComponentFixture<CadastraReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastraReceitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastraReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
