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
    getCreatorTours: builder.query({
      query: () => ({
        url: `/tours`,
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
        url: "/users/tours",
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
  // useGetCategoriesQuery,
} = Services;
/* 

{
      _id: '65d5ea120d2aef91409584b7',
      title: 'Est provident commo',
      description: 'Quis dolorem illo eu',
      creatorId: '65d548bf4d280ad2eda49f50',
      creatorName: 'Isaac',
      companyName: 'Dexnis',
      location: 'Suscipit aut ea earu',
      numOfDays: 13,
      price: 163,
      maxCapacity: 24,
      regMembers: [],
      numOfRegMembers: 0,
      tags: [],
      tourImagesUrl: [],
      state: 'draft',
      startDate: '1985-06-06T00:00:00.000Z',
      endDate: '1990-03-26T00:00:00.000Z',
      itinerary: [],
      createdAt: '2024-02-21T12:18:26.511Z',
      updatedAt: '2024-02-21T12:18:26.511Z'
    },
*/
