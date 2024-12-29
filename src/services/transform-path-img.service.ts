export class TransformPathImgService {
  transformPath(created_by: created) {
    const teste = {
      ...created_by, // Mantém os outros campos do objeto original
      created_by: created_by.created_by.map((creator) => ({
        ...creator,
        profile_path: creator.profile_path
          ? `https://image.tmdb.org/t/p/w200${creator.profile_path}`
          : null, // Retorna null se não houver um profile_path
      })),
    };
    return teste;
  }
}

export interface created {
  created_by: Array<ICreated>;
}

export interface ICreated {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}
