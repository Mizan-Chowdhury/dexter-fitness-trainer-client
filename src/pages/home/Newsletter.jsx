const Newsletter = () => {

    const handleSubscribe = (e) =>{

    }


  return (
    <div
      className="h-96 flex items-center justify-center bg-fixed"
      style={{
        backgroundImage: `url(https://i.ibb.co/VvH5xc0/exercising-body-art-bodybuilder-bodybuilding-men-in-black-hd-wallpaper-preview.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4">
        <h1 className="text-slate-200 text-3xl md:text-5xl font-bold mb-5">
          Find out latest news & offers
        </h1>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full bg-black"
            />
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Your email"
              className="input input-bordered w-full bg-black"
            />
          </div>
          <input
            className="btn rounded-full bg-[#9AC339] font-bold"
            type="submit"
            value="Subscribe"
          />
          {/* <input className="rounded-2xl btn" type="submit" name="" id="" /> */}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
