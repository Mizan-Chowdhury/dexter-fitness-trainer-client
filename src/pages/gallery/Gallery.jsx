import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosPublic
      .get(`/photos?limit=12&size=${page}`)
      .then((res) => {
        setPhotos([...photos, ...res.data.result]);
        setPage(page + 1);
        setCount(res.data.totalCount);
      });
    return res;
  };

  console.log(photos, count);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dexter Fitness - Gallery</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/42JBmt7/slide4.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-white">
          <div className="">
            <h1 className="mb-5 text-2xl md:text-5xl font-bold">
              Dexter Fitness | Gallery{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-20 px-4">
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchData}
          hasMore={photos.length < count}
          loader={
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <div className="skeleton h-24 md:h-64 rounded-md w-full "></div>
              <div className="skeleton h-24 md:h-64 rounded-md w-full"></div>
              <div className="skeleton h-24 md:h-64 rounded-md w-full"></div>
            </div>
          }
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((i) => (
              <div key={i._id}>
                <img
                  className="w-full h-24 md:h-64 rounded-md"
                  src={i.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Gallery;
