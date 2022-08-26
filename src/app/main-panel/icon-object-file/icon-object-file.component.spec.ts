import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconObjectFileComponent } from './icon-object-file.component';

describe('IconObjectFileComponent', () => {
  let component: IconObjectFileComponent;
  let fixture: ComponentFixture<IconObjectFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconObjectFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconObjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
