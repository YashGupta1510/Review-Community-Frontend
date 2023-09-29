
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})

export class ProductService {
   

    api = "http://ec2-13-233-36-166.ap-south-1.compute.amazonaws.com:8086/products";

    constructor(private http: HttpClient) { }

    getCount(): any {
        return this.http.get(this.api + "/count"); 
    }

    addProduct(product: any) {
        return this.http.post(this.api + "/create", product);
      }
    
    exists(code: any) {
        return this.http.get(this.api + "/exists/" + code);
    }

    getProductById(code: any) {
        return this.http.get(this.api + "/" + code);
    }

    getProductsBySearch(query: any) {
        return this.http.get(this.api + "/search/" + query);
    }


}