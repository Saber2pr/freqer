import {
  ForgotPwdParams,
  ForgotPwdResponse,
  GerUserInfoResponse,
  LoginUserParams,
  LoginUserResponse,
  RegisterUserParams,
  RegisterUserResponse,
  ResetPwdParams,
  ResetPwdResponse,
} from './interface'
import { ApiUrls, request } from './request'

export const getUserInfo = async () => {
  const res = await request.get<GerUserInfoResponse>(ApiUrls.me)

  return res.data
}

export const registerUser = async (body: RegisterUserParams) => {
  const res = await request.post<RegisterUserResponse>(ApiUrls.register, body)

  return res.data
}

export const loginUser = async (body: LoginUserParams) => {
  const res = await request.post<LoginUserResponse>(ApiUrls.login, body)

  return res.data
}

export const forgotPwd = async (body: ForgotPwdParams) => {
  const res = await request.post<ForgotPwdResponse>(ApiUrls.forgot, body)

  return res.data
}

export const resetPwd = async (body: ResetPwdParams) => {
  const res = await request.post<ResetPwdResponse>(ApiUrls.reset, body)

  return res.data
}
