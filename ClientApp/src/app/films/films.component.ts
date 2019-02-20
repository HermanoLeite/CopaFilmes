import { Component, OnInit } from '@angular/core';
import { FilmsService } from './films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmsService]
})
export class FilmsComponent implements OnInit {
  selectedFilms;
  constructor(private filmsService: FilmsService) { }
  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.filmsService.getFilms().then((value: [{}]) => {
      this.selectedFilms = value.map(film => { return { ...film, selected: false };})
    }).catch((err) => {
      console.log('Erro: ' + JSON.stringify(err)); // "Success"
    });
  }

  getSelectedFilmsCount() {
    return this.selectedFilms.filter(film => film.selected).length;
  }

}
