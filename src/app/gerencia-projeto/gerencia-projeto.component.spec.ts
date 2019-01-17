import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaProjetoComponent } from './gerencia-projeto.component';

describe('GerenciaProjetoComponent', () => {
  let component: GerenciaProjetoComponent;
  let fixture: ComponentFixture<GerenciaProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
