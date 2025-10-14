import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService){};

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res:any) =>{
        this.authService.storeToken(res.token);
        this.toastService.showToast('Login successful!', 'success');
        this.router.navigate(['/']);
      },
      error: ()=>{
        this.toastService.showToast('Invalid credentials!', 'danger');
      },
      complete: ()=> {
        this.isSubmitting = false;
      }
    })
  }
}
