import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarDias } from './adicionar-dias';

describe('AdicionarDias', () => {
  let component: AdicionarDias;
  let fixture: ComponentFixture<AdicionarDias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarDias],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarDias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
