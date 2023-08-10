import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosComponent } from './nos.component';

describe('NosComponent', () => {
  let component: NosComponent;
  let fixture: ComponentFixture<NosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosComponent]
    });
    fixture = TestBed.createComponent(NosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
