import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ToastService } from './shared/modules/toastr.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  toast: Subscription;
  lastRoute: string;
  lastPosition = 0;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.toastInit();
  }

  // After view init so NativeElement is available.
  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter(
          events =>
            events instanceof NavigationStart || events instanceof NavigationEnd
        )
      )
      .subscribe(events => {
        if (
          events instanceof NavigationStart &&
          events.url !== this.lastRoute
        ) {
          this.lastRoute = this.router.url;

          // if using window :
          this.lastPosition = window.pageYOffset;
          // Scroll to top because it's a new route.
          window.scrollTo(0, 0);
        }
        if (events instanceof NavigationEnd && events.url === this.lastRoute) {
          window.scrollTo(0, this.lastPosition);
        }
      });
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
