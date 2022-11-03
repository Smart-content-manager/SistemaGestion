import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectAddDialogComponent} from './select-add-dialog.component';

describe('SelectAddDialogComponent', () => {
  let component: SelectAddDialogComponent;
  let fixture: ComponentFixture<SelectAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAddDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
