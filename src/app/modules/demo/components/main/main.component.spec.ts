import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from 'src/app/modules/home/components/main/main.component';

@Component({
  template: `<app-main></app-main>`,
})
class TestWrapperComponent {
  @ViewChild('target', { static: true, read: MainComponent }) targetComponent!: MainComponent;
}

describe('Testing TimezoneInputComponent', () => {
  let fi: ComponentFixture<TestWrapperComponent>;
  let ci: TestWrapperComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestWrapperComponent, MainComponent],
        imports: [FormsModule, ReactiveFormsModule],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fi = TestBed.createComponent(TestWrapperComponent);
    ci = fi.componentInstance;
    fi.detectChanges();
  });

  test('should create', () => {
    expect(ci).toBeTruthy();
  });
});
