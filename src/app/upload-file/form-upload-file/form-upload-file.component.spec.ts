import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormUploadFileComponent} from './form-upload-file.component';

describe('FormUploadFileComponent', () => {
  let component: FormUploadFileComponent;
  let fixture: ComponentFixture<FormUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUploadFileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
