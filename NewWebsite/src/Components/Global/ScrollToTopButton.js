import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position
  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      // Show button after 200px scroll
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add event listener for scroll event
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            height:"50px",
            width:"50px",
            right: "30px",
            bottom: "75px",
            backgroundColor: " #4A90E2",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "0px 15px",
            cursor: "pointer",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
