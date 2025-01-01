import React from "react";
import Header from "../../components/Navbar/Header";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <Header />
      <div className="container flex">
        <div className="flex flex-col p-6 mx-auto mt-16 gap-6 border w-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold uppercase tracking-wider">
              Welcome Back,
            </span>
            <p className="text-gray-700">
              Please enter your details to log in.
            </p>
          </div>
          <form action="">
            <input
              type="text"
              placeholder="Email or Phone"
              className="border border-gray-700 py-2 px-4 rounded-sm md:w-72"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-700 py-2 px-4 rounded-sm md:w-72"
            />
            <Button type="submit" color="primary" rounded="sm">
              {" "}
              Sign in
            </Button>
          </form>
          <span>
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-secondary underline">Join Now</span>
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
