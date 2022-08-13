import React, { useEffect } from "react";
import Footer from "src/parts/Footer";
import Header from "src/parts/Header";
import LoginForm from "src/parts/LoginForm";

export default function Login() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <section className="container mx-auto pt-10">
        <Header onLight></Header>
      </section>
      <section className="container mx-auto pt-10">
        <LoginForm></LoginForm>
      </section>
      <section className="mt-24 bg-blue-900 py-10">
        <Footer></Footer>
      </section>
    </>
  );
}
