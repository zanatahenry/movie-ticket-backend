import MongoDB from "../../globals/MongoDB";
import { WatchedMoviesRepository } from "./WatchedMoviesRepository";
import WatchedMoviesSchema, { IWatchedMoviesDocument, IWatchedMoviesMongoDB } from "./WatchedMoviesSchema";

const WatchedMovies = WatchedMoviesSchema.mainSchema

const WatchedMoviesMongoDB = MongoDB.model<IWatchedMoviesDocument, IWatchedMoviesMongoDB>(
  'WatchedMovie',
  WatchedMovies
)

export const WatchedMoviesRepositoryImp = new WatchedMoviesRepository(WatchedMoviesMongoDB)

export default WatchedMoviesMongoDB