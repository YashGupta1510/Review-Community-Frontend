import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AskReviewComponent } from './ask-review/ask-review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { authGuard } from './services/auth.guard';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path:'ask-review',
    component: AskReviewComponent,
    canActivate: [authGuard],
  },
  {
    path:'product-page/:code',
    component: ProductPageComponent,
    canActivate: [authGuard],
  },
  {
    path:'add-review/:code',
    component: AddReviewComponent,
    canActivate: [authGuard],
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'search',
    component: SearchComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
