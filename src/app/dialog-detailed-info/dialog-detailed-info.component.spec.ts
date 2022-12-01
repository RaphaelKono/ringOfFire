import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailedInfoComponent } from './dialog-detailed-info.component';

describe('DialogDetailedInfoComponent', () => {
  let component: DialogDetailedInfoComponent;
  let fixture: ComponentFixture<DialogDetailedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailedInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
