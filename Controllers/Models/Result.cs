namespace copa_filmes.Controllers.Models
{
    public class Result
    {
        public Film winner { get; set; }
        public Film looser { get; set; }

        public Result(Film winner, Film looser) {
            this.winner = winner;
            this.looser = looser;
        }
    }
}