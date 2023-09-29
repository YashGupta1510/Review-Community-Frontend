import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../model/Product';
import { Review } from '../model/Review';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private auth: AuthService, private productService: ProductService, private reviewService: ReviewService, private router: Router) { }

  allProds: Array<Product> = [];
  prods: Array<Product> = [];
  query: String | null | undefined = "";
  searchBy = "all";
  searchForm = new FormGroup({
    searchValue: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]),
  })



  ngOnInit(): void {

    this.query = sessionStorage.getItem("query");

    this.productService.getProductsBySearch(this.query).subscribe((response: any) => {
      this.prods = response["data"];
      this.prods.forEach((prod: any) => {
        this.reviewService.getReviewsByCode(prod["code"]).subscribe((response: any) => {
          prod.reviews = response["data"];
          let sum = 0.0;
          let count = 0;
          if (prod.reviews.length > 0) {
            sum = 0.0;
            count = 0;
            prod.reviews.forEach((review: Review) => {
              if (review.approved) {
                sum = sum + review.rating;
                count++;
              }
            });
            if (count != 0) {
              prod["avgRating"] = sum / count;
              prod["avgRating"] = prod["avgRating"].toFixed(2);
            } else {
              prod["avgRating"] = 0.0;
            }
          }
        });
      });
    });

  }

  selectChangeHandler(event: any) {
    this.searchBy = event.target.value;
  }

  search() {

    this.prods = [];

    this.query = this.searchForm.value.searchValue;

    this.productService.getProductsBySearch(this.query).subscribe((response: any) => {
      this.allProds = response["data"];

      this.allProds.filter((prod: any) => {
        if (this.searchBy == "all") {
          this.prods = this.allProds;
        } else {
          if (prod[this.searchBy].includes(this.query)) {
            this.prods.push(prod);
          } else {
          }
        }
      });

      this.prods.forEach((prod: any) => {


        this.reviewService.getReviewsByCode(prod["code"]).subscribe((response: any) => {
          let sum = 0.0;
          let count = 0;
          prod.reviews = response["data"];
          if (prod.reviews.length > 0) {
            sum = 0.0;
            count = 0;
            prod.reviews.forEach((review: any) => {
              if (review.approved) {
                sum += review.rating;
                count++;
              }
            });
            if (count != 0) {
              prod["avgRating"] = sum / count;
              prod["avgRating"] = prod["avgRating"].toFixed(2);
            } else {
              prod["avgRating"] = 0.0;
            }
          }
        });
      });
    });
  }
  viewProduct(code: any) {
    this.router.navigate(['/product-page', code]);
  }
  addReview(code: any) {
    this.router.navigate(['/add-review', code]);
  }

  logout() {
    this.auth.logout();
    sessionStorage.removeItem('key');
    this.router.navigate(['/']);
  }


}
