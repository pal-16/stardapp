interface GetTokenResponse {
  data: GetTokenResponseSuccess | GetTokenResponseFailure;
  code: number;
}

export interface GetTokenResponseSuccess {
  accessToken: string;
  walletPublicAddress: string;
  accessLevel: 'read' | 'write'
  nftId: string;
  iat: number;
  exp: number;
}

export interface GetTokenResponseFailure {
  errorCode: string;
  errorMessage?: string;
  errorUri?: string;
}

export default GetTokenResponse;
