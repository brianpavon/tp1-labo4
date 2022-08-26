import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseUnoComponent } from './clase-uno.component';

describe('ClaseUnoComponent', () => {
  let component: ClaseUnoComponent;
  let fixture: ComponentFixture<ClaseUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
