import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDragDropComponent } from './panel-drag-drop.component';

describe('PanelDragDropComponent', () => {
  let component: PanelDragDropComponent;
  let fixture: ComponentFixture<PanelDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDragDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
