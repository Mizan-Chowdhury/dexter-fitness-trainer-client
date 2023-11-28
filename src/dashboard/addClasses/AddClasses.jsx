import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const AddClasses = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const image = { image: data.image[0] };

    axiosPublic
      .post(image_host_api, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const newClass = {
          class_name: data.name,
          description: data.description,
          benefits: data.benefits,
          single_class_price: parseInt(data.single_class_price),
          pack_class_price: parseInt(data.pack_class_price),
          membership_price: parseInt(data.membership_price),
          personal_training_price: parseInt(data.personal_training_price),
          email: user.email,
          image: res?.data?.data?.display_url,
        };
        console.log(newClass);
        if (res.data.success) {
          axiosSecure.post("/classes", newClass).then((res) => {
            console.log(res);
            toast.success("Successfully added.");
            reset();
          });
        }
      });
  };

  return (
    <div className="lg:px-10 px-2">
      <div>
        <SectionTitle>Add Class</SectionTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-lg">
              Add Description*
            </span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="textarea textarea-bordered"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p className="text-red-700"> description is required.</p>
          )}
        </div>

        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Benefits*</span>
            </label>
            <input
              {...register("benefits", { required: true })}
              type="text"
              placeholder="Benefits"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-700">Benefits is required.</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Class name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Class name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-700">Class name is required.</p>
            )}
          </div>
        </div>

        <div className="md:flex items-center gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">
                Single class price per session*
              </span>
            </label>
            <input
              {...register("single_class_price", {
                pattern: /\d+/,
                required: true,
              })}
              type="text"
              placeholder="price"
              className="input input-bordered w-full"
            />
            {errors.single_class_price && (
              <p className="text-red-700">
                Please enter number for price or price is required.
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">
                5-Class pack price*
              </span>
            </label>
            <input
              {...register("pack_class_price", {
                pattern: /\d+/,
                required: true,
              })}
              type="text"
              placeholder="price"
              className="input input-bordered w-full"
            />
            {errors.pack_class_price && (
              <p className="text-red-700">
                Please enter number for price or price is required.
              </p>
            )}
          </div>

          {/* <div className="w-full">
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
            </div> */}
        </div>

        <div className="md:flex gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">
                Unlimited monthly membership price*
              </span>
            </label>
            <input
              {...register("membership_price", {
                pattern: /\d+/,
                required: true,
              })}
              type="text"
              placeholder="price"
              className="input input-bordered w-full"
            />
            {errors.membership_price && (
              <p className="text-red-700">
                Please enter number for price or price is required.
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">
                Personal training Session per hour*
              </span>
            </label>
            <input
              {...register("personal_training_price", {
                pattern: /\d+/,
                required: true,
              })}
              type="text"
              placeholder="price"
              className="input input-bordered w-full"
            />
            {errors.personal_training_price && (
              <p className="text-red-700">
                Please enter number for price or price is required.
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
                Upload photo*
              </span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-700"> Image is required.</p>
            )}
          </div>
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
  );
};

export default AddClasses;
