import { Request, Response, Router } from "express";
import { TvSeriesService } from "../services/tvSeries.service";

const routes = Router();
const tvSerieService = new TvSeriesService();

routes.get(
  "/byType/:productType",
  async (request: Request, response: Response) => {
    const params = request.params;
    const productType = params.productType;
    const productTypeReturn = await tvSerieService.getSerie(productType);
    response.status(200).send(productTypeReturn);
  }
);

routes.get(
  "/details-season",
  async (request: Request, response: Response): Promise<void> => {
    try {
      // Obtendo os valores dos headers
      const series_id = request.headers["series-id"] as string | undefined;
      const season_number = request.headers["season-number"] as
        | string
        | undefined;

      // Validando os headers
      if (!series_id || !season_number) {
        response.status(400).json({
          error: "Os headers 'series-id' e 'season-number' são obrigatórios.",
        });
        return; // Para evitar continuar a execução
      }

      // Chamando o serviço com os valores fornecidos
      const seasonDetails = await tvSerieService.getDetailsSeason(
        series_id,
        season_number
      );

      // Retornando os detalhes da temporada
      response.status(200).json(seasonDetails);
    } catch (error) {
      console.error("Erro na rota /details-season:", error);
      response.status(500).json({
        error: "Ocorreu um erro ao buscar os detalhes da temporada.",
        details: error instanceof Error ? error.message : error,
      });
    }
  }
);

routes.get("/popular", async (request: Request, response: Response) => {
  const productTypeReturn = await tvSerieService.getPopularTvShow();
  response.status(200).json(productTypeReturn);
});

export default routes;
