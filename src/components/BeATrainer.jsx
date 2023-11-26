import { useForm } from "react-hook-form";
import SectionTitle from "../shared/SectionTitle";
import useAuthContext from "../hooks/useAuthContext";

const BeATrainer = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuthContext();

  const onSubmit = (data) => {
    const newMenu = {
      name: data.name,
      age: data.age,
      email: data.email,
      skills: [
        data.teaching && "Teaching Knowledge",
        data.nutritional && "Nutritional Knowledge",
        data.fitness && "Fitness Knowledge",
        data.motivational && "Motivational Skill",
      ],
      experience: data.experience,

      //   image: res.data.data.display_url,
    };
    console.log(newMenu);
    // const image = { image: data.image[0] };
    // axiosPublic
    //   .post(image_host_api, image, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.success) {
    //       axiosSecure.post("/menu", newMenu).then((res) => {
    //         if (res.data) {
    //           toast.success("Menu successfully added.");
    //           reset();
    //         }
    //       });
    //     }
    //   });
  };

  return (
    <div className="max-w-7xl mx-auto py-36">
      <div>
        <SectionTitle>Be Our Trainer</SectionTitle>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
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

          <div className="flex gap-5">
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

          <div className="flex items-center gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Experience*
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
              <div className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Teaching Knowledge</span>
                    <input
                      {...register("teaching")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Fitness Knowledge</span>
                    <input
                      {...register("fitness")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Nutritional Knowledge</span>
                    <input
                      {...register("nutritional")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Motivational Skills</span>
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
          <div className="text-center mt-4">
            <input className="btn" type="submit" value="Apply" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeATrainer;
