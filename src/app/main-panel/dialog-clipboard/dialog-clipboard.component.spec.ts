import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClipboardComponent } from './dialog-clipboard.component';

describe('DialogClipboardComponent', () => {
  let component: DialogClipboardComponent;
  let fixture: ComponentFixture<DialogClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClipboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
