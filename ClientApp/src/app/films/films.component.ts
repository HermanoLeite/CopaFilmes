import { Component } from '@angular/core';
import { FilmsService } from './films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmsService]
})

export class FilmsComponent {
  public selectedFilms;
  public MAX_FILMS = 8;
  
  constructor(private filmsService: FilmsService) {
    this.getFilms(); 
  }

  getFilms() {
    this.filmsService.getFilms().then((value: [{}]) => {
      this.selectedFilms = value.map(film => { return { ...film, selected: false };})
    }).catch((err) => {
      console.log('Erro: ' + JSON.stringify(err));
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

  canFilmBeSelected(film) {
    return (film.selected || this.getSelectedFilmsCount() < this.MAX_FILMS)
  }

  updateFilmSelected(film) {
    if(this.canFilmBeSelected(film))
      film.selected = !film.selected
  }

  startChampionship() {
    if (this.getSelectedFilmsCount() == this.MAX_FILMS)
      this.filmsService.startChampionship(this.getSelectedFilms());
  }
}
