import { Link } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";
import useClasses from "./useClasses";
import { Helmet } from "react-helmet";

const Classes = () => {
  const [classes] = useClasses();

  const dailyActivities = {
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
  };

  return (
    <div className="max-w-7xl mx-auto py-36 px-2 md:px-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dexter Fitness - Classes</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <SectionTitle>Join Our Classes</SectionTitle>
      </div>

      <div className="overflow-x-auto max-w-3xl mx-auto mb-20">
        <h1 className="text-3xl font-semibold mb-2">Fitness Weekly Schedule</h1>
        <table className="table">
          {/* head */}
          <thead className="text-center text-lg">
            <tr className="bg-[#f2f2f2] border-2">
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(dailyActivities).map((day, i) => (
              <tr
                className="border-2 text-center font-semibold border-[#dddddd] p-5"
                key={day}
              >
                <td className="p-5 border">Exercise {i + 1}</td>
                <td className="p-5 border">Exercise {i + 1 * 6}</td>
                <td className="p-5 border">Exercise {i + 1 * 11}</td>
                <td className="p-5 border">Exercise {i + 1 * 16}</td>
                <td className="p-5 border">Exercise {i + 1 * 21}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {classes?.map((i) => (
          <Link to={`/classDetails/${i._id}`} key={i._id}>
            <div>
              <img className="md:h-64 w-full" src={i.image} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
