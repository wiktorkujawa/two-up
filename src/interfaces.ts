interface IResponse {
  id: number,
  body: string
}
export interface IPost extends IResponse {
  title: string,
  userId: number,
}
export interface IComment extends IResponse {
  postId: number
  email: string
  name: string
}

export interface IPosts {
  prev?: IPost,
  current?: IPost,
  next?: IPost
}