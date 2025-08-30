export interface LoadUserAccountRepository {
  load: (
    params: LoadUserAccountRepository.Params
  ) => Promise<LoadUserAccountRepository.Result>;
}
export namespace LoadUserAccountRepository {
  export type Params = {
    email: string;
  };
  export type Result = undefined;
}

export interface CreateUserAccountRepository {
  createFromFacebook: (
    params: CreateUserAccountRepository.Params
  ) => Promise<void>;
}
export namespace CreateUserAccountRepository {
  export type Params = {
    email: string;
    name: string;
    facebookId: string;
  };
}
