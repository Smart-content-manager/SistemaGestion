import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFileOptionsComponent } from './menu-file-options.component';

describe('MenuFileOptionsComponent', () => {
  let component: MenuFileOptionsComponent;
  let fixture: ComponentFixture<MenuFileOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFileOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
