
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})

export class UserService {

    api = "http://ec2-13-233-36-166.ap-south-1.compute.amazonaws.com:8086/users";

    constructor(private http: HttpClient) { }

    getCount(): any {
        return this.http.get(this.api + "/count"); 
    }

    verifyUser(credentials: any) {
        return this.http.post(this.api + "/verify", credentials);
    }

    registerUser(user: any) {
        return this.http.post(this.api + "/create", user);
    }

    getUser(id: any) {
        return this.http.get(this.api + "/" + id);
    }

}