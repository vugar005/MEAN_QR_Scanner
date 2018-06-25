import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToQrcodeComponent } from './link-to-qrcode.component';

describe('LinkToQrcodeComponent', () => {
  let component: LinkToQrcodeComponent;
  let fixture: ComponentFixture<LinkToQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
