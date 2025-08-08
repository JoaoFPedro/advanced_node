import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "../apis/facebook";

export class FacebookAuthenticationService {
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
