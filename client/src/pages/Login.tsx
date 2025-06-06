import { useState } from "react";
import { customAxios } from "../axios/axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useCartStore, useUserStore } from "../zustand/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const { setUser } = useUserStore();
  const { set_cart } = useCartStore();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const navigate = useNavigate();

  const loginMutation = useMutation(
    async () => {
      const res = await customAxios.post("/auth/login", {
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
        set_cart([]);

        const referrer = document.referrer;

        if (referrer && referrer.includes(window.location.origin)) {
          // navigate(-1);
          navigate(referrer.split(window.location.origin)[1]);
        } else {
          navigate("/");
        }
      },
    }
  );

  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center">
      <div className="w-[95%] md:w-[400px] max-w-[400px] bg-white p-4 rounded text-tertiary">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form className="flex flex-col gap-2 mt-4" onSubmit={handleLogin}>
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
          {loginMutation.isError && (
            <p className="text-red-500">
              {loginMutation.error instanceof AxiosError &&
                loginMutation.error.response?.data.message}
            </p>
          )}
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-tertiary text-white py-1 px-2 rounded w-full font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-1">
          Don&apos; have account? Sign up{" "}
          <Link to={"/signup"} className="font-medium">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
