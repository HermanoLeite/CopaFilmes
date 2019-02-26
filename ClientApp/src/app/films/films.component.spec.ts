import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../header/header.component';
import { FilmsComponent } from './films.component';
import { FilmsService } from './films.service';
import { Router } from "@angular/router";

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async(() => {
    TestBed.overrideProvider(FilmsService, { useValue: {getFilms () {  return new Promise((resolve, reject) => resolve); }} });
    TestBed.configureTestingModule({
      declarations: [ FilmsComponent, HeaderComponent ],
      providers: [
            { provide: Router, useValue: class { navigate = jasmine.createSpy("navigate"); } }
        ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get selected films with selected films', () => {
    const mockFilm = [{id: "1", titulo: "test", nota: 1, ano: 2, selected: true}];
    component.selectedFilms = mockFilm;
    expect(component.getSelectedFilms()).toEqual(mockFilm);
  });

  it('get selected films with none selected films', () => {
    const mockFilm = [{id: "1", titulo: "test", nota: 1, ano: 2, selected: false}];
    component.selectedFilms = mockFilm;
    expect(component.getSelectedFilms()).toEqual([]);
  });

  it('get selected films with multiple films and one selected', () => {
    const mockFilm2 = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};
    const mockFilm = [{id: "1", titulo: "test", nota: 1, ano: 2, selected: false}, mockFilm2];
    component.selectedFilms = mockFilm;
    expect(component.getSelectedFilms()).toEqual([mockFilm2]);
  });

  it('can film be selected with selected film - return true', () => {
    const mockFilm = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};
    expect(component.canFilmBeSelected(mockFilm)).toBeTruthy();
  });

  it('can film be selected with not selected film and selected films < max - return true', () => {
    const mockFilm = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: false};
    component.selectedFilms = [mockFilm];
    component.MAX_FILMS = 2;
    expect(component.canFilmBeSelected(mockFilm)).toBeTruthy();
  });

  it('can film be selected with not selected film and selected films = max - return false', () => {
    const mockFilm2 = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};
    const mockFilm = {id: "1", titulo: "test", nota: 1, ano: 2, selected: false}
    const mockFilms = [mockFilm, mockFilm2];
    component.selectedFilms = mockFilms;
    component.MAX_FILMS = 1;
    expect(component.canFilmBeSelected(mockFilm)).toBeFalsy();
  });

  it('can film be selected with not selected film and selected films > max - return false', () => {
    const mockFilm2 = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};
    const mockFilm3 = {id: "3", titulo: "test 3", nota: 2, ano: 3, selected: true};
    const mockFilm = {id: "1", titulo: "test", nota: 1, ano: 2, selected: false}
    const mockFilms = [mockFilm, mockFilm2, mockFilm3];
    component.selectedFilms = mockFilms;
    component.MAX_FILMS = 1;
    expect(component.canFilmBeSelected(mockFilm)).toBeFalsy();
  });

  it('can film be selected with selected film and selected films = max - return true', () => {
    const mockFilm2 = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};
    const mockFilm = {id: "1", titulo: "test", nota: 1, ano: 2, selected: false}
    const mockFilms = [mockFilm, mockFilm2];
    component.selectedFilms = mockFilms;
    component.MAX_FILMS = 1;
    expect(component.canFilmBeSelected(mockFilm2)).toBeTruthy();
  });

  it('update film with selected true - return false', () => {
    const mockFilm = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: true};

    component.updateFilmSelected(mockFilm)
    expect(mockFilm.selected).toBeFalsy();
  });
  
  it('update film with selected false - return true', () => {
    const mockFilm = {id: "2", titulo: "test 2", nota: 2, ano: 3, selected: false};    
    component.MAX_FILMS = 2;
    component.selectedFilms = [mockFilm];
    component.updateFilmSelected(mockFilm)
    expect(mockFilm.selected).toBeTruthy();
  });
});
