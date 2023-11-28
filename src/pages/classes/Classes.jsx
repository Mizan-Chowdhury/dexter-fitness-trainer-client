import { Link } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";
import useClasses from "./useClasses";

const Classes = () => {
  const [classes] = useClasses();

  return (
    <div className="max-w-7xl mx-auto py-36 px-2 md:px-10">
      <div>
        <SectionTitle>Join Our Classes</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {classes?.map((i) => (
          <Link to={`/classDetails/${i._id}`} key={i._id}>
            <div >
              <img className="md:h-64 w-full" src={i.image} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
