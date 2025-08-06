import { AuthenticationError } from "@/domain/models";
class FacebookAuthenticationService {
  constructor(
    private readonly LoadFacebookUserByTokenApi: LoadFacebookUserByTokenApi
  ) {}

  async perform(
    params: LoadFacebookUserByTokenApi.Params
  ): Promise<AuthenticationError> {
    await this.LoadFacebookUserByTokenApi.loadUserByToken(params);
    return new AuthenticationError();
  }
}
interface LoadFacebookUserByTokenApi {
  loadUserByToken: (
    params: LoadFacebookUserByTokenApi.Params
  ) => Promise<LoadFacebookUserByTokenApi.Result>;
}
namespace LoadFacebookUserByTokenApi {
  export type Params = {
    token: string;
  };
  export type Result = undefined;
}
class LoadFacebookUserApiSpy implements LoadFacebookUserByTokenApi {
  token?: string;
  result = undefined;
  async loadUserByToken(
    params: LoadFacebookUserByTokenApi.Params
  ): Promise<LoadFacebookUserByTokenApi.Result> {
    this.token = params.token;
    return this.result;
  }
}
describe("FacebookAuthentication", () => {
  it("", async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiSpy();
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
    await sut.perform({ token: "any_token" });

    expect(loadFacebookUserByTokenApi.token).toBe("any_token");
  });
  it("", async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiSpy();
    loadFacebookUserByTokenApi.result = undefined;
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
