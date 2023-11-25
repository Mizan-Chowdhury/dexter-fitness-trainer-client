import SectionTitle from "../../shared/SectionTitle";

const About = () => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <div>
        <SectionTitle>About Us</SectionTitle>
      </div>
      <div className="md:flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-[#282F3D] text-4xl font-bold">Dexter Fitness Trainer: Elevate Your Fitness Journey with Expert Trainers</h1>
        <p className="text-[#282F3D] my-5">10 YEARS OF EXPERIENCE IN FITNESS</p>
        <p>Welcome to Dexter Fitness Trainer, where your fitness goals become reality! Our online fitness trainer platform connects you with certified experts dedicated to guiding you on a personalized journey to peak health. Whether you are a beginner or a seasoned fitness enthusiast, our trainers are here to motivate, educate, and empower you to achieve and exceed your fitness aspirations. Join us on a path to strength, vitality, and overall well-being. Your peak fitness adventure starts here!</p>
        <p></p>
      </div>
      <div className="flex-1">
        <img className="" src="https://i.ibb.co/b305PyM/img2.jpg" alt="" />
      </div>
    </div>
    </div>
  );
};

export default About;
