import { useState } from "react";
import { useUserStore } from "../zustand/store";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { customAxios } from "../axios/axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AxiosError } from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const { setUser } = useUserStore();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate();
  };

  const navigate = useNavigate();

  const signUpMutation = useMutation(
    async () => {
      const res = await customAxios.post("/auth/signup", {
        name,
        email,
        password,
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        const expires = date.toUTCString();

        setUser({ expires, ...data });

        const referrer = document.referrer;

        if (referrer && referrer.includes(window.location.origin)) {
          navigate(referrer);
        } else {
          navigate("/");
        }
      },
    }
  );

  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center">
      <div className="w-[95%] md:w-[400px] max-w-[400px] bg-white p-4 rounded text-tertiary">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <form className="flex flex-col gap-2 mt-4" onSubmit={handleSignUp}>
          <label htmlFor="email">Name</label>
          <input
            type="name"
            id="name"
            required
            className="w-full border border-tertiary rounded p-1 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            className="w-full border border-tertiary rounded p-1 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <div className="flex items-center gap-1 border border-tertiary rounded pr-1">
            <input
              type={togglePassword ? "text" : "password"}
              id="password"
              required
              className="w-full rounded p-1 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {togglePassword ? (
              <FaRegEye
                onClick={() => setTogglePassword(!togglePassword)}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setTogglePassword(!togglePassword)}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
          {signUpMutation.isError && (
            <p className="text-red-500">
              {signUpMutation.error instanceof AxiosError &&
                signUpMutation.error.response?.data.message}
            </p>
          )}
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-tertiary text-white py-1 px-2 rounded w-full font-medium"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-1">
          Already have account? Login{" "}
          <Link to={"/login"} className="font-medium">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
