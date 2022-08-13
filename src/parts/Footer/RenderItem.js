/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default function RenderItem({ textName }) {
  return (
    <li className="mt-2">
      <Link
        to=""
        className="text-indigo-600 hover:text-teal-500 hover:underline"
      >
        {textName}
      </Link>
    </li>
  );
}
