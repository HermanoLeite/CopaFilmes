import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilmsService{
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  
  getFilms() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = 'https://copadosfilmes.azurewebsites.net/api/filmes';
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
    return promise;
  }

  startChampionship (selectedFilms)  {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + 'api/WorldCup/startChampionship', selectedFilms)
        .toPromise()
        .then(
          res => resolve(res),
          msg => reject(msg)
        );
    });
    return promise;
  }
}
