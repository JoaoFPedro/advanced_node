/* eslint-disable @typescript-eslint/indent */
/* eslint-disable comma-dangle */
import { AuthenticationError } from "@/domain/models";
import { LoadFacebookUserByTokenApi } from "../apis/facebook";
import {
  LoadUserAccountRepository,
  SaveUserAccountRepository,
} from "../repos/user-account";

export class FacebookAuthenticationService {
  constructor(
    private readonly LoadFacebookUserByTokenApi: LoadFacebookUserByTokenApi,
    private readonly LoadFacebookUserAccountRepo: LoadUserAccountRepository &
      SaveUserAccountRepository
  ) {}

  async perform(
    params: LoadFacebookUserByTokenApi.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.LoadFacebookUserByTokenApi.loadUserByToken(
      params
    );
    if (fbData !== undefined) {
      const accountData = await this.LoadFacebookUserAccountRepo.load({
        email: fbData.email,
      });
      await this.LoadFacebookUserAccountRepo.saveWithFacebook({
        name: accountData?.name ?? fbData.name,
        facebookId: fbData.facebookId,
        id: accountData?.id,
        email: fbData.email,
      });

      // await this.LoadFacebookUserAccountRepo.saveWithFacebook(fbData);
    }

    return new AuthenticationError();
  }
}
