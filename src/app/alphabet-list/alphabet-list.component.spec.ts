import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetListComponent } from './alphabet-list.component';

describe('AlphabetListComponent', () => {
  let component: AlphabetListComponent;
  let fixture: ComponentFixture<AlphabetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
