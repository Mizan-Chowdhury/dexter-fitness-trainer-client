import { useEffect, useState } from "react";

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    fetch("featured.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
      });
  }, []);
  console.log(featured);



  return <div>

    
  </div>;
};

export default Featured;
