import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAlunoComponent } from './inicio-aluno.component';

describe('InicioAlunoComponent', () => {
  let component: InicioAlunoComponent;
  let fixture: ComponentFixture<InicioAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
