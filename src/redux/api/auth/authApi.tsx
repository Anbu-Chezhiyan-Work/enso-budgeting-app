import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../database/firebase";
import { setUser, clearUser } from "../../features/auth/authSlice";
import type { FirebaseError } from "firebase/app";

interface AuthUser {
  uid: string;
  email: string | null;
  accessToken: string | null;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          const userCred = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await userCred.user.getIdToken();
          return {
            data: {
              uid: userCred.user.uid,
              email: userCred.user.email,
              accessToken: token,
            },
          };
        } catch (err: unknown) {
          const error = err as FirebaseError;
          return { error: { status: error.code, data: error.message } };
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          // error handled automatically
        }
      },
    }),

    signup: builder.mutation<AuthUser, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await userCred.user.getIdToken();
          return {
            data: {
              uid: userCred.user.uid,
              email: userCred.user.email,
              accessToken: token,
            },
          };
        } catch (err: unknown) {
          const error = err as FirebaseError;
          return { error: { status: error.code, data: error.message } };
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          // handled
        }
      },
    }),

    logout: builder.mutation<void, void>({
      async queryFn() {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (err: unknown) {
          const error = err as FirebaseError;
          return { error: { status: error.code, data: error.message } };
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch {
          // handled
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
