import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  public championshipResult;
  constructor(private router: Router) {
    this.championshipResult = JSON.parse(localStorage.getItem('dataSource'));
    if(!this.championshipResult) {
      this.router.navigate(["films"]);
    }
  }

  newChampionship () {
    this.router.navigate(["films"]);
  }
}
