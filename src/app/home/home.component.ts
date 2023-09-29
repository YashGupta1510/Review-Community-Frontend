import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private user: UserService, private toastr: NotificationService, private product: ProductService, private review: ReviewService, private auth: AuthService, private router: Router) { }

  countUser: any;
  countProduct: any;
  countReview: any;
  loggedIn: any;
  key: any;
  isAdmin: any = false;

  ngOnInit(): void {

    this.loggedIn = this.auth.isLoggedIn;

    if(this.loggedIn){
    this.key = sessionStorage.getItem('key');


    this.user.getUser(this.key).subscribe((data: any) => {

      if (data["data"]["admin"]) {
        this.isAdmin = true;

      } else {
        this.isAdmin = false;

      }
    });
  }
    this.user.getCount().subscribe((response: any) => {
      if (response["success"]) {
        this.countUser = response["data"];
      }
      else {
        alert(response["message"]);
      }
    });


    this.product.getCount().subscribe((response: any) => {
      if (response["success"]) {
        this.countProduct = response["data"];
      }
      else {
        alert(response["message"]);
      }
    });


    this.review.getCount().subscribe((response: any) => {
      if (response["success"]) {
        this.countReview = response["data"];
      }
      else {
        alert(response["message"]);
      }
    });
  }

  logout() {

    sessionStorage.removeItem('key');
    this.auth.logout();
    this.router.navigate(['/']);
  }

  searchForm = new FormGroup({
    searchValue: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]),
  })

  search() {
    sessionStorage.setItem("query", this.searchForm.value.searchValue ? this.searchForm.value.searchValue : " ");
    this.router.navigate(['/search']);
  }


}
