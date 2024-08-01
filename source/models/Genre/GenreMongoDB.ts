import MongoDB from "../../globals/MongoDB";
import { GenreRepository } from "./GenreRepository";
import GenreSchema, { IGenreDocument, IGenreMongoDB } from "./GenreSchema";

const Genre = GenreSchema.mainSchema

const GenreMongoDB = MongoDB.model<IGenreDocument, IGenreMongoDB>(
  'Genre',
  Genre
)

export const GenreRepositoryImp = new GenreRepository(GenreMongoDB)

export default GenreMongoDB