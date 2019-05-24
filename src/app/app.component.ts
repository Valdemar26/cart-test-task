import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ToastService } from './shared/modules/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  toast: Subscription;

  constructor(
    public toastr: ToastrService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.toastInit();
  }

  toastInit(): void {
    this.toast = this.toastService.toast$.subscribe((toast: any) => {
      if (toast.type === 'error') {
        this.showError(toast.msg, toast.timeOut);
      } else if (toast.type === 'success') {
        this.showSuccess(toast.msg);
      } else if (toast.type === 'warning') {
        this.showWarning(toast.msg);
      } else if (toast.type === 'info') {
        this.showInfo(toast.msg);
      }
    });
  }

  showSuccess(msg): void {
    this.toastr.success(msg, 'Success!');
  }

  showError(msg: string, timeOut: number = 3000): void {
    this.toastr.error(msg, 'Error!', {timeOut: timeOut});
  }

  showWarning(msg): void {
    this.toastr.warning(msg, 'Alert!');
  }

  showInfo(msg): void {
    this.toastr.info(msg, 'Info');
  }

  ngOnDestroy(): void {
    this.toast.unsubscribe();
  }
}
