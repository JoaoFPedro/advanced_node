/* eslint-disable comma-dangle */
import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "../apis/facebook";
import {
  CreateUserAccountRepository,
  LoadUserAccountRepository,
} from "../repos/user-account";

export class FacebookAuthenticationService {
  constructor(
    private readonly LoadFacebookUserByTokenApi: LoadFacebookUserByTokenApi,
    private readonly LoadFacebookUserAccountRepo: LoadUserAccountRepository,
    private readonly CreateFacebookUserAccountRepo: CreateUserAccountRepository
  ) {}

  async perform(
    params: LoadFacebookUserByTokenApi.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.LoadFacebookUserByTokenApi.loadUserByToken(
      params
    );
    if (fbData !== undefined) {
      await this.LoadFacebookUserAccountRepo.load({ email: fbData.email });
    }
    await this.CreateFacebookUserAccountRepo.createFromFacebook({
      email: "any_email",
      name: "any_name",
      facebookId: "any_facebookId",
    });

    return new AuthenticationError();
  }
}
