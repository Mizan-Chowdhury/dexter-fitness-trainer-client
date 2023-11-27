import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Articles = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/articles?page=0}&size=1}`).then((res) => {
      console.log(res.data[0]);
      setArticles(res?.data[0]);
    });
  }, [axiosSecure]);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div>
        <SectionTitle>Latest Articles</SectionTitle>
      </div>
      <div className="md:flex items-center gap-10">
        <div className="flex-1">
          <img src={articles?.image} alt="" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-5">{articles?.heading}</h1>
          <p>{articles?.description}</p>

          <Link to={'/community'}>
            <button className="btn btn-outline btn-sm border-b-4 mt-5">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
