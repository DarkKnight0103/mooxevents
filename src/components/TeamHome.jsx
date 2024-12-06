import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa"; // Import react-icons
import PropTypes from "prop-types";

const teamMembers = [
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user18.jpg",
    fullName: "Akshay Kumar",
    designation: "Founder / CEO",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    socialLinks: [
      { icon: FaFacebookF, href: "#" },
      { icon: FaLinkedinIn, href: "#" },
      { icon: FaTwitter, href: "#" },
    ],
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user11.jpg",
    fullName: "Raima Ray",
    designation: "Business Head",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    socialLinks: [
      { icon: FaFacebookF, href: "#" },
      { icon: FaLinkedinIn, href: "#" },
      { icon: FaTwitter, href: "#" },
    ],
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user20.jpg",
    fullName: "Arjun Kapur",
    designation: "UI Design",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    socialLinks: [
      { icon: FaFacebookF, href: "#" },
      { icon: FaLinkedinIn, href: "#" },
      { icon: FaTwitter, href: "#" },
    ],
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user16.jpg",
    fullName: "Alia Bhatt",
    designation: "Marketing Head",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    socialLinks: [
      { icon: FaFacebookF, href: "#" },
      { icon: FaLinkedinIn, href: "#" },
      { icon: FaTwitter, href: "#" },
    ],
  },
];

const TeamMemberItem = ({ member }) => (
  <div className="group relative shadow-xl rounded-xl h-full p-2 bg-white overflow-hidden transition-transform duration-500 transform hover:scale-105">
    {/* Card Image */}
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={member.picture}
        alt={member.fullName}
        className="w-full h-auto transition-transform duration-700 transform group-hover:scale-150"
      />
    </div>

    {/* Card Content */}
    <div className="px-4 py-6">
      <h4 className="text-2xl font-medium mb-1">{member.fullName}</h4>
      <p className="mb-4 text-sm">{member.designation}</p>
      <p className="opacity-50 mb-0">{member.bio}</p>
      <div className="mt-6">
        {member.socialLinks.map((item, i) => (
          <a
            href={item.href}
            className="inline-block opacity-60 transition duration-300 hover:translate-y-1 hover:opacity-100 mr-4"
            key={i}
          >
            <item.icon className="text-xl" /> {/* Use react-icons component */}
          </a>
        ))}
      </div>
    </div>
  </div>
);

TeamMemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

const TeamHome = () => {
  return (
    <section className="ezy__team4 light py-14 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center mb-5 md:mb-10">
          <div className="sm:max-w-md text-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vero, consequuntur beatae eos placeat aspernatur quidem aperiam ratione aliquid fuga eaque perferendis similique pariatur ab magni aliquam iusto incidunt commodi!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 text-center">
          {teamMembers.map((member, i) => (
            <div className="col-span-4 md:col-span-2 lg:col-span-1" key={i}>
              <TeamMemberItem member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamHome;
