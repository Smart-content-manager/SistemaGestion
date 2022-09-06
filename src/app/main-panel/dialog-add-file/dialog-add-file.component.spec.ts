import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFileComponent } from './dialog-add-file.component';

describe('DialogAddFileComponent', () => {
  let component: DialogAddFileComponent;
  let fixture: ComponentFixture<DialogAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
