import axios from "axios";
import { ITvShow } from "../interface/tv-show.interface";
import { ITvShowFront } from "../interface/tv-show-front";
import { SeasonDetails } from "../interface/season-details";
import { log } from "console";

export class TvSeriesService {
  async getSerie(tvId: string) {
    require("dotenv").config();
    const url = `https://api.themoviedb.org/3/tv/${tvId}?language=pt-BR;`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2EyOWIyMzZkNjhhMzc4OTI0OGZmNGY5NGM4NzIzZSIsIm5iZiI6MTcyMTY3NTcyNS4wNTc5OTk4LCJzdWIiOiI2NjllYWZjZDFjNGY2MDcwYWM1OTE4YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LZSuMuyWL5s6hWmzHeH5rlgCYRQIgx3K2TV0DqSkDCI",
      },
    };

    return await axios
      .get(url, options)
      .then((resp) => {
        const data: ITvShow = resp.data;
        const reducedTvShow: ITvShowFront = {
          id: data.id,
          adult: data.adult,
          created_by: data.created_by.map((creator) => ({
            ...creator,
            profile_path: creator.profile_path
              ? `https://image.tmdb.org/t/p/w200${creator.profile_path}`
              : null, // Garante que o campo seja null se não houver imagem
          })),
          backdrop_path: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          name: data.name,
          genres: data.genres.map((genre) => genre.name), // Retorna apenas os nomes dos gêneros
          overview: data.overview,
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`, // Concatena a URL base com o poster_path
          voteAverage: data.vote_average,
          number_of_episodes: data.number_of_episodes,
          number_of_seasons: data.number_of_seasons,
          original_name: data.original_name,
          seasons: data.seasons.map((path) => ({
            ...path,
            poster_path: path.poster_path
              ? `https://image.tmdb.org/t/p/w300${path.poster_path}`
              : null, // Garante que o campo seja null se não houver image
          })),
        };

        return data;
      })
      .catch((error) => {
        if (error.response) {
          return error.response;
        } else if (error.request) {
          console.log("request", error.request);
          return error.request;
        } else {
          console.log("message", error.message);
          return error.message;
        }
      });
  }

  async getDetailsSeason(series_id: string, season_number: string) {
    require("dotenv").config();
    const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?language=pt-BR`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2EyOWIyMzZkNjhhMzc4OTI0OGZmNGY5NGM4NzIzZSIsIm5iZiI6MTcyMTY3NTcyNS4wNTc5OTk4LCJzdWIiOiI2NjllYWZjZDFjNGY2MDcwYWM1OTE4YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LZSuMuyWL5s6hWmzHeH5rlgCYRQIgx3K2TV0DqSkDCI",
      },
    };
    return await axios
      .get(url, options)
      .then((resp) => {
        const data: SeasonDetails = resp.data;
        return data;
      })
      .catch((error) => {
        if (error.response) {
          return error.response;
        } else if (error.request) {
          console.log("request", error.request);
          return error.request;
        } else {
          console.log("message", error.message);
          return error.message;
        }
      });
  }

  async getPopularTvShow() {
    require("dotenv").config();
    const url = `https://api.themoviedb.org/3/tv/popular?language=pt-br&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2EyOWIyMzZkNjhhMzc4OTI0OGZmNGY5NGM4NzIzZSIsIm5iZiI6MTcyMTY3NTcyNS4wNTc5OTk4LCJzdWIiOiI2NjllYWZjZDFjNGY2MDcwYWM1OTE4YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LZSuMuyWL5s6hWmzHeH5rlgCYRQIgx3K2TV0DqSkDCI",
      },
    };
    return await axios
      .get(url, options)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        if (error.response) {
          return error.response;
        } else if (error.request) {
          console.log("request", error.request);
          return error.request;
        } else {
          console.log("message", error.message);
          return error.message;
        }
      });
  }
}
