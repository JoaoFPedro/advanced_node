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
    const fbData = await this.LoadFacebookUserByTokenApi.loadUserByToken(
      params
    );
    if (fbData !== undefined) {
      await this.LoadFacebookUserAccountRepo.load({ email: fbData.email });
    }

    return new AuthenticationError();
  }
}
