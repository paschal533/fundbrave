interface Props {
  name: any;
  childStyles: string;
  parentStyle: string;
}

const Banner = ({ name, childStyles, parentStyle }: Props) => (
  <div
    className={`relative w-full flex items-center z-0 overflow-hidden !bg-[#1D1F20] ${parentStyle}`}
  >
    <p
      className={`font-bold text-6xl text-white font-poppins leading-70 ${childStyles}`}
    >
      {name}
    </p>
    <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full -top-9 -left-16 -z-5  white-bg" />
    <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full -bottom-24 -right-14 -z-5 white-bg" />
  </div>
);

export default Banner;
