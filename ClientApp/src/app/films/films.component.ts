import { Component } from '@angular/core';
import { FilmsService } from './films.service';
import { Router } from "@angular/router";
import { Film } from "../models/film.model";
import { Result } from "../models/result.model";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmsService]
})

export class FilmsComponent {
  public selectedFilms: Array<Film>;
  public MAX_FILMS: number = 8;
  public error: boolean = false;
  
  constructor(private filmsService: FilmsService, private router: Router) {
    this.error = false;
    this.getFilms(); 
  }

  getFilms() {
    this.filmsService.getFilms()
      .then((value: Array<Film>) => {
        this.selectedFilms = value.map(film => { return { ...film, selected: false };})
      })
      .catch((err) => {
        console.log('Erro: ' + err);
        this.error = true;
      });
  }

  getSelectedFilmsCount() {
    if (this.selectedFilms)
      return this.getSelectedFilms().length;
  }
  
  getSelectedFilms() {
    if (this.selectedFilms)
      return this.selectedFilms.filter(film => film.selected);
  }

  canFilmBeSelected(film: Film) {
    return (film.selected || this.getSelectedFilmsCount() < this.MAX_FILMS)
  }

  updateFilmSelected(film: Film) {
    if(this.canFilmBeSelected(film))
      film.selected = !film.selected
  }

  startChampionship() {
    if (this.getSelectedFilmsCount() == this.MAX_FILMS) {
      this.filmsService.startChampionship(this.getSelectedFilms())
        .then((result: Result) => {
          this.showResultPage(result);
        })
        .catch((err) => {
          console.log('Erro: ' + err);
          this.error = true;
        });
    }
  }

  showResultPage(result: Result) {
    const championshipResult = {
      firstPlace: result.winner.titulo,
      secondPlace: result.looser.titulo,
    }
    localStorage.setItem('result', JSON.stringify(championshipResult));
    this.router.navigate(["result"]);
  }
}
