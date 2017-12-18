import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCanvasComponent } from './movie-canvas.component';

describe('MovieCanvasComponent', () => {
  let component: MovieCanvasComponent;
  let fixture: ComponentFixture<MovieCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
