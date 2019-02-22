namespace prova_lambda_angular.Controllers.Models
{
    public class Resultado
    {
        public Filme vencedor { get; set; }
        public Filme perdedor { get; set; }

        public Resultado(Filme vencedor, Filme perdedor) {
            this.vencedor = vencedor;
            this.perdedor = perdedor;
        }
    }
}