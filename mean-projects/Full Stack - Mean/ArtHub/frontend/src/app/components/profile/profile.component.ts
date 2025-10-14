import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    previewImage: string | ArrayBuffer | null | undefined = null;
    userRole: string | null= '';

    constructor(private fb: FormBuilder, private profileService: ProfileService,  private toastService: ToastService, private authService: AuthService) {};

    ngOnInit(): void {
      this.profileForm = this.fb.group({
        name:['',[Validators.required, Validators.minLength(3)]],
        email:['', [Validators.required,Validators.email, this.validEmailPattern()]],
        password:['',[Validators.minLength(6),this.strongPasswordValidator()]],
        role:[{value:'', disabled:true}],
        bio: [''],
        profilePicture: [''],
        socialLinks: this.fb.group({
          instagram: [''],
          twitter: ['']
        })
      })
      this.loadProfile();
      this.userRole = this.authService.getUserRole();
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

    loadProfile() {
      this.profileService.getProfile().subscribe(
        (data:any) => {
          this.profileForm.patchValue(data);
          this.previewImage = data.profilePicture;
        }
      )
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target?.result;
          this.profileForm.patchValue({profilePicture: this.previewImage});
        };
        reader.readAsDataURL(file);
      }
    }

    onSubmit() {
      this.profileService.updateProfile(this.profileForm.value).subscribe((res:any)=> {
        this.toastService.showToast(res.message, 'success');
      },
      (error) => {
        this.toastService.showToast(error.message, 'danger');
      });
    }
}
