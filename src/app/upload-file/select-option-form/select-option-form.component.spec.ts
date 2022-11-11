import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectOptionFormComponent} from './select-option-form.component';

describe('SelectOptionFormComponent', () => {
  let component: SelectOptionFormComponent;
  let fixture: ComponentFixture<SelectOptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectOptionFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
