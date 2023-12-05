import useAdmin from "../hooks/useAdmin";
import useGymMember from "../hooks/useGymMember";
import useTrainer from "../hooks/useTrainer";
import SectionTitle from "../shared/SectionTitle";

const WelcomeText = () => {
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();
  const [isUser] = useGymMember();
  return (
    <div className="md:px-10 px-4">
      <SectionTitle>Welcome</SectionTitle>
      {isAdmin && (
        <h1 className="font-semibold text-stone-900">
          "Welcome to the Dashboard, Admin! 🚀 Your presence here elevates our
          space. Let's navigate this dashboard with enthusiasm and efficiency.
          If you need anything or have exciting updates to share, feel free to
          dive right in. We're thrilled to have you at the helm!"
        </h1>
      )}
      {isTrainer && (
        <h1 className="font-semibold text-stone-900">
          "Hello Trainers! 🌟 Step into the Dashboard with the authority and
          grace that you bring. Your role is crucial in maintaining the harmony
          of our community. Should you have any questions, ideas, or insights,
          this space is yours to command. Welcome, and let's continue making
          this community thrive together!"
        </h1>
      )}
      {isUser && <h1 className="font-semibold text-stone-900">"Welcome, Valued Member! 🌈 Your presence in our organization adds strength to our collective journey. As a member, your perspectives and contributions are invaluable. Feel free to explore the resources, engage with fellow members, and make this space your own. We're excited to have you as an integral part of our community!"</h1>}

      {!isAdmin && !isTrainer && !isUser && <h1 className="font-semibold text-stone-900">"Hello Fitness Enthusiast! 🏋️‍♂️ Welcome to our vibrant fitness community. We're excited to have you here! Did you know that as a member, you gain exclusive access to our classes and the full dashboard experience? Joining is easy, and it opens up a world of workouts, expert tips, and a supportive community. Let's kickstart your fitness journey together – join our classes and unlock the full potential of your fitness adventure!"</h1>}
      
      
    </div>
  );
};

export default WelcomeText;
