export interface LoadFacebookUserByTokenApi {
  loadUserByToken: (
    params: LoadFacebookUserByTokenApi.Params
  ) => Promise<LoadFacebookUserByTokenApi.Result>;
}
export namespace LoadFacebookUserByTokenApi {
  export type Params = {
    token: string;
  };
  export type Result = undefined;
}
