import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeToLinkComponent } from './qrcode-to-link.component';

describe('QrcodeToLinkComponent', () => {
  let component: QrcodeToLinkComponent;
  let fixture: ComponentFixture<QrcodeToLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeToLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeToLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
