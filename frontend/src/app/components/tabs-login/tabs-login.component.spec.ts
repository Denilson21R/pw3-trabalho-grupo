import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsLoginComponent } from './tabs-login.component';

describe('TabsLoginComponent', () => {
  let component: TabsLoginComponent;
  let fixture: ComponentFixture<TabsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
