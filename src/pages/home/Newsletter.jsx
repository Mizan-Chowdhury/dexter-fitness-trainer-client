import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Newsletter = () => {
    const axiosPublic = useAxiosPublic();

    const handleSubscribe = (e) =>{
        e.preventDefault();
        const form =  e.target;
        const newSubscriber = {
          name : form.name.value,
          email : form.email.value
        }
        console.log(newSubscriber)
        axiosPublic.post('/subscribers', newSubscriber)
        .then(res=>{
          console.log(res.data);
            toast.success("Subscribe done.");
            form.reset();
        })
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
              className="input input-bordered w-full bg-zinc-900 rounded-full"
            />
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Your email"
              className="input input-bordered w-full bg-zinc-900 rounded-full"
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
