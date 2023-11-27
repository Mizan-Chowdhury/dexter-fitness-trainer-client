import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const AddForum = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuthContext();

  const onSubmit = (data) => {
    const image = { image: data.image[0] };
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Format the date and time
    const date = `${currentDay}-${
      currentMonth < 10 ? "0" : ""
    }${currentMonth}-${currentDay < 10 ? "0" : ""}${currentYear}`;
    const time = `${currentHour < 10 ? "0" : ""}${currentHour}:${
      currentMinute < 10 ? "0" : ""
    }${currentMinute}`;

    axiosPublic
      .post(image_host_api, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const newArticle = {
          heading: data.heading,
          email: user.email,
          image: res?.data?.data?.display_url,
          description: data.description,
          date: date,
          time: time,
        };
        console.log(newArticle);
        // if (res.data.success) {
        //   axiosSecure.post("/", newArticle).then((res) => {
        //     console.log(res);
        //     toast.success("Successfully applied.");
        //     reset();
        //   });
        // }
      });
  };

  return (
    <div className="px-10">
      <div>
        <SectionTitle>Add A Forum</SectionTitle>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Article heading*
                </span>
              </label>
              <input
                {...register("heading", { required: true })}
                type="text"
                placeholder="Article heading"
                className="input input-bordered w-full"
              />
              {errors.heading && (
                <p className="text-red-700">heading is required.</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Add photo*</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
              {errors.image && (
                <p className="text-red-700"> photo is required.</p>
              )}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">
                Article Description*
              </span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-700"> description is required.</p>
            )}
          </div>
          <div className="text-center">
            <input
              className="btn text-white mt-10 bg-[#2B3440] px-10"
              type="submit"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
