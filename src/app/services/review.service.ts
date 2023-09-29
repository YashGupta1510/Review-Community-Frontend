
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { API } from '../constants';

@Injectable({
    providedIn: 'root'
})

export class ReviewService {

    api = API+"reviews";

    constructor(private http: HttpClient) { }

    getCount(): any {
        return this.http.get(this.api + "/count");
    }

    getReviewsByCode(code: any) {
        return this.http.get(this.api + "/" + code);
    }

    postReview(review: any) {
        return this.http.post(this.api + "/create", review);
    }

    approveReview(id: any) {
        return this.http.get(this.api + "/approve/" + id);
    }
    
    deleteReview(id: any) {
        return this.http.get(this.api + "/delete/" + id);
    }

    getReviews() {
        return this.http.get(this.api + "/");
    }

}