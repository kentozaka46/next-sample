import { fetcher } from "../../utils";
import { ApiContext, User } from "types/data";

export type SigninParams = {
  username: string;
  password: string;
};

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param param パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/auth/signin`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
};

export default signin;
