import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app/app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


describe('Testing AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let link: DebugElement;
  let routerOutletTag: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent], //
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    link = fixture.debugElement.query(By.css('.nav > a'));
    routerOutletTag = fixture.debugElement.query(By.css('router-outlet'));

  });

  it('AC1- Checking presence of routerOutletTag', () => {
    expect(routerOutletTag).toBeTruthy();
  })
  it('AC2- routerOutletTag should be there', () => {
    expect(!routerOutletTag).toBeFalsy();
  })
  it('AC3- Cheking for proper positioning of routerOutlet', () => {
    let tag = fixture.nativeElement.querySelector('.container-fluid router-outlet');
    expect(tag).not.toBe(null);
  })

});
