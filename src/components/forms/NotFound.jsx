import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-[150px] flex flex-col gap-6">
      <div className="">
        <h1 className="text-[50px] text-primary">Page Not Found! </h1>
        <p className="text-[16px]">
          The page you are looking for does not exist.
        </p>
      </div>
      <div>
        <Link to="/login" className="bg-primary p-2 mt-4 text-white">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
