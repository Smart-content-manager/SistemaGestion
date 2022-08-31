import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateOrUploadComponent } from './dialog-create-or-upload.component';

describe('DialogCreateOrUploadComponent', () => {
  let component: DialogCreateOrUploadComponent;
  let fixture: ComponentFixture<DialogCreateOrUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateOrUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateOrUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
