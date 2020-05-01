import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpEventType } from '@angular/common/http';
import { UploadFileService } from 'src/app/upload/upload-file.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  form: any = {};
  products: Product[];
  categoryList: Category[];

  product: Product = new Product();

  isSaveFailed = false;
  toBeUpdated = false;
  errorMessage = '';

  selectedCat: Category;
  selectedNum: Number;

  constructor(private productService: ProductService, private router: Router,
    private categoryService: CategoryService,
    private fileService: UploadFileService) { }

  ngOnInit() {
    this.selectedCat = new Category();
    this.selectedNum = 0;
    //this.selectedCat = 0;
    this.getAllProducts();
    this.getAllCategories();
   // this.product= this.productService.getter();
  //  this.product= new Product('','');
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res;
      },
      err => {alert('Error occurred while downloading the list of products;');}
    );
  }

  getAllCategories() {
    this.categoryService.getAllcategories().subscribe(
      res => {
        this.categoryList = res;
      },
      err => {alert('Error occurred while downloading the list of categories;');}
    );
  }


  updateProduct(product: Product) {
    this.product = product;
    this.toBeUpdated = true;
    console.log('badis update? in updateproduct : '+ this.toBeUpdated + ' desc : ' + this.product.description);
  }

  createProduct(product: Product) {
    this.product = product;
    this.toBeUpdated = false;
  }


  onSubmit(){
    console.log('seectNum: ' + this.selectedNum);

    if(this.selectedNum != 0){
       this.categoryList.forEach(
        c => {
          if(c.id === this.selectedNum){
            this.product.category = new Category(c.id, c.name);
          }
        } );
        // console.log('seectCat: ' + this.product.category.name);
        this.product.categoryId = this.selectedNum;
        // console.log('badis update? in onSubmit: '+ this.toBeUpdated + ' cat : ' + this.product.category.name);
    }

    if(this.toBeUpdated === false){
      console.log('badis look: '+ this.product);
      this.productService.postProduct(this.product).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while saving the product');
        }
      );
    } else {
      this.productService.updateProduct(this.product).subscribe(
        res => {
          this.reloadPage();
        },
        err => {
          console.log(err);
          this.errorMessage= err.error.message;

          alert('An error occurred while updating the product');
        }
      );
    }

  }

  deleteProduct(product: Product){
    // console.log('si badis: ' + this.toBeDeleted);
    this.product = product;
  }

  comfirmDelete(){
    this.productService.deleteProduct(this.product.id).subscribe(
      res =>{
        let indexOfProduct = this.products.indexOf(this.product);
        this.products.splice(indexOfProduct, 1);
        this.reloadPage();
      },
      err=>{alert("An error has occurred deleting the product");}
    );
  }

  reloadPage() {
    window.location.reload();
  }

  comfirmDeletePic(){
    this.fileService.deleteFile(this.product.id).subscribe(
      res =>{
        let indexOfProduct = this.products.indexOf(this.product);
        //this.products.splice(indexOfProduct, 1);
        this.reloadPage();
      },
      err=>{alert("An error has occurred deleting the product");}
    );
  }

}
