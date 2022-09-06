import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFolderComponent } from './dialog-add-folder.component';

describe('DialogAddFolderComponent', () => {
  let component: DialogAddFolderComponent;
  let fixture: ComponentFixture<DialogAddFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
