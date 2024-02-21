import GalliHeader from ".././components/header";
import { sections } from ".././utils/section_data";
// import { userCards } from "./utils/testimonial_data";
// import UserCard from "./components/user_card";
import Footer from ".././components/footer";
import OtherSection from ".././components/other_section";
import { otherSections } from ".././utils/othersection_data";
import { useRef, useState } from "react";
import { Alert, Input } from "antd";
import { handleSubmit } from ".././utils/firebase";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Carousel from "./components/carousel";

const LandingPage = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);

  const homeRef = useRef(null);
  const howItWorksRef = useRef(null);
  const faqsRef = useRef(null);
  const signUpRef = useRef(null);

  const checkInput = userName !== "" && email !== "" && phone !== "" && role;

  const handleWaitlist = async () => {
    if (checkInput) {
      setLoading(true);
      const isSuccess = await handleSubmit(
        userName,
        email,
        phone,
        role,
        organization
      );
      if (isSuccess) {
        setLoading(false);
        setsuccess(true);
        console.log(isSuccess);
        setEmail("");
        setName("");
        setPhone("");
        setRole("");
        setOrganization("");
      }
    }

    if (!checkInput) {
      alert("Enter Valid details");
    }
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <GalliHeader
        scrollToHome={() =>
          homeRef.current.scrollIntoView({ behavior: "smooth" })
        }
        scrollToWorks={() =>
          howItWorksRef.current.scrollIntoView({ behavior: "smooth" })
        }
        scrollToFaqs={() =>
          faqsRef.current.scrollIntoView({ behavior: "smooth" })
        }
        scrollToSignUp={() =>
          signUpRef.current.scrollIntoView({ behavior: "smooth" })
        }
      />
      {/* Hero-Section */}
      <div ref={homeRef} className="w-full lg:flex justify-center pt-24">
        <div className=" lg:flex justify-between max-w-[1920px] ">
          <div className="mr-[16px] lg:ml-[160px] ml-[16px] mt-[64px] lg:mt-[120px] lg:w-1/2 ">
            {/* <p className="bg-[#FDE2DE] text-[rgb(247,111,89)] border border-[#F76F59] rounded-full w-fit px-4 py-1">
              Launching Soon
            </p> */}
            <p className="mt-8 text-[40px] lg:text-[56px] text-[#381914] font-extrabold leading-[46px] lg:leading-[68px] lg:w-full">
              Gallivanter: Where Adventure Meets Expertise, and Success Awaits
            </p>
            {/* <p className="text-[#222] mt-6  lg:w-2/3 lg:text-[18px] font-medium lg:leading-[21px] ">
              Embrace your inner explorer, guide with wisdom, and achieve
              triumph together with Gallivanter. Join us to create a legacy of
              adventure, guidance, and success in Nigeria.
            </p> */}
            <div
              className="bg-[#F76F59] hover:opacity-75 transition-all duration-300 cursor-pointer text-white px-6 py-3 rounded-full w-fit mt-12 "
              onClick={() => {
                scrollToSection(signUpRef);
              }}
            >
              Get Started
            </div>
          </div>
          <div className="lg:w-1/2 mx-[16px] place-content-end flex mt-12 h-fit mb-6">
            <img src="./assets/images/header.png" alt="" className="" />
          </div>
        </div>
      </div>

      <div ref={homeRef}>
        {otherSections.map((section, index) => (
          <OtherSection
            key={index}
            scrollFunction={() => {
              scrollToSection(signUpRef);
            }}
            {...section}
          />
        ))}
      </div>

      <div
        ref={howItWorksRef}
        className={"bg-[#FDE2DE] w-full lg:flex justify-center"}
      >
        <div className="w-full lg:flex justify-between max-w-[1920px] pt-24 lg:pt-32 items-center">
          <div className="pb-4 pd:mb-0 mx-[16px]  lg:ml-[160px] ">
            <p className="text-[rgb(247,111,89)] rounded-full ">
              {sections.title}
            </p>
            <p className="font-cooper-std mt-2 text-[40px] leading-[46px] lg:text-[56px]  font-extrabold text-[#381914] lg:leading-[64px]">
              {sections.subtitle}
            </p>
            <div className="lg:flex gap-4 mt-8 items-center">
              <div className="bg-[#ffdfda] p-2 rounded-lg">
                <img src={sections.images[1]} alt="" />
              </div>
              <div className="mt-4">
                <p className="font-semibold text-[#222] text-[18px] lg:text-[19px]">
                  {sections.description[0].title}
                </p>
                <p className="text-[#222] mt-1 leading-5 w-2/3 text-[16px] lg:text-[18px]">
                  {sections.description[0].description}
                </p>
              </div>
            </div>
            <div className="lg:flex gap-4 mt-8 items-center">
              <div className="bg-[#ffdfda] p-2 rounded-lg">
                <img src={sections.images[2]} alt="" />
              </div>
              <div className="mt-4">
                <p className="font-semibold text-[#222] text-[18px] lg:text-[19px]">
                  {sections.description[1].title}
                </p>
                <p className="text-[#222] mt-1 leading-5 w-2/3 text-[16px] lg:text-[18px]">
                  {sections.description[1].description}
                </p>
              </div>
            </div>
            <div className="lg:flex gap-4 mt-8 items-center mb-40">
              <div className="bg-[#ffdfda] p-2 rounded-lg">
                <img src={sections.images[3]} alt="" />
              </div>
              <div className="mt-4 ">
                <p className="font-semibold text-[#222] text-[18px] lg:text-[19px] ">
                  {sections.description[2].title}
                </p>
                <p className="text-[#222] mt-1 leading-5 w-2/3 text-[16px] lg:text-[18px]">
                  {sections.description[2].description}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src={sections.images[0]} alt="" />
          </div>
        </div>
      </div>

      {/* <div ref={faqsRef} className='mt-32 flex flex-col justify-center w-5/6 text-center mx-auto max-w-[1920px]'>
        <h2 className='mt-2 text-[#E36A5D] font-medium'>What People are saying?</h2>
        <h2 className='mt-2 text-[36px] font-bold text-[#381914]'>User Testimonials</h2>
        <h2 className='mt-2 w-2/3 mx-auto'>Fusce commodo metus nec massa malesuada, in congue ex sodales. Aliquam euismod, odio non dignissim lacinia,ipsum sem fermentum sapien, vel congue urna est sed libero. Proin id bibendum erat.</h2>
        <div className="lg:hidden">
          <Carousel userCards={userCards} />
        </div>
        <div className="hidden lg:block"><div className="grid grid-cols-4 mt-8">
          {userCards.map((user, index) => (
            <UserCard
              key={index}
              imageUrl={user.imageUrl}
              message={user.message}
              name={user.name}
              role={user.role}
            />
          ))}
        </div></div>
      </div> */}

      <div ref={signUpRef} className=" flex justify-center items-center">
        <div className="mx-[16px] lg:mx-[160px] my-[120px]">
          <h2 className="font-extrabold text-[54px] leading-[56px] text-center font-cooper-std">
            Sign up to get started
          </h2>
          {success && (
            <Alert
              className="mt-6"
              message="Thanks for signing up, we'll come back to you shortly."
              type="success"
            />
          )}
          {/* {success ? <div>Welcome to Gallivanter</div> : <div>Something went wrong</div>} */}
          <div className="mt-12">
            <div className=" gap-8">
              <div>
                <div className="mb-2 mt-4">
                  <label className="text-gray-500"> Name </label>
                </div>
                <Input
                  className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                  placeholder="Please enter your name"
                  value={userName}
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 mt-4">
                  <label className="text-gray-500"> Email </label>
                </div>
                <Input
                  className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                  placeholder="Please enter your email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className=" gap-8">
              <div>
                <div className="mb-2 mt-4">
                  <label className="text-gray-500"> Phone </label>
                </div>
                <Input
                  className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                  placeholder="Please enter your phone"
                  value={phone}
                  required={true}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 mt-4">
                  <label className="text-gray-500"> Role </label>
                </div>
                <Input
                  className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                  placeholder="What do you do?"
                  value={role}
                  required={true}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 mt-4">
                  <label className="text-gray-500"> Organization </label>
                </div>
                <Input
                  className="w-full h-[48px] hover:border-green-500 active:border-green-600"
                  placeholder="Where do you work?"
                  value={organization}
                  required={true}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-12">
            <div
              className="bg-[#F76F59] text-white px-12 py-3 rounded-full w-fit cursor-pointer"
              onClick={handleWaitlist}
            >
              {loading ? "Loading..." : "Sign Up"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
