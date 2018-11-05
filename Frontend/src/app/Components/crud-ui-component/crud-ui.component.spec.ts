import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDUIComponentComponent } from './crud-ui.component';

describe('CRUDUIComponentComponent', () => {
  let component: CRUDUIComponentComponent;
  let fixture: ComponentFixture<CRUDUIComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDUIComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDUIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
