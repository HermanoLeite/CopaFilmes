import { Component, OnInit } from '@angular/core';
import { FilmsService } from './films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmsService]
})
export class FilmsComponent implements OnInit {
  films;
  constructor(private filmsService: FilmsService) { }
  ngOnInit() {
    this.filmsService.getFilms().then((value) => {
      this.films = value;
      console.log('value ' + JSON.stringify(value)); // "Success"
    }).catch((err) => {
      console.log('Erro: ' + JSON.stringify(err)); // "Success"
    });
  }

  getFilms() {

  }

}
