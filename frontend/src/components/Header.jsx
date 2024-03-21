import React from "react";

const Header = () => {
  return (
    <section>
      <header className="bg-black container mx-auto px-4 py-4 flex justify-between">
        <div></div>
        <div className="flex gap-x-9 items-center">
          <ul className="flex gap-x-5 font-semibold text-white">
            <li className="px-4 text-white hover:border-b-2 hover:border-white-space">
              <a href="/">Home</a>
            </li>
            <li className="px-4 text-white hover:border-b-2 hover:border-white-space">
              <a href="/">Articles</a>
            </li>
            <li className="px-4 text-white hover:border-b-2 hover:border-white-space">
              <a href="/">Pages</a>
            </li>
            <li className="px-4 text-white hover:border-b-2 hover:border-white-space">
              <a href="/">Faq</a>
            </li>
          </ul>
          <button className="border-2 bg-blue border-blue rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-blue hover:border-white">
            Get Started
          </button>
        </div>
      </header>
    </section>
  );
};

export default Header;
