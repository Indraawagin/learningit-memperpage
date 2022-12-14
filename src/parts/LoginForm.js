import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import users from "src/constans/api/users";
import { setAuthorizationHeader } from "src/configs/axios";
import { populateProfile } from "src/store/actions/users";
import useForm from "src/helpers/hooks/useForm";
import fieldErrors from "src/helpers/fieldErrors";
import Input from "src/components/Form/Input";

function LoginForm({ history }) {
  const dispatch = useDispatch();
  const [{ email, password }, setState] = useForm({
    email: "",
    password: "",
  });
  const [Errors, setErrors] = useState(null);
  function submit(e) {
    e.preventDefault();
    users
      .login({
        email: email,
        password: password,
      })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        users.details().then((detail) => {
          dispatch(populateProfile(detail.data));
          const production =
            process.env.REACT_APP_FRONTPAGE_URL === process.env.REACT_APP_API_HOST
              ? `Domain = ${process.env.REACT_APP_DOMAIN}`
              : "";

          localStorage.setItem(
            "LEARNINGIT:token",
            JSON.stringify({
              ...res.data,
              email: email,
            })
          );
          const redirect = localStorage.getItem("LEARNINGIT:redirect");
          const userCookie = {
            name: detail.data.name,
            thumbnail: detail.data.avatar,
          };

          const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

          document.cookie = `LEARNINGIT:user=${JSON.stringify(
            userCookie
          )}; expires=${expires.toUTCString()}; path:/; ${production}`;
          history.push(redirect || "/");
        });
      })
      .catch((err) => {
        setErrors(err?.response?.data?.message);
      });
  }

  const ERRORS = fieldErrors(Errors);
  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-1/4">
        <h1 className="text-4xl text-gray-900 mb-6">
          <span className="font-bold">Continue</span> Study <br />
          Finish your <span className="font-bold">Goals</span>
        </h1>

        <form onSubmit={submit}>
          <div className="flex flex-col mb-4">
            <Input
              name="email"
              labelName="Email Address"
              onChange={setState}
              type="email"
              value={email}
              placeholder="Your Email Address"
              error={ERRORS?.email?.message}
            />
          </div>
          <div className="flex flex-col mb-4">
            <Input
              name="password"
              labelName="Password"
              onChange={setState}
              type="password"
              value={password}
              placeholder="Your Password"
              error={ERRORS?.password?.message}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
          >
            Masuk
          </button>
        </form>
      </div>
      <div className="w-1/12"></div>
      <div className="w-5/12 flex justify-end pt-24 pr-16">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0"
            style={{ width: 324, height: 374 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img src="/assets/images/tamara.jpg" alt="Client" />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290, height: 113 }}
          >
            <p className="text-gray-900 mb-2">
              Metode belajar yang santai seperti nonton drakor di Netflix
            </p>
            <span className="text-gray-600">Alyssa, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
