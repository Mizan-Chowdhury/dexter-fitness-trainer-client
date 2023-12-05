import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";

const RecommendedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  console.log(classes);

  const someClass = classes?.slice(0, 3);
  console.log(someClass);

  return (
    <div className="md:px-10 px-3">
      <SectionTitle>Recommended Classes for you</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {someClass?.map((i, index) => (
          <div key={index}>
            <div className="relative">
              <p className="absolute bottom-0 right-0 text-white bg-black text-sm m-1">
                {i.single_class_price}min
              </p>
              <img src={i.image} alt="" />
            </div>
            <div className="mt-2 text-sm">
              <h1 className="font-bold text-center mb-2">{i.class_name}</h1>
              <p>Benefits : {i.benefits}</p>
              <p>Intractions : {i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClasses;
