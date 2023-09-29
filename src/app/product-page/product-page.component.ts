import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Product } from '../model/Product';
import { Review } from '../model/Review';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  constructor(private user: UserService, private auth: AuthService, private router: Router, private productService: ProductService, private reviewService: ReviewService, private activatedroute: ActivatedRoute) { }
  product: Product = {  code: "", name: "", brand: "", avgRating: 0, reviews: [] };
  prodCode: String | null = "";
  isAdmin: any;
  key: any;
  reviews: Array<Review> =[];
  ngOnInit(): void {


   this.key = sessionStorage.getItem('key');

   this.user.getUser(this.key).subscribe((data: any) => {

    if (data["data"]["admin"]) {
      this.isAdmin = true;

    } else {
      this.isAdmin = false;

    }
  });

    this.activatedroute.params.subscribe(params => {
      this.prodCode = params['code'];
    })

    
    this.productService.getProductById(this.prodCode).subscribe((response: any) => {
   
      if (response["success"]) {
        this.product = response["data"];
        console.log(this.product);
      } else {
        alert(response["message"]);
      }
    });
    this.reviewService.getReviewsByCode(this.prodCode).subscribe((response: any) => {
    
      if (response["success"]) {
        response["data"].forEach((review: any) => {
          if(this.isAdmin){
            this.reviews.push(review);
          }else if(review.approved){
            this.reviews.push(review);
          }
        });

      } else {
       
        alert(response["message"]);
      }
    });
  }

  logout() {
   
    this.auth.logout();
    sessionStorage.removeItem('key');
    this.router.navigate(['/']);
  }
  approve(id: any) {
    this.reviewService.approveReview(id).subscribe((data: any) => {
      alert("Review Approved");
      window.location.reload();
    });

  }
  addReview(code: any) {
    this.router.navigate(['/add-review', code]);
  }

  delete(id:any){
    this.reviewService.deleteReview(id).subscribe((data:any)=>{
      alert("Review Deleted");
      window.location.reload();
    });
  }

}
