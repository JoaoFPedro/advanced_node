/* eslint-disable comma-dangle */
import { FacebookAccount } from "@/domain/models";

describe("FacebookAccount", () => {
  it("should create with facebook data only", () => {
    const sut = new FacebookAccount({
      email: "any_fb_email",
      facebookId: "any_fb_id",
      name: "any_fb_name",
    });
    expect(sut).toEqual({
      email: "any_fb_email",
      facebookId: "any_fb_id",
      name: "any_fb_name",
    });
  });
  it("should update name if its empty", () => {
    const sut = new FacebookAccount(
      {
        email: "any_fb_email",
        facebookId: "any_fb_id",
        name: "any_fb_name",
      },
      {
        id: "any_id",
      }
    );
    expect(sut).toEqual({
      id: "any_id",
      email: "any_fb_email",
      facebookId: "any_fb_id",
      name: "any_fb_name",
    });
  });
  it("should not update name if its not empty", () => {
    const sut = new FacebookAccount(
      {
        email: "any_fb_email",
        facebookId: "any_fb_id",
        name: "any_fb_name",
      },
      {
        id: "any_id",
        name: "any_name",
      }
    );
    expect(sut).toEqual({
      id: "any_id",
      email: "any_fb_email",
      facebookId: "any_fb_id",
      name: "any_name",
    });
  });
});
