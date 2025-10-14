import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWorkHistoryComponent } from './custom-work-history.component';

describe('CustomWorkHistoryComponent', () => {
  let component: CustomWorkHistoryComponent;
  let fixture: ComponentFixture<CustomWorkHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomWorkHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
