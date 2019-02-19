import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilmsService{
  constructor(private http: HttpClient) {
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
}
