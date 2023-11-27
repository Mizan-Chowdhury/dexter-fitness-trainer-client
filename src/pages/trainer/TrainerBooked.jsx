import { useEffect, useState } from "react";

const TrainerBooked = () => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
      fetch("bookingPlans.json")
        .then((res) => res.json())
        .then((data) => {
            setPackages(data);
        });
    }, []);
    console.log(packages);


    return (
        <div>
            jzdkj
        </div>
    );
};

export default TrainerBooked;