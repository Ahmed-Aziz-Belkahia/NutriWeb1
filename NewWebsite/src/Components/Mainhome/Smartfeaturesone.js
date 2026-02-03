import React, { useState } from 'react';
import lead_img_1 from "../../assets/images/2.png";
import lead_img_2 from "../../assets/images/3.png";
import lead_img_3 from "../../assets/images/4.png";
import lead_img_4 from "../../assets/images/5.png";
import { Link } from "react-router-dom";

const Smartfeaturesone = () => {
  const [activeTab, setActiveTab] = useState("v-pills-secure");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const pills = [
    {
      id: "v-pills-secure",
      label: "Meal Scanning",
      title: "Meal Scanning",
      image: lead_img_1,
      content: "Snap a photo of any meal and let AI instantly analyze its nutritional content. Nutri identifies ingredients, calculates calories and macros, tracks your daily intake, and even generates recipes based on what you're eating.",
      features: [
        "AI-powered ingredient recognition",
        "Instant calorie and macro calculations",
        "Recipe generation from meal photos"
      ]
    },
    {
      id: "v-pills-advisor",
      label: "Meal Planning",
      title: "Meal Planning",
      image: lead_img_2,
      content: "Create a personalized weekly meal plan tailored to your stats, dietary preferences, and nutrition goals. Nutri suggests balanced meals that fit your lifestyle and helps you stay on track with automated shopping lists.",
      features: [
        "Personalized weekly meal plans",
        "Custom suggestions based on your goals",
        "Automated shopping list generation"
      ]
    },
    {
      id: "v-pills-process",
      label: "Ingredients Scanning",
      title: "Ingredients Scanning",
      image: lead_img_3,
      content: "Scan ingredients in your pantry or fridge and discover what you can make. Nutri generates multiple recipe options based on available ingredients, helping you reduce waste and cook creative meals with what you already have.",
      features: [
        "Scan pantry and fridge ingredients",
        "Multiple recipe suggestions per scan",
        "Reduce food waste with smart recipes"
      ]
    },
    {
      id: "v-pills-controll",
      label: "Body Analysis",
      title: "Body Analysis",
      image: lead_img_4,
      content: "Track your body composition, weight changes, and physical progress over time. Nutri provides visual insights and trends to help you understand how your nutrition impacts your body and adjust your plan accordingly.",
      features: [
        "Track body composition over time",
        "Visual progress charts and trends",
        "Nutrition impact analysis"
      ]
    },
  ];

  return (
    <div>
      <section className="row_am visitors_leads">
        <div className="container lead_inner">
          <div className="convert_leads">
            <div className="section_title" data-aos="fade-up" data-aos-duration={1000} data-aos-delay={100}>
              <span className="title_badge lighter mb-1">Key Notes</span>
              <h2>Smart Features</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ul className="nav flex-column nav-pills w-100 " id="v-pills-tab" role="tablist">
                {pills.map((pill) => (
                  <li className="nav-item w-100" key={pill.id} role="presentation">
                    <button
                      className={`nav-link w-100 border-0 ${activeTab === pill.id ? "active" : ""}`}
                      onClick={() => handleTabChange(pill.id)}
                    >
                      {pill.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-9">
              {pills.map((pill) => (
                activeTab === pill.id && (
                  <div className="card tab-pane show active" key={pill.id}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="lead_text">
                            <h5>{pill.title}</h5>
                            <p>{pill.content}</p>
                            <ul className="feature_list">
                              {pill.features?.map((feature, index) => (
                                <li key={index}><i className="icofont-check-circled" /> {feature}</li>
                              ))}
                            </ul>
                            <div className="btn_block">
                              <a href="https://apps.apple.com/app/nutri-ai" target="_blank" rel="noopener noreferrer" className="btn light_btn">Get Started</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <img src={pill.image} className="lead_img" alt="feature" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Smartfeaturesone;
