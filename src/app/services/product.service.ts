
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { API } from "../constants";


@Injectable({
    providedIn: 'root'
})

export class ProductService {
   

    api = API  + "products";

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