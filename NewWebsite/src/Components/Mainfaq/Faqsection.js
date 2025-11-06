import React, { useState } from "react";

const Faqsection = () => {
  const [openAccordion, setOpenAccordion] = useState("collapseOne");

  const toggleAccordion = (faqId) => {
    setOpenAccordion((prev) => (prev === faqId ? null : faqId));
  };


  const accordionData = [
    {
      id: "collapseOne",
      question: "How does the AI meal scanning work?",
      answer:
        "Simply take a photo of your meal, and NutriAI's advanced AI technology instantly recognizes the food items and calculates nutritional values including calories, proteins, carbs, and fats. Our AI has been trained on thousands of meals to provide accurate results.",
    },
    {
      id: "collapseTwo",
      question: "Can I customize my meal plans?",
      answer:
        "Yes! NutriAI generates personalized weekly meal plans based on your dietary preferences, goals, and restrictions. You can easily customize meals, swap recipes, and adjust portions to fit your lifestyle.",
    },
    {
      id: "collapseThree",
      question: "How accurate is the nutrition tracking?",
      answer:
        "NutriAI uses advanced AI algorithms and a comprehensive food database to provide highly accurate nutritional information. Our system continuously learns and improves, achieving over 95% accuracy in meal recognition and nutrition calculations.",
    },
    {
      id: "collapseFour",
      question: "How do I get customer support?",
      answer:
        "You can reach our support team through the app's Help section or by emailing support@nutriai.pl. We typically respond within 24 hours and are here to help with any questions about features, tracking, or your nutrition journey.",
    },

    {
      id: "collapsefive",
      question: "What are the advantages of NutriAI?",
      answer:
        "NutriAI offers AI-powered meal scanning, personalized meal planning, recipe generation from ingredients, smart shopping lists, body composition analysis, and progress tracking with visual insights - all in one easy-to-use app.",
    },
    {
      id: "collapsesix",
      question: "Can I track my body composition?",
      answer:
        "Yes! NutriAI includes body composition tracking that monitors your weight, body fat percentage, muscle mass, and other key metrics. Visual charts help you track your progress over time and stay motivated.",
    },
    {
      id: "collapseseven",
      question: "Does NutriAI work offline?",
      answer:
        "While some features like meal scanning require internet connection for AI processing, you can view previously logged meals, access your meal plans, and browse saved recipes offline. Your data syncs automatically when you're back online.",
    },
    {
      id: "collapseeight",
      question: "Is my health data secure?",
      answer:
        "Absolutely! We take data security seriously. All your personal information and health data is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can delete your data at any time.",
    },
    {
      id: "collapsenine",
      question: "Can I generate recipes from ingredients I have?",
      answer:
        "Yes! NutriAI's recipe generator creates personalized recipes based on ingredients you have at home. Just input what's in your kitchen, and our AI will suggest delicious, healthy recipes that match your dietary preferences and goals.",
    },
  ];

  return (
    <div>
      <section className="row_am faq_section" id="faqsec">
        <div className="container">
          <div
            className="faq_blocks aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1500}
          >
            <div className="accordion" id="accordionExample">
              <div className="row">
                <div className="col-md-6">
                  {accordionData.slice(0,4).map((faq) => (
                    <div className="card" key={faq.id}>
                      <div className="card-header" id={`heading${faq.id}`}>
                        <h2 className="mb-0">
                          <button
                            className={`btn btn-link btn-block text-left ${
                              openAccordion === faq.id ? "" : "collapsed"
                            }`}
                            type="button"
                            onClick={() => toggleAccordion(faq.id)}
                            data-toggle="collapse"
                            data-target={`#${faq.id}`}
                            aria-expanded={openAccordion === faq.id}
                            aria-controls={faq.id}
                          >
                            {faq.question}
                            <span className="icons">
                              <i
                                className={`icofont-${
                                  openAccordion === faq.id ? "minus" : "plus"
                                }`}
                              ></i>
                            </span>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={faq.id}
                        className={`collapse ${
                          openAccordion === faq.id ? "show" : ""
                        }`}
                        aria-labelledby={`heading${faq.id}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-6">
                  {accordionData.slice(5,9).map((faq) => (
                    <div className="card" key={faq.id}>
                      <div className="card-header" id={`heading${faq.id}`}>
                        <h2 className="mb-0">
                          <button
                            className={`btn btn-link btn-block text-left ${
                               openAccordion=== faq.id ? "" : "collapsed"
                            }`}
                            type="button"
                            onClick={() => toggleAccordion(faq.id)}
                            data-toggle="collapse"
                            data-target={`#${faq.id}`}
                            aria-expanded={ openAccordion === faq.id}
                            aria-controls={faq.id}
                          >
                            {faq.question}
                            <span className="icons">
                              <i
                                className={`icofont-${
                                   openAccordion === faq.id ? "minus" : "plus"
                                }`}
                              ></i>
                            </span>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={faq.id}
                        className={`collapse ${ openAccordion === faq.id ? "show" : ""}`}
                        aria-labelledby={`heading${faq.id}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faqsection;
