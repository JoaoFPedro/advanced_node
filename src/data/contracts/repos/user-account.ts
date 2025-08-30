/* eslint-disable @typescript-eslint/indent */
export interface LoadUserAccountRepository {
  load: (
    params: LoadUserAccountRepository.Params
  ) => Promise<LoadUserAccountRepository.Result>;
}
export namespace LoadUserAccountRepository {
  export type Params = {
    email: string;
  };
  export type Result =
    | undefined
    | {
        id: string;
        name?: string;
      };
}

export interface SaveUserAccountRepository {
  saveWithFacebook: (params: SaveUserAccountRepository.Params) => Promise<void>;
}
export namespace SaveUserAccountRepository {
  export type Params = {
    id?: string;
    email: string;
    name: string;
    facebookId: string;
  };
}
// export interface UpdateUserAccountRepository {
//   updateFromFacebook: (
//     params: UpdateUserAccountRepository.Params
//   ) => Promise<void>;
// }
// export namespace UpdateUserAccountRepository {
//   export type Params = {
//     id: string;
//     name: string;
//     facebookId: string;
//   };
// }
