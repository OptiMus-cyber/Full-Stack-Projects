import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWorkComponent } from './custom-work.component';

describe('CustomWorkComponent', () => {
  let component: CustomWorkComponent;
  let fixture: ComponentFixture<CustomWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
