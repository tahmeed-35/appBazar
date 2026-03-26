import { Link } from "react-router";
import errorImg from "../assets/error-404.png";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <img src={errorImg} alt="404 Error" className="max-w-md w-full mb-8" />
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Oops, page not found!</h1>
      <p className="text-slate-500 mb-6 font-medium">The page you are looking for is not available.</p>
      <Link to="/" className="btn bg-purple-500 hover:bg-purple-600 text-white border-0 px-8">
        Go Back!
      </Link>
    </div>
  );
}

export default ErrorPage;
