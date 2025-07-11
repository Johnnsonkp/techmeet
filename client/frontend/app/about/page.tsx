import { MediumText } from "@/components/ui/textDisplay/LargeText";
import React from "react";

function AvatarComp({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="mx-auto mb-6 object-top">
      <img
        alt={alt || "Avatar"}
        className="h-24 w-24 rounded-full object-cover"
        height={96}
        width={96}
        src={src}
      />
    </div>
  );
}

function UnknownUser(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        className="p-5 text-white bg-gray-500 stroke-current w-full rounded-full mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
  )
}

function MeetTheTeam() {
  return (
    <div className="flex justify-between container mx-auto px-4 w-[100%]">

      <div className="bg-white rounded-lg shadow-sm p-5 my-6 text-center mx-2">
          {/* <img src="https://spacema-dev.com/elevate/assets/images/team/1.jpg" alt="Team Member 1" className="w-full rounded-full mb-4"/> */}
          <UnknownUser />
          <h3 className="text-xl font-semibold mb-2">Mao </h3>
          <p className="text-gray-700">Role: Developer</p>
      </div>


      <div className="bg-white rounded-lg shadow-sm p-5 my-6 text-center mx-2">
          {/* <img src="https://spacema-dev.com/elevate/assets/images/team/4.jpg" alt="Team Member 2" className="w-full rounded-full mb-4"/> */}
          <UnknownUser />
          <h3 className="text-xl font-semibold mb-2">Crystal</h3>
          <p className="text-gray-700">Role: Developer</p>
      </div>


      <div className="bg-white rounded-lg shadow-sm p-5 my-6 text-center mx-2">
          {/* <img src="https://spacema-dev.com/elevate/assets/images/team/3.jpg" alt="Team Member 3" className="w-full rounded-full mb-4"/> */}
          <UnknownUser />
          <h3 className="text-xl font-semibold mb-2">Won</h3>
          <p className="text-gray-700">Role: Developer</p>
      </div>


      <div className="bg-white rounded-lg shadow-sm p-5 my-6 text-center mx-2">
          {/* <img src="https://spacema-dev.com/elevate/assets/images/team/2.jpg" alt="Team Member 4" className="w-full rounded-full mb-4"/> */}
          <UnknownUser />
          <h3 className="text-xl font-semibold mb-2">John</h3>
          <p className="text-gray-700">Role: Developer</p>
      </div>

    </div>
  )
}

function TeamSection12() {
  return (
    <section className="min-h-screen py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <MediumText text={"Meet the Team"} />
          <p className="text-4xl mt-2 tracking-tighter font-semibold text-gray-700 text-balance">Behind the Success: Our Dedicated Team.</p>
        </div>

        <MeetTheTeam />
      </div>
    </section>
  );
}

export default TeamSection12;