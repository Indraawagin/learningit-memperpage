import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import users from "src/constans/api/users";
import useForm from "src/helpers/hooks/useForm";
import fieldErrors from "src/helpers/fieldErrors";
import Select from "src/components/Form/Select";
import Input from "src/components/Form/Input";

function Register({ history }) {
  const [{ name, email, password, profession, otherProfession }, setState] = useForm({
    name: "",
    email: "",
    password: "",
    profession: "",
    otherProfession: "",
  });

  const [Errors, setErrors] = useState(null);

  function submit(e) {
    e.preventDefault();
    users
      .register({
        name,
        email,
        password,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        history.push("/login");
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
          <span className="font-bold">Grow Skills </span> From,
          <br />
          Anywhere
        </h1>

        <form onSubmit={submit}>
          <Input
            name="name"
            labelName="Full Name"
            onChange={setState}
            type="text"
            value={name}
            placeholder="Your Name"
            error={ERRORS?.name?.message}
          />
          <Input
            name="email"
            labelName="Email Address"
            onChange={setState}
            type="email"
            value={email}
            placeholder="Your Email Address"
            error={ERRORS?.email?.message}
          />
          <Input
            name="password"
            labelName="Password"
            onChange={setState}
            type="password"
            value={password}
            placeholder="Your Password"
            error={ERRORS?.password?.message}
          />

          <Select
            labelName="Occupation"
            name="profession"
            value={profession}
            fallbackText="Select your focus"
            onClick={setState}
          >
            <option value="">Select your focus</option>
            <option value="Web Developer">Web Designer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="others">others</option>
          </Select>
          {profession === "others" && (
            <Input
              name="otherProfession"
              labelName="Other's Occupation"
              onChange={setState}
              type="otherProfession"
              value={otherProfession}
              placeholder="Your Occupation"
              error={ERRORS?.otherProfession?.message}
            />
          )}

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
          >
            Daftar
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
            <img src="/assets/images/james.jpg" alt="Client" />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290, height: 113 }}
          >
            <p className="text-gray-900 mb-2">
              Semua materi terstruktrur baik dan mentor yang sangat lihai
            </p>
            <span className="text-gray-600">James, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Register);
