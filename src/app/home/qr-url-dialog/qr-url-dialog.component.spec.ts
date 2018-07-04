import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrUrlDialogComponent } from './qr-url-dialog.component';

describe('QrUrlDialogComponent', () => {
  let component: QrUrlDialogComponent;
  let fixture: ComponentFixture<QrUrlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrUrlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
