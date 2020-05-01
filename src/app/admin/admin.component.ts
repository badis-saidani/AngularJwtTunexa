import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
@Input() authority: string;

toInbox: boolean = true;
toDevis: boolean = false;
toCategories: boolean = false;
toProducts: boolean = false;
isTrue: boolean = false;

info: any;

  constructor(private userService: UserService, private router: Router, private token: TokenStorageService) { }

  ngOnInit() {
    console.log(this.router.url);
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };


  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  turnToInbox() {
    this.toInbox = true;
    this.toDevis = false;
    this.toCategories = false;
    this.toProducts = false;
  }

  turnToDevis() {
    this.toInbox = false;
    this.toDevis = true;
    this.toCategories = false;
    this.toProducts = false;
  }

  turnToCategories() {
    this.toInbox = false;
    this.toDevis = false;
    this.toCategories = true;
    this.toProducts = false;
  }

  turnToProducts() {
    this.toInbox = false;
    this.toDevis = false;
    this.toCategories = false;
    this.toProducts = true;
  }
  
  openNavBar(){
    this.isTrue = true;
  }
  closeNavBar(){
    this.isTrue = false;
  }
}

