import React, { useState } from "react";

const Faq = () => {
  const [openAccordion, setOpenAccordion] = useState("collapseOne");
 
   const toggleAccordion = (faqId) => {
     setOpenAccordion((prev) => (prev === faqId ? null : faqId));
   };
 
  const accordionData = [
    {
      id: "collapseOne",
      question: "How to setup my account with app?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an.",
    },
    {
      id: "collapseTwo",
      question: "How to cancel my subscriptions?",
      answer:
        "Some placeholder content for the second accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapseThree",
      question: " How do I get my refund?",
      answer:
        " And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapseFour",
      question: "How to get customer support?",
      answer:
        " Some placeholder content for the second accordion panel. This panel is hidden by default.",
    },
  
    {
      id: "collapsefive",
      question: "What are the advantages of the app?",
      answer:
        " Some placeholder content for the second accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapsesix",
      question: " Any special benefits from the app?",
      answer:
        "  And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapseseven",
      question: "Any discount available for multiple users?",
      answer:
        " And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapseeight",
      question: "Are financial apps secure?",
      answer:
        " And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.",
    },
    {
      id: "collapsenine",
      question: "Will the app get updated in the basic package?",
      answer:
        "Some placeholder content for the second accordion panel. This panel is hidden by default.",
    },
  ];


  return (
    <div>
      <section className="row_am faq_section" id="faqsec">
        <div className="container">
          <div className="section_title aos-init aos-animate" data-aos="fade-up" data-aos-duration="1500">
            <span className="title_badge">FAQs</span>
            <h2>Questions & Answers</h2>
            <p> Lorem Ipsum is simply dummy text of the printing and typese tting indus orem Ipsum has beenthe standard dummy.</p>
          </div>
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
                            className={`btn btn-link btn-block text-left ${openAccordion === faq.id ? "" : "collapsed"
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
                                className={`icofont-${openAccordion === faq.id ? "minus" : "plus"
                                  }`}
                              ></i>
                            </span>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={faq.id}
                        className={`collapse ${openAccordion === faq.id ? "show" : ""
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
                            className={`btn btn-link btn-block text-left ${openAccordion=== faq.id ? "" : "collapsed"
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
                                className={`icofont-${openAccordion === faq.id ? "minus" : "plus"
                                  }`}
                              ></i>
                            </span>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={faq.id}
                        className={`collapse ${openAccordion === faq.id ? "show" : ""}`}
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
  )
}

export default Faq
