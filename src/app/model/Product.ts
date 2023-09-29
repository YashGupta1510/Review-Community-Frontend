import { Review } from "./Review";

export interface Product {

    code: String;
    name: String;
    brand: String;
    avgRating: number;
    reviews: Array<Review>;
}