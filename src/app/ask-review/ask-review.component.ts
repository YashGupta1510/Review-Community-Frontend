import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-ask-review',
  templateUrl: './ask-review.component.html',
  styleUrls: ['./ask-review.component.css']
})
export class AskReviewComponent {

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
  });
  get name() { return this.productForm.get('name'); }
  get code() { return this.productForm.get('code'); }
  get brand() { return this.productForm.get('brand'); }
  
constructor(private auth : AuthService, private productService : ProductService, private router : Router, private toastr: NotificationService) { }

  error = false;

  onSubmit() {
      if (this.productForm.valid) {
      this.error = false;
      this.productService.exists(this.productForm.value.code).subscribe(async (response: any) => {
        if(response["success"]){
          this.toastr.showError("Product already exists", "Redirecting");
          await new Promise(f => setTimeout( ()=> {
           
            this.router.navigate(['/product-page', this.productForm.value.code]);
          }, 2000));
        }
        else{
          this.productService.addProduct(this.productForm.value).subscribe((response: any) => {
            if(response["success"]){
              this.router.navigate(['/product-page' , this.productForm.value.code]);
            }else{
              alert(response["message"]);
            }
          });
        }
      });
     
    }
    else {
      this.error = true;
    }
  }


  logout() {
    sessionStorage.removeItem('key');
    this.auth.logout();
    this.router.navigate(['/']);
  }


}
