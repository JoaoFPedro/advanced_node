/* eslint-disable comma-dangle */
import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "@/data/contracts/apis/index";

import { FacebookAuthenticationService } from "@/data/contracts/services";
import { mock, MockProxy } from "jest-mock-extended";

describe("FacebookAuthentication Service", () => {
  let loadFacebookUserByTokenApi: MockProxy<LoadFacebookUserByTokenApi>;
  let sut: FacebookAuthenticationService;

  beforeEach(() => {
    loadFacebookUserByTokenApi = mock();
    sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi);
  });
  it("Should call FacebookApi with correct params", async () => {
    await sut.perform({ token: "any_token" });

    expect(loadFacebookUserByTokenApi.loadUserByToken).toBeCalledWith({
      token: "any_token",
    });

    expect(loadFacebookUserByTokenApi.loadUserByToken).toBeCalledTimes(1);
  });
  it("Should return AuthenticationError when FacebookApi returns undefined", async () => {
    loadFacebookUserByTokenApi.loadUserByToken.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
