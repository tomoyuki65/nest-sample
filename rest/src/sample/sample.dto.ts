// リクエストパラメータやレスポンスの型を定義
export interface GetSampleResponse {
  id: number;
  text: string;
}

export interface PostSampleRequestBody {
  text: string;
}

export interface PostSampleResponse {
  upperText: string;
  lowerText: string;
  textLength: number;
}
