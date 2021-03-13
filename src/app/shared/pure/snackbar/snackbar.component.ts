import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Snackbar } from '@shared/models/snackbar.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  @Input() snackbar!: Snackbar;
  @Input() closeSnackbarTimeout = 0;
  @Output() closeSnackbar = new EventEmitter<Snackbar>();

  ngOnInit() {
    if (this.closeSnackbarTimeout > 0) {
      setTimeout(() => {
        this.closeSnackbar.emit(this.snackbar);
      }, this.closeSnackbarTimeout);
    }
  }
}
