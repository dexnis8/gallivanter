/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ClipLoader } from "react-spinners";
import EditIcon from "../../../components/icons/EditIcon";
import Eyes from "../../../components/icons/Eyes";
import { useGetCreatorToursQuery } from "../../../redux/api/Services";
import { useNavigate } from "react-router-dom";

const TourCard = ({ data, base_url = "/view-creator-tour/" }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative cursor-pointer group overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <img
          src={data?.tourImagesData[0]?.url}
          // src={data?.tourImagesUrl[0]}
          alt={data?.tourImagesData[0]?._id}
          className="object-cover w-full h-64 transition-opacity duration-300 group-hover:opacity-75"
        />

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-lg font-semibold">{data?.title}</h2>
          <p className="text-sm">{data?.decription}</p>
          <p className="text-sm text-orange-500 font-semibold">
            {data?.numOfRegMembers} joined
          </p>
          <p className="text-sm text-white capitalize font-semibold">
            Status: {data?.state}
          </p>
        </div>

        <div className="absolute inset-0 flex gap-2 m-3 items-start justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          {/* <!-- Eye Icon --> */}

          <span onClick={() => navigate(`${base_url}${data?._id}`)}>
            <Eyes />
          </span>

          {/* <!-- Edit Icon --> */}

          <span onClick={() => navigate(`/dashboard/edit-tour/${data?._id}`)}>
            <EditIcon />
          </span>
        </div>
      </div>
    </>
  );
};

const CreatedTours = () => {
  const { data, isLoading, error } = useGetCreatorToursQuery();

  console.log(data?.data?.tours);
  console.log(error);
  return (
    <>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data?.data?.tours?.map((tour, idx) => (
            <TourCard key={idx} data={tour} />
          ))}
        </div>
      )}
    </>
  );
};

export default CreatedTours;
