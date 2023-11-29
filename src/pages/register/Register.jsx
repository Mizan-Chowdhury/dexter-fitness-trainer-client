import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, updateUser } = useAuthContext();
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, password, email, photo);

    if (!/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$/.test(password)) {
      setError(
        "Error: Your password needs to be longer and contain a capital letter and special character."
      );
    } else {
      createUser(email, password)
        .then((res) => {
          console.log(res);
          updateUser(name, photo)
            .then((res) => {
              console.log(res);
              axiosPublic
                .post("/users", { email, name, role: "member" })
                .then((res) => {
                  console.log(res.data);
                  toast.success("Successfully registered.");
                  navigate(location?.state ? location.state : "/");
                  setError("");
                  form.reset();
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dexter Fitness - Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="">
        <div className="card max-w-md mx-auto shadow-2xl bg-base-100 my-32">
          <h1 className="text-5xl font-bold text-center mt-5 text-[#A8CA73]">
            Register now!
          </h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-md font-bold">Full name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-md font-bold">Photo URL</span>
              </label>
              <input
                type="photo"
                name="photo"
                placeholder="Your photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-md font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-md font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <p className="text-red-600">{error}</p>
            <div className="form-control">
              <button className="btn bg-[#A8CA73] font-bold">Register</button>
            </div>
            <p className=" text-center">
              Already have an account? Please{" "}
              <Link
                className="text-[#A8CA73] font-bold underline"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
