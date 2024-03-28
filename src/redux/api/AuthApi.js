import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GALLI_BASE_URL } from "../../utils/constants";

export const AuthApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: GALLI_BASE_URL,
    // credentials: "include",
    // mode: "no-cors",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.authToken.token;
      headers.set("Content-Type", `application/json`);
      headers.set("Accept", `application/json`);

      if (token) {
        headers.set("Authorization", `Bearer  ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "Auth",
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/creators/login",
        method: "POST",
        body,
      }),
    }),
    loginAsUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      // transformResponse: (response, meta, arg) => response,
    }),
    registerCreator: builder.mutation({
      query: (body) => ({
        url: "/creators/signup",
        method: "POST",
        body,
      }),
      // transformResponse: (response, meta, arg) => response,
    }),
    googleAuth: builder.query({
      query: () => ({
        url: "/auth/google",
        method: "GET",
        headers: {
          mode: "no-cors",
          // credentials: "include",
        },
      }),
    }),
    googleAuthCallback: builder.query({
      query: (params) => ({
        url: "/auth/google/callback",
        method: "GET",
        params,
      }),
    }),
    verifyEmail: builder.query({
      query: (body) => ({
        url: `/email/confirm`,
        method: "POST",
        body,
      }),
    }),
    resendVerificationMail: builder.mutation({
      query: (params) => ({
        url: `/email/verification/resend`,
        method: "POST",
        params,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/users/profile/forgotPassword",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/users/profile/resetPassword/:token",
        method: "POST",
        body,
      }),
    }),
    verifyResetLink: builder.query({
      query: (params) => ({
        url: `/link/password/reset/${params}`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useLoginAsUserMutation,
  useRegisterCreatorMutation,
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResendVerificationMailMutation,
  useVerifyEmailQuery,
  useResetPasswordMutation,
  useVerifyResetLinkQuery,
  useGoogleAuthCallbackQuery,
} = AuthApi;
