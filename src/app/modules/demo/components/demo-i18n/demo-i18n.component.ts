import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-i18n',
  templateUrl: './demo-i18n.component.html',
  styleUrls: ['./demo-i18n.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoI18nComponent {
  constructor(private fb: FormBuilder) {}

  genderEnum = {
    noGender: 0,
    male: 1,
    female: 2,
  };

  date = new Date('2020-05-04 05:36:51');
  currency = 1.255;
  decimal = 10.6;
  percent = 1.056;

  minutesControl = this.fb.control(null, Validators.required);
  genderControl = this.fb.control(this.genderEnum.noGender, Validators.required);

  textInCode = $localize`:Текст|Пример текста в коде@@(demo)textInCode:Текст в ts коде`;
}
