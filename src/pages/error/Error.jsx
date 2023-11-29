import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/1r1fgGm/error-6984855-1280.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl font-bold">Oops!</h1>
          <p className="mb-5 text-xl">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-xl mb-5">{error.statusText || error.message}</p>
          <Link className="btn btn-sm" to={"/"}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
