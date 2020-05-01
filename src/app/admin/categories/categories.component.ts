import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category = new Category();
  form: any = {};
  categories: Category[] = [];


  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
   // this.category= this.categoryService.getter();
   //this.category= new Category('','');
  }

  getAllCategories() {
    this.categoryService.getAllcategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {alert('Error occurred while downloading the list of categories;');}
    );
  }


  updateCategory(category: Category) {
    this.category = category;
    this.toBeUpdated = true;
    console.log('badis update? in updatecategory : '+ this.toBeUpdated + ' code : ' + this.category.id);
  }

  createCategory(category: Category) {
    this.category = category;
    this.toBeUpdated = false;
  }


  onSubmit(){
    console.log('badis update? in onSubmit: '+ this.toBeUpdated + ' code : ' + this.category.id);
    if(this.toBeUpdated === false){
      console.log('badis look: '+ this.category);
      this.categoryService.postCategory(this.category).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while saving the category');
        }
      );
    } else {
      this.categoryService.updateCategory(this.category).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while updating the category');
        }
      );
    }

  }

  deleteCategory(category: Category){
    // console.log('si badis: ' + this.toBeDeleted);
    this.category = category;
  }

  comfirmDelete(){
    this.categoryService.deleteCategory(this.category.id).subscribe(
      res =>{
        let indexOfCategory = this.categories.indexOf(this.category);
        this.categories.splice(indexOfCategory, 1);
        this.reloadPage();
      },
      err=>{alert("An error has occurred deleting the category");}
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
