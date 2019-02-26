using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using copa_filmes.Controllers.Models;

namespace copa_filmes.Controllers
{
    [Route("api/[controller]")]
    public class WorldCup : Controller
    {
        [HttpPost("[action]")]
        public IActionResult  startChampionship([FromBody] List<Film> films)
        {
            try {
                return Ok(championship(films.OrderBy(f => f.titulo).ToList()));
            }
            catch (Exception) {
                return StatusCode(500, "Ocorreu um erro na competição");
            }
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