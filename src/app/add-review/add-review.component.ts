import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute,private router : Router,private reviewService: ReviewService, private productService:ProductService) { }

  reviewForm= new FormGroup({
    code: new FormControl('', Validators.required),
    heading :new FormControl('', Validators.required),
    comment :new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]),
    
  })
rating = 1;
  get code(){return this.reviewForm.get('code');}
  get heading(){ return this.reviewForm.get('heading');}
  get comment(){ return this.reviewForm.get('comment');}
prod: any;
val: any;
  ngOnInit(): void {


  this.activatedRoute.params.subscribe((params)=>{
    this.val = params['code'];
  });
    
  this.reviewForm.patchValue({
    code: this.val
  })
this.productService.getProductById(this.val).subscribe((response : any)=>{this.prod = response["data"];});

}

  onSubmit(){
    
    let review = {
      "code": this.reviewForm.value.code,
      "heading": this.reviewForm.value.heading,
      "text": this.reviewForm.value.comment,
      "approved": false,
      "rating": this.rating,
    }
    this.reviewService.postReview(review).subscribe((response)=>{
     
      this.router.navigate(['/home']);

    });
  }
  logout() {
   
    sessionStorage.removeItem('key');
    this.auth.logout();
    this.router.navigate(['/']);
  }


}
