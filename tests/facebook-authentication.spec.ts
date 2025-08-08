/* eslint-disable comma-dangle */
import { AuthenticationError } from "@/domain/models";
import { FacebookAuthenticationService } from "../src/data/contracts/services";

// class LoadFacebookUserApiSpy implements LoadFacebookUserByTokenApi {
//   calls?: number;
//   token?: string;
//   result = undefined;
//   async loadUserByToken(
//     params: LoadFacebookUserByTokenApi.Params
//   ): Promise<LoadFacebookUserByTokenApi.Result> {
//     this.token = params.token;
//     this.calls = 0;
//     return this.result;
//   }
// }
describe("FacebookAuthentication", () => {
  it("", async () => {
    const loadFacebookUserByTokenApi = {
      loadUserByToken: jest.fn(),
    };
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
    await sut.perform({ token: "any_token" });

    expect(loadFacebookUserByTokenApi.loadUserByToken).toBeCalledWith({
      token: "any_token",
    });

    expect(loadFacebookUserByTokenApi.loadUserByToken).toBeCalledTimes(1);
  });
  it("", async () => {
    const loadFacebookUserByTokenApi = {
      loadUserByToken: jest.fn(),
    };
    loadFacebookUserByTokenApi.loadUserByToken.mockResolvedValueOnce(undefined);
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
