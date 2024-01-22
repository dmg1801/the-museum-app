import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumPieceComponent } from './museum-piece.component';

describe('MuseumPieceComponent', () => {
  let component: MuseumPieceComponent;
  let fixture: ComponentFixture<MuseumPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuseumPieceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuseumPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
