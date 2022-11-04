import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDropFileComponent} from './dialog-drop-file.component';

describe('DialogDropFileComponent', () => {
  let component: DialogDropFileComponent;
  let fixture: ComponentFixture<DialogDropFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDropFileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDropFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
