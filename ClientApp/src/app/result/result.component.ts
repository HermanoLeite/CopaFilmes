import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public winner;
  public looser;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.winner = params["winner"];
      this.looser = params["looser"];
    });
  }

  ngOnInit() {
  }

}
