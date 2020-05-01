import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
   authority: string;
   isTrue: boolean;

  path: string;
  categories: Category[];
  private notifier: NotifierService;

  constructor(private tokenStorage: TokenStorageService, private router: Router,
     private catService: CategoryService, notifier: NotifierService ) {
      this.notifier = notifier;
    }

  ngOnInit() {

    this.path = this.router.url;
    console.log(this.tokenStorage.getToken());
    this.isTrue = false;

    this.getAllCategories();


    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } 
        this.authority = 'user';
        return true;
      });
    }
  }

  getAllCategories() {
 this.notifier.notify('info','       loading data, wait please .....     ');
    this.catService.getAllowedCategories().subscribe(
      res => {
        this.categories = res;
        this.notifier.notify( 'success', 'data successfully loaded.' );
      },
      err => {
        console.log('Error occurred while downloading the list of categories;');
        this.notifier.notify( 'error', 'Error occurred while downloading the list of categories.' );
    }
    );
  }

  openNavBar(){
    this.isTrue = true;
  }
  closeNavBar(){
    this.isTrue = false;
  }
}
