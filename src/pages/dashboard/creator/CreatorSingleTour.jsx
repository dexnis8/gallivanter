/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import GalliHeader from "../../../components/header";
import { useGetSingleCreatorTourQuery } from "../../../redux/api/Services";
import { formatDate } from "../../../utils/Formats";
import FullPageLoader from "../../../components/FullPageLoader";
import Footer from "../../../components/footer";
import { IteneryCard } from "./EditTour";

const CreatorSingleTour = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, error } = useGetSingleCreatorTourQuery({ id });

  console.log(data);
  // console.log(data?.data?.tour?.itinerary);
  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div>
          <GalliHeader />
          <div className="max-w-[1000px] grid grid-cols-10 gap-8 p-5 bg-wite rounded-lg shadow-lg mx-auto mt-10 border">
            <div className=" col-span-6 overflow-hidden rounded-lg">
              <Carousel
                autoPlay
                showArrows
                swipeable={true}
                infiniteLoop
                useKeyboardArrows
                showThumbs={true}
                emulateTouch
                autoFocus
                width={"100%"}
                stopOnHover={false}
                animationHandler="fade"
              >
                {data?.data?.tour?.tourImagesData?.map((item) => (
                  <div
                    key={item._id}
                    className="h-[400px] shadow-lg mb-2 bg-slate-600 rounded-lg overflow-hidden "
                  >
                    <img
                      src={item.url}
                      className="object-cover w-full h-full"
                      alt={item._id}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col mt-5 mb-5">
                {/* <div className="text-left flex flex-col gap-3">
                  <h2 className="text-2xl font-bold">
                    {data?.data?.tour?.title}
                  </h2>
                  <span className="text-xl   font-medium text-primary-800 ">
                    Starting at ${data?.data?.tour?.price}
                  </span>
                </div> */}
              </div>

              <div>
                <h3 className="font-semibold text-lg">Trip Details</h3>
                <div className="flex flex-col gap-2 mt-3 text-lg">
                  <p className="font-semibold text-gray-500">
                    ID:{" "}
                    <span className="font-normal">{data?.data?.tour?._id}</span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Title:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.title}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Price:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.price}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Date:{" "}
                    <span className="font-normal">
                      {formatDate(data?.data?.tour?.startDate)} -{" "}
                      {formatDate(data?.data?.tour?.endDate)}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Location:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.location}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Creator:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.companyName}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Maximum capacity:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.maxCapacity}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Registered members:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.numOfRegMembers}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Description:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.description}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/dashboard/edit-tour/${id}`)}
                  className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          {/* Itenery */}
          <div className="px-10 mt-10 py-5 rounded-lg shadow-md max-w-[1000px] mx-auto bg-white border ">
            <h3 className="text-xl font-bold mb-3">Trip Itinerary</h3>
            <p className="text-sm text-gray-500 mb-4  sm:w-1/2">
              Show your itinerary to your guests. With this , guests can know
              what to expect and how much fun it'll be.
            </p>

            <div className="iteneries grid gap-5 grid-cols-3">
              {/* Map through iteneries here */}
              {data?.data?.tour?.itinerary?.map((item, index) => (
                <IteneryCard key={index} data={item} showDeleteBtn={false} />
              ))}

              {/* <div className="flex flex-col items-center rounded-lg border border-dashed py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              

                <input
                  type="button"
                  value="Add"
                  onClick={handleOpen}
                  className="mt-2 bg-orange-500 text-white hover:opacity-75 px-7 text-sm font-bold  py-2 rounded-md"
                />
              </div> */}
            </div>
          </div>
          {/* Itenery stops here */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CreatorSingleTour;
