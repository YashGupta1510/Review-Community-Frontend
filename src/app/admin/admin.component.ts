import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private user: UserService, private review: ReviewService, private auth: AuthService, private router: Router) { }

  key: any;
  reviewsApproved: any = [];
  reviewsWaiting: any = [];
  isAdmin: any;

  ngOnInit(): void {
    this.key = sessionStorage.getItem('key');
  

    this.user.getUser(this.key).subscribe((data: any) => {
   
      if (data["data"]["admin"]) {
        this.isAdmin = true;
     
      } else {
        this.router.navigate(['/home']);
        alert("You are not an Admin");
      }
    });

    this.review.getReviews().subscribe((data: any) => {
      if (data["success"]) {
      
        data["data"].forEach((element: any) => {
          if (element["approved"] == true) {
            this.reviewsApproved.push(element);
         
          } else {
            this.reviewsWaiting.push(element);
          
          }
        });
      } else { 
      }
    })


  }


  approve(id: any) {
    this.review.approveReview(id).subscribe((data: any) => {
      alert("Review Approved");
      window.location.reload();
    });

  }


  delete(id:any){
    this.review.deleteReview(id).subscribe((data:any)=>{
      alert("Review Deleted");
      window.location.reload();
    });
  }

  
  logout() {
 
    this.auth.logout();
    sessionStorage.removeItem('key');
    this.router.navigate(['/']);
  }

}
