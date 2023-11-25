const SectionTitle = ({ children }) => {
  return (
    <div className="relative border-s-8 border-[#A8CA73] mb-14 ps-3">
      <h1 className="text-5xl font-bold">{children}</h1>
      <p className="absolute bottom-0 text-9xl opacity-5">{children}</p>
    </div>
  );
};

export default SectionTitle;
