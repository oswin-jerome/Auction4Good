import React from "react";

function UpgradePage() {
  return (
    <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="flex  justify-center gap-4  md:gap-8">
        <div className="divide-y divide-gray-200 max-w-[400px] rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 sm:px-8">
            <h2 className="text-lg font-medium text-gray-900">
              Premium
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 text-gray-700">Upgrade to premium plan to host your own auctions.</p>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 20$ </strong>

              <span className="text-sm font-medium text-gray-700">/only</span>
            </p>

            <a className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6" href="#">
              Get Started
            </a>
          </div>

          <div className="p-6 sm:px-8">
            <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

            <ul className="mt-2 space-y-2 sm:mt-4">
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Unlimited Auctions </span>
              </li>
              <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> 24/7 Support </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePage;
