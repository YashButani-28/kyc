import AuthPhoto from "../assets/icons/logo.svg";

export default function AuthPageImage() {
  return (
    <div className="flex justify-center items-center h-screen w-2/5 bg-[aliceblue;] ">
      <img
        src={AuthPhoto}
        alt="Logo"
        className="h-1/3 w-auto object-contain hover: transition-transform duration-500 ease-in-out hover:scale-90"
      />
    </div>
  );
}
