import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultidialogComponent } from './multidialog.component';

describe('MultidialogComponent', () => {
  let component: MultidialogComponent;
  let fixture: ComponentFixture<MultidialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultidialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultidialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
