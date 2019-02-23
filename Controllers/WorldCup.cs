using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using prova_lambda_angular.Controllers.Models;

namespace prova_lambda_angular.Controllers
{
    [Route("api/[controller]")]
    public class WorldCup : Controller
    {
        [HttpPost("[action]")]
        public Result startChampionship([FromBody] List<Film> films)
        {
            // try catch
            return championship(films.OrderBy(f => f.titulo).ToList());
        }

        public Result championship(List<Film> films) {
            while (films.Count > 2) {
                var tamanho = films.Count;
                List<Film> filmsOrderedByGame = new List<Film>();
                for (var i = 0; i < tamanho/2; i++) {
                    filmsOrderedByGame.Add(game(films[i], films[tamanho-1-i]).winner);
                }
                films = filmsOrderedByGame;
            }
            return game(films.First(), films.Last());
        }

        public Result game(Film film1, Film film2) {
            if(film1.nota > film2.nota)
                return new Result(film1, film2);
            if(film1.nota < film2.nota)
                return new Result(film2, film1);
            if(string.Compare(film1.titulo, film2.titulo) < 0)
                return new Result(film1, film2);

            return new Result(film2, film1);
        } 
    }
}