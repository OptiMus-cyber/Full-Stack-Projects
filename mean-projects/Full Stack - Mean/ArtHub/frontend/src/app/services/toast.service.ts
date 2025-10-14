import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

interface ToastMessage {
  title:string;
  message:string;
  type: 'success'|'danger'|'warning'|'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage|null>(null);
  toast$ = this.toastSubject.asObservable();
  constructor(private snackBar: MatSnackBar) { }

  showToast(message: string, type:'success'|'danger'|'warning'|'info'='success'){
    this.toastSubject.next({title:"Notification", message, type});

    setTimeout(()=> {
      this.toastSubject.next(null);
    }, 2000);
  }
  // showToast(message: string, type:'success'|'error'|'warning'='success'){
  //   this.snackBar.open(message, 'X', {
  //     duration: 2000,
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: [`${type}-snackbar`, 'mat-snack-bar-container']
  //   });
  // }
}
