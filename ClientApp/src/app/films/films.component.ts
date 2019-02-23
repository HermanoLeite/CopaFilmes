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
    const value = [{"id":"tt3606756","titulo":"Os Incríveis 2","ano":2018,"nota":8.5},{"id":"tt4881806","titulo":"Jurassic World: Reino Ameaçado","ano":2018,"nota":6.7},{"id":"tt5164214","titulo":"Oito Mulheres e um Segredo","ano":2018,"nota":6.3},{"id":"tt7784604","titulo":"Hereditário","ano":2018,"nota":7.8},{"id":"tt4154756","titulo":"Vingadores: Guerra Infinita","ano":2018,"nota":8.8},{"id":"tt5463162","titulo":"Deadpool 2","ano":2018,"nota":8.1},{"id":"tt3778644","titulo":"Han Solo: Uma História Star Wars","ano":2018,"nota":7.2},{"id":"tt3501632","titulo":"Thor: Ragnarok","ano":2017,"nota":7.9},{"id":"tt2854926","titulo":"Te Peguei!","ano":2018,"nota":7.1},{"id":"tt0317705","titulo":"Os Incríveis","ano":2004,"nota":8.0},{"id":"tt3799232","titulo":"A Barraca do Beijo","ano":2018,"nota":6.4},{"id":"tt1365519","titulo":"Tomb Raider: A Origem","ano":2018,"nota":6.5},{"id":"tt1825683","titulo":"Pantera Negra","ano":2018,"nota":7.5},{"id":"tt5834262","titulo":"Hotel Artemis","ano":2018,"nota":6.3},{"id":"tt7690670","titulo":"Superfly","ano":2018,"nota":5.1},{"id":"tt6499752","titulo":"Upgrade","ano":2018,"nota":7.8}];
    this.selectedFilms = value.map(film => { return { ...film, selected: false };})
    //this.filmsService.getFilms().then((value: [{}]) => {
    //  this.selectedFilms = value.map(film => { return { ...film, selected: false };})
    //}).catch((err) => {
    //  console.log('Erro: ' + JSON.stringify(err)); // "Success"
    //});
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
