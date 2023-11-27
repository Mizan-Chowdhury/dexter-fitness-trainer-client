import { useForm } from "react-hook-form";
import SectionTitle from "../shared/SectionTitle";
import useAuthContext from "../hooks/useAuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const BeATrainer = () => {
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

    axiosPublic
      .post(image_host_api, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const newTrainer = {
          name: data.name,
          age: parseInt(data.age),
          weekTime: parseInt(data.week_time),
          dayTime: parseInt(data.day_time),
          email: user.email,
          image: res?.data?.data?.display_url,
          experience: data.experience,
          skills: [
            data.teaching && "Teaching Knowledge",
            data.nutritional && "Nutritional Knowledge",
            data.fitness && "Fitness Knowledge",
            data.motivational && "Motivational Skill",
          ],
        };
        console.log(newTrainer);
        if (res.data.success) {
          axiosSecure.post("/newTrainers", newTrainer).then((res) => {
            console.log(res);
            toast.success("Successfully applied.");
            reset();
          });
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto py-36 px-2">
      <div>
        <SectionTitle>Be Our Trainer</SectionTitle>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Full name*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-700">Full name is required.</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Your age*</span>
              </label>
              <input
                {...register("age", { pattern: /\d+/ })}
                type="text"
                placeholder="Your age"
                className="input input-bordered w-full"
              />
              {errors.age && (
                <p className="text-red-700">Please enter number for age.</p>
              )}
            </div>
          </div>

          <div className="md:flex items-center gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Experience year*
                </span>
              </label>
              <input
                {...register("experience", { required: true })}
                type="text"
                placeholder="Experience"
                className="input input-bordered w-full"
              />
              {errors.experience && (
                <p className="text-red-700">Experience is required.</p>
              )}
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Skills*</span>
              </label>
              <div className="md:flex gap-2 space-y-2 md:space-y-0">
                <div className="form-control">
                  <label className="flex items-center">
                    <input
                      {...register("teaching")}
                      type="checkbox"
                      className="checkbox mr-1"
                    />
                    <span className="label-text font-semibold">
                      Teaching Knowledge
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="flex items-center">
                    <input
                      {...register("fitness")}
                      type="checkbox"
                      className="checkbox mr-1"
                    />
                    <span className="label-text font-semibold">
                      Fitness Knowledge
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="flex items-center">
                    <input
                      {...register("nutritional")}
                      type="checkbox"
                      className="checkbox mr-1"
                    />
                    <span className="label-text font-semibold">
                      Nutritional Knowledge
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="flex items-center">
                    <input
                      {...register("motivational")}
                      type="checkbox"
                      className="checkbox mr-1"
                    />
                    <span className="label-text font-semibold">
                      Motivational Skills
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Your available Time in a week*
                </span>
              </label>
              <input
                {...register("week_time", { required: true })}
                type="text"
                placeholder="Available Time in a week"
                className="input input-bordered w-full"
              />
              {errors.week_time && (
                <p className="text-red-700">
                  {" "}
                  Available week time is required.
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Your available Time in a day*
                </span>
              </label>
              <input
                {...register("day_time",{ required: true })}
                type="text"
                placeholder="Available Time in a day"
                className="input input-bordered w-full"
              />
              {errors.day_time && (
                <p className="text-red-700">
                  {" "}
                  Available week time is required.
                </p>
              )}
            </div>
          </div>

          <div className="md:flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Your email address*
                </span>
              </label>
              <input
                defaultValue={user?.email}
                readOnly
                {...register("email")}
                type="email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Upload your photo*
                </span>
              </label>
              <input
                {...register("image",{ required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
              {errors.week_time && (
                <p className="text-red-700">
                  {" "}
                  Available week time is required.
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <input
              className="btn text-white mt-10 bg-[#2B3440] px-10"
              type="submit"
              value="Apply"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeATrainer;
