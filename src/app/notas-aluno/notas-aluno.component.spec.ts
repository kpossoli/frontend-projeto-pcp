import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAlunoComponent } from './notas-aluno.component';

describe('NotasAlunoComponent', () => {
  let component: NotasAlunoComponent;
  let fixture: ComponentFixture<NotasAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
