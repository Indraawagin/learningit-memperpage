/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";

export default (initialValue) => {
  const [State, setState] = useState(initialValue);

  return [
    State,
    (e) => {
      setState({
        ...State,
        [e.target.name]: e.target.value,
      });
    },
    (newState) => {
      setState({
        ...State,
        ...newState,
      });
    },
  ];
};
