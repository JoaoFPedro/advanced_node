/* eslint-disable comma-dangle */
import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "@/data/contracts/apis/index";

import { FacebookAuthenticationService } from "@/data/contracts/services";
import { mock, MockProxy } from "jest-mock-extended";
import {
  CreateUserAccountRepository,
  LoadUserAccountRepository,
} from "@/data/contracts/repos";

describe("FacebookAuthentication Service", () => {
  let loadFacebookUserByTokenApi: MockProxy<LoadFacebookUserByTokenApi>;
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>;
  let createUserAccountRepo: MockProxy<CreateUserAccountRepository>;

  let sut: FacebookAuthenticationService;

  beforeEach(() => {
    loadFacebookUserByTokenApi = mock();
    loadUserAccountRepo = mock();
    createUserAccountRepo = mock();
    loadFacebookUserByTokenApi.loadUserByToken.mockResolvedValue({
      facebookId: "any_fb_id",
      name: "any_name",
      email: "any_email",
    });
    sut = new FacebookAuthenticationService(
      loadFacebookUserByTokenApi,
      loadUserAccountRepo,
      createUserAccountRepo
    );
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

  it("Should call LoadUserAccountRepo when FacebookApi returns data", async () => {
    await sut.perform({ token: "any_token" });

    expect(loadUserAccountRepo.load).toBeCalledWith({
      email: "any_email",
    });
    expect(loadUserAccountRepo.load).toBeCalledTimes(1);
  });
  it("Should call CreateUserAccountRepo when FacebookApi returns undefined", async () => {
    loadUserAccountRepo.load.mockResolvedValueOnce(undefined);
    await sut.perform({ token: "any_token" });

    expect(createUserAccountRepo.createFromFacebook).toHaveBeenCalledWith({
      email: "any_email",
      facebookId: "any_facebookId",
      name: "any_name",
    });
    expect(createUserAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1);
  });
});
