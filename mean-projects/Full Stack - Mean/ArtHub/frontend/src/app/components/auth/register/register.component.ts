import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService, private toastService: ToastService){};

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email, this.validEmailPattern()]],
      password:['',[Validators.required,Validators.minLength(6),this.strongPasswordValidator()]],
      confirmPassword: ['',[Validators.required]],
      role:['buyer',[Validators.required]],
    },{
      validator: this.passwordsMatchValidator
    });

    this.errorMessage="";
    this.successMessage="";
  }

  // Custom Password Validator
  strongPasswordValidator(){
    return(control:AbstractControl) => {
      const value = control.value;
      if(!value) return null;
      const strongPasswordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!#%*?&]{8,}$/;
      return strongPasswordRegex.test(value) ? null: {weakPassword: true};
    }
  }

  // Email Pattern Validator
  validEmailPattern() {
    return(control:AbstractControl) => {
      const value = control.value;
      if(!value) return null;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value) ? null: {invalidEmail: true};
    }
  }

  // Confirm Password Validator 
  passwordsMatchValidator(group:FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password===confirmPassword?null:{passwordsNotMatching:true};
  }

  // Submit Form
  register() {
    if(this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () =>{
        this.successMessage = "User registered successfully";
        this.toastService.showToast('User registered successfully', 'success');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || "Registration failed";
        this.toastService.showToast('Registeration failed. Please try again.', 'danger');
      }
    })
  }
}
