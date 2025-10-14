import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtworkService } from 'src/app/services/artwork.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-upload-artwork',
  templateUrl: './upload-artwork.component.html',
  styleUrls: ['./upload-artwork.component.css']
})
export class UploadArtworkComponent implements OnInit {
  uploadForm!: FormGroup;
  images: File[] = [];
  previewImages: any[] = [];

  constructor(private fb: FormBuilder, private artworkService: ArtworkService, private toastService: ToastService){};

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ["", Validators.required],
      images: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    if(event.target.files.length) {
      this.images = Array.from(event?.target.files);
      this.uploadForm.patchValue({images: this.images});
      this.previewImages = [];

      this.images.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages?.push(e.target?.result);
        };
        reader.readAsDataURL(file);
      })
    }
  }

  uploadArtwork() {
    if(this.uploadForm.invalid) return;

    const formData = new FormData();

    formData.append("title", this.uploadForm.value.title);
    formData.append("description", this.uploadForm.value.description);
    formData.append("price", this.uploadForm.value.price);
    formData.append("category", this.uploadForm.value.category);

    this.images.forEach((file) => formData.append("images", file));

    this.artworkService.uploadArtwork(formData).subscribe({
      next: (res) => {
        this.toastService.showToast(res.message, 'success');
        this.previewImages = []
        this.uploadForm.reset();
      },
      error: (err) => this.toastService.showToast(err.error.message, 'danger'),
    })
  }
}
