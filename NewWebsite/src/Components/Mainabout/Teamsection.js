import React from "react";
import { Link } from "react-router-dom";
import expert1 from "../../assets/images/experts_01.png";
import expert2 from "../../assets/images/experts_02.png";
import expert3 from "../../assets/images/experts_03.png";


const Team = [
  {
    name: "Willium Smith",
    role: "CEO & Co-Founder",
    image: expert1,
    socialLinks: {
      facebook: "https://www.facebook.com/",
      twitter: "https://x.com/",
      instagram: "https://www.instagram.com/",
    },
  },
  {
    name: "Jack Deo",
    role: "Business Developer",
    image: expert2,
    socialLinks: {
      facebook: "https://www.facebook.com/",
      twitter: "https://x.com/",
      instagram: "https://www.instagram.com/",
    },
  },
  {
    name: "Mark Nell",
    role: "Senior Lead",
    image: expert3,
    socialLinks: {
      facebook: "https://www.facebook.com/",
      twitter: "https://x.com/",
      instagram: "https://www.instagram.com/",
    },
  },
];

const Teamsection = () => {
  return (
    <div>
      <section className="row_am experts_team_section">
        <div className="container">
          <div
            className="section_title aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={500}
            data-aos-delay={100}
          >
            
              <span className="title_badge mb-1"> tem members </span>
              {/* h2 */}
              <h2> Our Experts Leaders</h2>
              {/* p */}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typese
                tting indus orem Ipsum has beenthe standard dummy.
              </p>
           
          </div>
          <div className="row">
            {/*  box 1  */}
            {Team.map((team, index) => (
              <div className="col-md-4" key={index}>
                <div className="experts_box">
                  <img src={team.image} alt="team-img" />
                  <div className="text">
                    <h6> {team.name} </h6>
                    <span>{team.role}</span>
                    <ul className="social_media">
                      {Object.entries(team.socialLinks).map(
                        ([platform, url]) => (
                          <li key={platform}>
                            <Link to={url}>
                              <i className={`icofont-${platform}`} />
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teamsection;
