import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInputNameItemComponent } from './dialog-input-name-item.component';

describe('DialogAddFolderComponent', () => {
  let component: DialogInputNameItemComponent;
  let fixture: ComponentFixture<DialogInputNameItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInputNameItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInputNameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
