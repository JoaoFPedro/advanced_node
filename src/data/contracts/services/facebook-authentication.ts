import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "../apis/facebook";
import { LoadUserAccountRepository } from "../repos/user-account";

export class FacebookAuthenticationService {
  constructor(
    private readonly LoadFacebookUserByTokenApi: LoadFacebookUserByTokenApi,
    private readonly LoadFacebookUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform(
    params: LoadFacebookUserByTokenApi.Params
  ): Promise<AuthenticationError> {
    await this.LoadFacebookUserByTokenApi.loadUserByToken(params);
    await this.LoadFacebookUserAccountRepo.load({ email: "any_email" });

    return new AuthenticationError();
  }
}
