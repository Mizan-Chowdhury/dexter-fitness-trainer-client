import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";

const TrainerDetails = () => {
  const { name, age, weekTime, dayTime, experience, about, image, email } =
    useLoaderData();

  console.log(weekTime);

  const handleSlotTime = (data) => {
    console.log(data);
  };

  const dayTimeSlots = () => {
    const slots = [];
    for (let i = 1; i <= dayTime; i++) {
      const startTime = 9 + i;
      const endTime = startTime + 1;
      const slotTime = `${startTime}:00 AM - ${endTime}:00 AM`;
      slots.push(
        <Link to={'/trainerBooked'}>
          <li
            className="btn w-full mb-2"
            onClick={() => handleSlotTime(slotTime)}
            key={i}
          >
            {slotTime}
          </li>
        </Link>
      );
    }
    return slots;
  };

  const weekTimeSlots = () => {
    const slots = [];
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    for (let day = 0; day < weekTime; day++) {
      const startTime = 16;
      const endTime = startTime + 1;
      const slotTime = `${daysOfWeek[day]}: ${startTime}:00 AM - ${endTime}:00 AM`;
      slots.push(
        <Link to={'/trainerBooked'}>
          <li
            className="btn w-full mb-2"
            onClick={() => handleSlotTime(slotTime)}
            key={day}
          >
            {slotTime}
          </li>
        </Link>
      );
    }
    return slots;
  };

  return (
    <div className="max-w-7xl mx-auto py-36">
      <dir>
        <SectionTitle>{name}'s details</SectionTitle>
      </dir>
      <div className="grid grid-cols-12 items-center gap-5">
        <div className="col-span-3">
          <img className="rounded-full" src={image} alt="" />
        </div>
        <div className="col-span-3">
          <p>
            <span className="font-semibold">Age :</span> {age}
          </p>
          <p>
            <span className="font-semibold">Experience :</span> {experience}
          </p>
          <p>
            <span className="font-semibold">About my self :</span> {about}
          </p>
          <p>
            <span className="font-semibold">Email :</span> {email}
          </p>
        </div>
        <div className="col-span-3">
          <p className="font-semibold mb-2">Available Time Slots in a day:</p>
          <ul className="">{dayTimeSlots()}</ul>
        </div>
        <div className="col-span-3">
          <p className="font-semibold mb-2">Available Time Slots in a week:</p>
          <ul className="">{weekTimeSlots()}</ul>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
