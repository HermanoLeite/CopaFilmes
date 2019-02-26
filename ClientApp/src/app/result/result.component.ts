import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Result } from "../models/result.model";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  public championshipResult : Result;
  constructor(private router: Router) {
    this.championshipResult = JSON.parse(localStorage.getItem('result'));
    if(!this.championshipResult) {
      this.router.navigate(["films"]);
    }
  }

  newChampionship () {
    this.router.navigate(["films"]);
  }
}
