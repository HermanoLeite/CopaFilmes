import { Component, OnInit } from '@angular/core';
import { FilmsService } from './films.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmsService]
})

export class FilmsComponent implements OnInit {
  selectedFilms;
  MAX_FILMS = 8;
  
  constructor(private filmsService: FilmsService) {
    this.getFilms(); 
  }
  ngOnInit() {
  }

  getFilms() {
    this.filmsService.getFilms().then((value: [{}]) => {
      this.selectedFilms = value.map(film => { return { ...film, selected: false };})
    }).catch((err) => {
      console.log('Erro: ' + JSON.stringify(err)); // "Success"
    });
  }

  getSelectedFilmsCount() {
    if (this.selectedFilms)
      return this.selectedFilms.filter(film => film.selected).length;
  }

  canFilmBeSelected(film) {
    return (film.selected || this.getSelectedFilmsCount() < this.MAX_FILMS)
  }

  updateFilmSelected(film) {
    if(this.canFilmBeSelected(film))
      film.selected = !film.selected
  }

  startChampionship() {
    if (this.getSelectedFilmsCount() == this.MAX_FILMS)
      this.filmsService.startChampionship(this.selectedFilms.filter(film => film.selected));
  }
}
