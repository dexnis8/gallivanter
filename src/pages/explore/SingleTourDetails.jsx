/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel } from "react-responsive-carousel";
import Footer from "../../components/footer";
import GalliHeader from "../../components/header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSinglePublicTourQuery,
  useUserJoinTourMutation,
} from "../../redux/api/Services";
import FullPageLoader from "../../components/FullPageLoader";
import { formatDate, formatPrice } from "../../utils/Formats";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IteneryCard } from "../dashboard/creator/EditTour";
import { useDispatch } from "react-redux";
import { refetchUserJoinedTours } from "../../redux/slices/authToken";

const SingleTourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetSinglePublicTourQuery({ id });
  const [
    userJoinTour,
    { data: status, isLoading: joining, error: error_joining },
  ] = useUserJoinTourMutation();
  console.log(data);
  console.log(error);

  const handleJoinTour = () => {
    userJoinTour({ id });
  };

  useEffect(() => {
    console.log(status);
    console.log(error_joining);
    if (status?.status === "success") {
      // toast.success(data.message);
      toast.success(
        "Tour joined successfully! Kindly check your mail for payment link"
      );
      navigate("/user/joined-tours");
      dispatch(refetchUserJoinedTours());
    }
    if (status?.status === "error") {
      toast.error(status?.message);
    }
    if (error_joining) {
      toast.error(error_joining?.data + ": " + "Please login");
      navigate("/auth/sign-in/user");
    }
  }, [status, error_joining]);
  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div>
          <GalliHeader />
          <h1 className="p-5 md:hidden text-2xl font-bold">Tour Details</h1>
          <div className="max-w-[1000px] md:grid grid-cols-10 gap-8 p-5 bg-wite rounded-lg shadow-lg mx-auto sm:mt-10 border">
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
                    className="h-[200px] sm:h-[400px] shadow-lg mb-2 bg-slate-600 rounded-lg overflow-hidden "
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
                <div className="text-left flex flex-col gap-3">
                  <h2 className="text-2xl font-bold">
                    {data?.data?.tour?.title}
                  </h2>
                  <span className="text-xl   font-semibold text-primary-800 ">
                    Starting at{" "}
                    {data?.data?.tour?.currency === "NGN" ? "₦" : "$"}
                    {formatPrice(data?.data?.tour?.price)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Trip Details</h3>
                <div className="flex flex-col gap-2 mt-3 text-lg">
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
                      {data?.data?.tour?.companyName || "NA"}
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
                <div className="my-8">
                  <a
                    href="https://paystack.com/pay/u10wmz06tm"
                    className="py-3 my-8 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
                  >
                    Join Tour
                  </a>
                </div>
                {/* <button
                  // onClick={handleJoinTour}
                  className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
                >
                  {joining ? (
                    <ClipLoader size={16} color="#fff" />
                  ) : (
                  'Join Tour'
                  )}
                </button> */}
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-10 mt-10 py-5 rounded-lg shadow-md max-w-[1000px] mx-auto bg-white border ">
            <h3 className="text-xl font-bold mb-3">Trip Itinerary</h3>
            <p className="text-sm text-gray-500 mb-4  sm:w-1/2">
              Show your itinerary to your guests. With this , guests can know
              what to expect and how much fun it'll be.
            </p>

            <div className="iteneries grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Map through iteneries here */}
              {data?.data?.tour?.itinerary?.map((item, index) => (
                <IteneryCard key={index} data={item} showDeleteBtn={false} />
              ))}
            </div>
          </div>

          <div className="flex justify-center item-center mt-20 ">
            <button
              onClick={handleJoinTour}
              className="py-3 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
            >
              {joining ? <ClipLoader size={16} color="#fff" /> : " Join Tour"}
            </button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SingleTourDetails;
