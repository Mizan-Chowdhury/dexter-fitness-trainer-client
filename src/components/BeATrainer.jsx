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
  const { register, handleSubmit, reset } = useForm();
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
          age: data.age,
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
            if (res.data) {
              toast.success("Menu successfully added.");
              reset();
            }
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
                {...register("name")}
                type="text"
                placeholder="Full name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Your age*</span>
              </label>
              <input
                {...register("age")}
                type="text"
                placeholder="Your age"
                className="input input-bordered w-full"
              />
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
                {...register("experience")}
                type="text"
                placeholder="Experience"
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">Skills*</span>
              </label>
              <div className="md:flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text font-semibold">
                      Teaching Knowledge
                    </span>
                    <input
                      {...register("teaching")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text font-semibold">
                      Fitness Knowledge
                    </span>
                    <input
                      {...register("fitness")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text font-semibold">
                      Nutritional Knowledge
                    </span>
                    <input
                      {...register("nutritional")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text font-semibold">
                      Motivational Skills
                    </span>
                    <input
                      {...register("motivational")}
                      type="checkbox"
                      className="checkbox"
                    />
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
                {...register("week_time")}
                type="text"
                placeholder="Available Time in a week"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Your available Time in a day*
                </span>
              </label>
              <input
                {...register("day_time")}
                type="text"
                placeholder="Available Time in a day"
                className="input input-bordered w-full"
              />
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
                {...register("image")}
                type="file"
                className="file-input w-full max-w-xs"
              />
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
