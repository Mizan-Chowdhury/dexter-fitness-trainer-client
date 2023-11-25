const SectionTitle = ({ children }) => {
  return (
    <div className="relative border-s-8 border-[#A8CA73] mb-8 md:mb-14 ps-3">
      <h1 className="text-3xl md:text-5xl font-bold text-[#282F3D]">{children}</h1>
      <p className="absolute bottom-4 lg:bottom-0 text-[40px] md:text-7xl lg:text-9xl opacity-5">
        {children}
      </p>
    </div>
  );
};

export default SectionTitle;
