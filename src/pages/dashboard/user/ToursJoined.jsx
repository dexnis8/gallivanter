/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { formatDate, formatPrice } from "../../../utils/Formats";
import { useGetUsersJoinedToursQuery } from "../../../redux/api/Services";
import { ClipLoader } from "react-spinners";

// import { TourCard } from "../../explore/Tours";
function TourCard({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/explore/tour/${data?._id}`)}
        className="w-full mx-auto bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
      >
        {/* Image */}
        <img
          src="/assets/images/tour1.jpg"
          alt="Card Image"
          className="w-full h-40 object-cover object-center"
        />

        {/* Card Body */}
        <div className="p-4">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{data?.title}</h2>

          {/* Date */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              ></path>
            </svg>
            {formatDate(data?.startDate)} - {formatDate(data?.startDate)}
          </p>

          {/* Location */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11l5-8L17 11H7zm0 0v9a2 2 0 002 2h6a2 2 0 002-2v-9m-2 0h4"
              ></path>
            </svg>
            Location: {data?.location}
          </p>

          {/* Number of Guests */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7a2 2 0 012-2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm10-4a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7z"
              ></path>
            </svg>
            Number of Guests: {data?.numOfRegMembers}
          </p>

          {/* Price Button */}
          <button className="text-orange-500 text-lg font-bold  py-2 rounded-full transition-colors">
            Starting at ${formatPrice(data?.price)}
          </button>
        </div>
      </div>
    </>
  );
}

export const ToursJoined = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUsersJoinedToursQuery();

  console.log(data);
  console.log(error);

  return (
    <>
      <div className="tour-cards mt-10 grid grid-cols-3 gap-5">
        {isLoading ? (
          <ClipLoader />
        ) : (
          <>
            {data?.tours.map((tour) => (
              <TourCard key={tour._id} data={tour} />
            ))}
          </>
        )}

        {data?.tours.length === 0 && (
          <>
            <div className="text-center col-span-3">
              {" "}
              <p className="text-base text-gray-500 font-semibold">
                You haven't joined any tour. Explore and join tours to get
                started.
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
              >
                Explore Tours
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
