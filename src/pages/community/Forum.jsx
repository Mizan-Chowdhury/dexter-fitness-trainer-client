import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import {
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineEye,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Forum = () => {
  const axiosSecure = useAxiosSecure();
  const { count } = useLoaderData();
  const [itemPerPage, setItemPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const numOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numOfPage).keys()];

  const handlePerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemPerPage(value);
    setCurrentPage(0);
  };

  const handlPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log(currentPage, itemPerPage);

  useEffect(() => {
    axiosSecure
      .get(`/articles?page=${currentPage}&size=${itemPerPage}`)
      .then((res) => {
        console.log(res);
        setArticles(res.data);
      });
  }, [axiosSecure, currentPage, itemPerPage]);

  const LikeDislikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
      setIsLiked(!isLiked);
    };

    return (
      <button className="btn btn-sm" onClick={handleClick}>
        {isLiked ? (
          'Unvote'
        ) : (
          'Vote'
        )}
      </button>
    );
  };

  console.log(articles);
  return (
    <div>
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
              Dexter Fitness | Community{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="md:grid grid-cols-12 max-w-7xl mx-auto py-16">
        <div className="col-span-2"></div>
        <div className="col-span-6">
          <div>
            <SectionTitle>Our Articles</SectionTitle>
          </div>
          {articles?.map((item) => (
            <div
              key={item._id}
              className="border-[#F3F3F3] border-2 mt-8 rounded-md"
            >
              <div className="flex justify-between items-center bg-[#F3F3F3] p-4">
                <div className="flex items-center gap-4">
                </div>
                <div className="space-x-3">
                  <button>
                    <HiOutlineBookmark className="text-2xl"></HiOutlineBookmark>
                  </button>
                  <button>
                    <HiOutlineShare className="text-2xl"></HiOutlineShare>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <img className="w-full" src={item.image} alt="" />
                <div className="flex justify-between px-1 text-2xl">
                  <div className="flex items-center gap-2">
                    <BsCalendarDateFill></BsCalendarDateFill>
                    <p>{item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineAccessTimeFilled></MdOutlineAccessTimeFilled>
                    <p>{item.time}</p>
                  </div>
                </div>
                <h1 className="text-xl md:text-3xl text-[#595959] font-semibold my-5 md:my-10">
                  {item.heading}
                </h1>
                <p>{item.description}</p>
              </div>
              <p className="w-5/6 mx-auto border-y border-[#F3F3F3]"></p>
              <div className="flex justify-between items-center p-4">
                <LikeDislikeButton></LikeDislikeButton>
                <button className=" text-3xl">
                  <HiOutlineEye></HiOutlineEye>
                </button>
              </div>
            </div>
          ))}
          <div className="text-center mt-10">
            <button onClick={handlPrev} className="btn">
              Prev
            </button>
            {pages.map((i) => (
              <button
                onClick={() => setCurrentPage(i)}
                className={`btn ${currentPage === i && "btn-success"}`}
                key={i}
              >
                {i}
              </button>
            ))}
            <button onClick={handleNext} className="btn">
              Next
            </button>
            <select
              defaultValue={itemPerPage}
              onChange={handlePerPage}
              name=""
              id=""
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
};

export default Forum;
