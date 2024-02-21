/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "cooper-std": ["Cooper Std", "sans"],
      },
      colors: {
        primary: {
          200: "#FEF1EE",
          800: "#381914",
        },
        orange: {
          500: "#F76F59",
        },
      },
    },
  },
  plugins: [],
};
/* 

 {
        _id: '65d5e7c319f953d5054694f0',
        title: 'Anim dolorem dolorem',
        description: 'Modi sunt sed dolore',
        creatorId: '65d548bf4d280ad2eda49f50',
        creatorName: 'Isaac',
        companyName: 'Dexnis',
        location: 'Iure rem et esse al',
        numOfDays: 25,
        price: 258,
        maxCapacity: 87,
        regMembers: [],
        numOfRegMembers: 0,
        tags: [],
        tourImagesUrl: [],
        state: 'draft',
        startDate: '1994-06-21T00:00:00.000Z',
        endDate: '2015-04-15T00:00:00.000Z',
        itinerary: [],
        createdAt: '2024-02-21T12:08:35.931Z',
        updatedAt: '2024-02-21T12:08:35.931Z',
        __v: 0
*/