import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class FilmsService{
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
  }
  
  getFilms() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = 'https://copadosfilmes.azurewebsites.net/api/filmes';
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            console.log('resolve ' + res);
            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  startChampionship(selectedFilms) {
    this.http.post<any>(this.baseUrl + 'api/WorldCup/startChampionship', selectedFilms).subscribe(result => {
      console.log(JSON.stringify(result))
      const championshipResult = {
        firstPlace: result.winner.titulo,
        secondPlace: result.looser.titulo,
      }
      localStorage.setItem('dataSource', JSON.stringify(championshipResult));
      this.router.navigate(["result"]);
    }, error => console.error(error));
  }
}
