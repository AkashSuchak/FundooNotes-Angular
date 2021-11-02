import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  Name = '';
  Email = '';
  userId = 0;
  isGrid = true;
  isSearch = false;
  isOption = 1;
  isOptions: string = '';
  searchInp = '';
  expand = true;
  toggle = false;
  clickSearch = true;
  searchIcon = true;
 
  
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getFromLocalStorage();
  }

  async getFromLocalStorage() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    this.Name = user.firstName + ' ' + user.data;
    this.Email = user.email;
    this.userId = user.userId;
  }

  Logout() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    if (user != null) {
      localStorage.removeItem('FundooUser');
      this.route.navigateByUrl('/login');
    }
  }

  changeSearch(event: any) {
    console.log(event.target.value);
    return event.target.value;
  }
  
  checkLocalStorage() {
    var user = localStorage.getItem('FundooUser');
    if (user == null) {
      this.route.navigateByUrl('/login');
    }
  }
}