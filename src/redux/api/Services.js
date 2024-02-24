import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GALLI_BASE_URL } from "../../utils/constants";

export const Services = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: GALLI_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.authToken.token;
      // console.log(token);
      headers.set("Content-Type", `application/json`);
      headers.set("Accept", `application/json`);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "Product",
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getTourRegMembers: builder.query({
      query: () => ({
        url: "/creators/tours/members",
        method: "GET",
      }),
    }),
    createTour: builder.mutation({
      query: (body) => ({
        url: "/creators/tours",
        method: "POST",
        body,
      }),
      // transformResponse: (response, meta, arg) => response,
    }),
    getCreatorProfile: builder.query({
      query: () => ({
        url: "/creators/profile",
        method: "GET",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
    }),
    updateCreatorProfile: builder.mutation({
      query: (body) => ({
        url: "/creators/profile",
        method: "PATCH",
        body,
      }),
    }),
    addItenery: builder.mutation({
      query: ({ tour_id, data }) => ({
        url: `/creators/tours/${tour_id}/itinerary`,
        method: "POST",
        body: data,
      }),
    }),
    uploadTourImages: builder.mutation({
      query: (formData) => ({
        url: `/creators/tours/images`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    deleteImage: builder.mutation({
      query: (body) => ({
        url: `/creators/tours/images`,
        method: "DELETE",
        body,
      }),
    }),
    deleteItenery: builder.mutation({
      query: ({ tour_id, itenery_id }) => ({
        url: `/creators/tours/${tour_id}/itinerary/${itenery_id}`,
        method: "DELETE",
      }),
    }),
    userJoinTour: builder.mutation({
      query: ({ id }) => ({
        url: `/users/tours/${id}/join`,
        method: "POST",
      }),
    }),
    updateTour: builder.mutation({
      query: ({ data, tour_id }) => ({
        url: `/creators/tours/${tour_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCreatorTours: builder.query({
      query: () => ({
        url: `/creators/tours`,
        method: "GET",
      }),
    }),
    getSingleCreatorTour: builder.query({
      query: ({ id }) => ({
        url: `/creators/tours/${id}`,
        method: "GET",
      }),
    }),
    getSinglePublicTour: builder.query({
      query: ({ id }) => ({
        url: `/tours/${id}`,
        method: "GET",
      }),
    }),
    getUsersJoinedTours: builder.query({
      query: () => ({
        url: `/users/tours/?sort=-createdAt`,
        method: "GET",
        
      }),
    }),
    getAllItenery: builder.query({
      query: ({ tour_id }) => ({
        url: `/creators/tours/${tour_id}/itinerary`,
        method: "GET",
      }),
    }),
    getAllPublicTours: builder.query({
      query: () => ({
        url: `/tours?state=published`,
        method: "GET",
      }),
    }),
    exampleuse: builder.query({
      query: (params) => ({
        url: `/tours?state=${params.state}&sort=${params.price}`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetTourRegMembersQuery,
  useCreateTourMutation,
  useGetCreatorProfileQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateCreatorProfileMutation,
  useGetCreatorToursQuery,
  useGetSingleCreatorTourQuery,
  useLazyGetAllPublicToursQuery,
  useGetSinglePublicTourQuery,
  useGetUsersJoinedToursQuery,
  useUploadTourImagesMutation,
  useAddIteneryMutation,
  useLazyGetAllIteneryQuery,
  useDeleteIteneryMutation,
  useUserJoinTourMutation,
  useUpdateTourMutation,
  useDeleteImageMutation,
  useLazyGetUsersJoinedToursQuery,
  // useGetCategoriesQuery,
} = Services;
