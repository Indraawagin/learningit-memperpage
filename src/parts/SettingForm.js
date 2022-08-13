import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import Select from "src/components/Form/Select";
import Input from "src/components/Form/Input";

import useForm from "src/helpers/hooks/useForm";
import fieldErrors from "src/helpers/fieldErrors";

import users from "src/constans/api/users";
import media from "src/constans/api/media";

import { populateProfile } from "src/store/actions/users";

import image2base64 from "src/utils/image2base64";

import { ReactComponent as DefaultUser } from "src/assets/images/default.svg";

function SettingForm({ details }) {
  const dispatch = useDispatch();
  const addPicture = useRef(null);
  const [Errors, setErrors] = useState(null);
  const [State, setKey, setState] = useForm({
    name: details?.name ?? "",
    email: details?.email ?? "",
    profession: details?.profession ?? "",
    avatar: details?.avatar ?? "",
    password: details?.password ?? "",
    otherProfession: details?.otherProfession ?? "",
  });

  const previewImage = (e) => {
    e.persist();
    image2base64(e.target.files[0]).then((image) => {
      setKey({
        target: {
          name: e.target.name,
          value: image,
        },
      });
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: State.name,
      email: State.email,
      password: State.password,
      profession: State.profession,
    };
    if (payload.profession === "others") payload.profession = State.otherProfession;
    if (State.avatar.indexOf("base64") > -1) {
      const avatar = await media.upload(State.avatar);
      payload.avatar = avatar.data.image;
    }
    users
      .update(payload)
      .then((res) => {
        toast.success("Profile Update");
        setState({
          ...State,
          password: "",
        });
        setErrors(null);
        dispatch(
          populateProfile({
            ...details,
            ...res.data,
          })
        );
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  const ERRORS = fieldErrors(Errors);
  return (
    <>
      <section className="flex flex-col">
        <div className="flex justify-start items-center -mx-5">
          <div className="w-auto text-center px-5">
            <div className="rounded-full overflow-hidden w-24 h-24">
              {State?.avatar ? (
                <img className="object-cover w-full h-full" src={State.avatar} alt="Preview" />
              ) : (
                <DefaultUser
                  className="fill-indigo-500"
                  style={{ width: 90, height: 90 }}
                ></DefaultUser>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-gray-600">Add your picture...</span>
            <div>
              <input
                type="file"
                name="avatar"
                className="hidden"
                ref={addPicture}
                onChange={previewImage}
              />

              <button
                onClick={() => addPicture.current.click()}
                className="bg-gray-300 hover:bg-gray-500 transition-all duration-200 focus:outline-none shadow-inner text-gray-400 px-6 py-3 mt-3"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col mt-8">
        <div className="flex items-center pb-24">
          <div className="w-4/12">
            <form onSubmit={submit}>
              <Input
                name="name"
                labelName="Full Name"
                onChange={setKey}
                type="text"
                value={State.name}
                placeholder="Your Name"
                error={ERRORS?.name?.message}
              />
              <Input
                name="email"
                labelName="Email Address"
                onChange={setKey}
                type="email"
                value={State.email}
                placeholder="Your Email Address"
                error={ERRORS?.email?.message}
              />
              <Input
                name="password"
                labelName="Password"
                onChange={setKey}
                type="password"
                value={State.password}
                placeholder="Your Password"
                error={ERRORS?.password?.message}
              />

              <Select
                labelName="Occupation"
                name="profession"
                value={State.profession}
                fallbackText="Select your focus"
                onClick={setKey}
              >
                <option value="">Select your focus</option>
                <option value="Web Developer">Web Designer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="others">others</option>
              </Select>
              {State.profession === "others" && (
                <Input
                  name="otherProfession"
                  labelName="Other's Occupation"
                  onChange={setKey}
                  type="otherProfession"
                  value={State.otherProfession}
                  placeholder="Your Occupation"
                  error={ERRORS?.otherProfession?.message}
                />
              )}
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner 
                text-white px-6 py-3 mt-4"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(SettingForm);
