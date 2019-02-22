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
        public Resultado startChampionship([FromBody] List<Filme> filmes)
        {
            var filmesOrdenadosPorDisputa = ordenaFilmePorDisputa(filmes.OrderBy(f => f.titulo).ToList());
            // try catch
            return campeonato(filmesOrdenadosPorDisputa);
        }

        public List<Filme> ordenaFilmePorDisputa(List<Filme> filmes) {
            var tamanho = filmes.Count;
            List<Filme> filmesOrdenadosPorDisputa = new List<Filme>();
            for (var i = 0; i < tamanho/2; i++) {
                filmesOrdenadosPorDisputa.Add(filmes[i]);
                filmesOrdenadosPorDisputa.Add(filmes[tamanho-1-i]);
            }
            return filmesOrdenadosPorDisputa;
        }

        public Resultado campeonato(List<Filme> filmes) {
            if(filmes.Count == 2) {
                return disputa(filmes[0], filmes[1]);
            }
            var primeiroGrupo = campeonato(filmes.Take(filmes.Count/2).ToList());
            var segundoGrupo = campeonato(filmes.Skip(filmes.Count/2).ToList());
            return disputa(primeiroGrupo.vencedor, segundoGrupo.vencedor);
        }

        public Resultado disputa (Filme filme1, Filme filme2) {
            if(filme1.nota > filme2.nota)
                return new Resultado(filme1, filme2);
            if(filme1.nota < filme2.nota)
                return new Resultado(filme2, filme1);
            if(string.Compare(filme1.titulo, filme2.titulo) < 0)
                return new Resultado(filme1, filme2);

            return new Resultado(filme2, filme1);
        } 
    }
}