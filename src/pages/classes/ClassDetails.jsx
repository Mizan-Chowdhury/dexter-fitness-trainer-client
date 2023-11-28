import { Link, useParams } from "react-router-dom";
import useClasses from "./useClasses";
import SectionTitle from "../../shared/SectionTitle";
import { CiDiscount1 } from "react-icons/ci";

const ClassDetails = () => {
  const [classes, isLoading] = useClasses();
  const { id } = useParams();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const classDetails = classes.find((i) => i._id === id);
  console.log(classDetails);
  return (
    <div className="max-w-7xl mx-auto my-36">
      <div>
        <SectionTitle>Class Details</SectionTitle>
      </div>
      <div className="md:flex items-center gap-10">
        <img className="flex-1" src={classDetails.image} alt="" />
        <div className="flex-1 p-2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {classDetails.class_name}
          </h1>
          <p className="border-b-2 pb-5">{classDetails.description}</p>
          <p className="mt-2">
            <span className="font-bold">Benefits :</span>{" "}
            {classDetails.benefits}
          </p>
        </div>
      </div>
      <div className="border-y-2 py-5 my-10 flex items-center justify-center gap-2">
        <CiDiscount1 className="text-4xl"></CiDiscount1>
        <h1 className="font-semibold text-xl">
          Get the Disscount of -10% by inviting your friends.
        </h1>
      </div>
      <div className="max-w-3xl mx-auto px-2">
        <h1 className="text-center font-bold text-3xl">Packages Pricing</h1>
        <div className="border-black border p-3 md:p-10 mt-5">
          <div className="flex justify-between border-b border-black pb-4">
            <div>
              <p className="font-bold text-lg italic">Shower</p>
              <p className="text-sm">Cold and hot private showers.</p>
            </div>
            <p className="font-bold text-lg italic">Free</p>
          </div>
          <div className="flex justify-between border-b border-black py-4">
            <div>
              <p className="font-bold text-lg italic">Personal Training</p>
              <p className="text-sm">
                Well educated trainers are included in price of this package.
                Our range of courses include introductory course to help you get
                the taste of gym.
              </p>
            </div>
            <p className="font-bold text-lg italic">
              ${classDetails.personal_training_price}/hour
            </p>
          </div>
          <div className="flex justify-between border-b border-black py-4">
            <div>
              <p className="font-bold text-lg italic">Single Class</p>
            </div>
            <p className="font-bold text-lg italic">
              ${classDetails.single_class_price}/per session
            </p>
          </div>
          <div className="flex justify-between border-b border-black py-4">
            <div>
              <p className="font-bold text-lg italic">5-Class Pack</p>
            </div>
            <p className="font-bold text-lg italic">
              ${classDetails.pack_class_price} (Save 2$)
            </p>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="font-bold text-lg italic">
                Unlimited Monthly Membership
              </p>
            </div>
            <p className="font-bold text-lg italic">
              ${classDetails.membership_price} (Save 4$)
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <Link to={'/trainer'}>
          <button className="btn btn-outline">Join Now</button>
        </Link>
      </div>
    </div>
  );
};

export default ClassDetails;
