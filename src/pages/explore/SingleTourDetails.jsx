import { Carousel } from "react-responsive-carousel";
import Footer from "../../components/footer";
import GalliHeader from "../../components/header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { useGetSinglePublicTourQuery } from "../../redux/api/Services";
import FullPageLoader from "../../components/FullPageLoader";
import { formatDate, formatPrice } from "../../utils/Formats";

const SingleTourDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, error } = useGetSinglePublicTourQuery({ id });

  console.log(data);
  console.log(error);
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
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-[400px] shadow-lg mb-2 bg-slate-600 rounded-lg overflow-hidden "
                  >
                    <img
                      src={`/assets/images/tour${item}.jpg`}
                      className="object-cover w-full h-full"
                      alt=""
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
                    Starting at ${formatPrice(data?.data?.tour?.price)}
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

                <button className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white">
                  Join Tour
                </button>
              </div>
            </div>
          </div>
          <div className=" justify-center item-center mt-20 hidden">
            <button className="py-3 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white">
              Book Now
            </button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SingleTourDetails;
