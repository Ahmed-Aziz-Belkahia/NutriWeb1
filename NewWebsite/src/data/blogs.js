import author_01 from "../assets/images/authore_01.png";
import editorchoice from "../assets/images/editor-choice.png";

export const blogs = [
  {
    id: 1,
    slug: "how-to-stay-healthy-when-youre-busy",
    title: "How to Stay Healthy When You're Busy",
    category: "Health & Wellness",
    excerpt: "In today's fast-paced world, finding time to take care of your health can feel impossible. Learn simple strategies to maintain wellness even on your busiest days.",
    author: {
      name: "NutriAI Team",
      title: "Nutrition & Wellness",
      image: author_01
    },
    date: "6 Nov, 2025",
    comments: 0,
    views: 12,
    image: "/assets/images/blog1.jpg",
    featured: true,
    content: {
      intro: "In today's fast-paced world, finding time to take care of your health can feel impossible. Between work, family, and social commitments, eating right and staying active often take a backseat. But maintaining a healthy lifestyle doesn't have to mean overhauling your schedule — it's about small, smart choices that fit your daily rhythm. Here's how you can stay healthy, even when life gets hectic.",
      sections: [
        {
          heading: "1. Prioritize Smart Nutrition",
          text: "When you're busy, food becomes fuel — and it's easy to grab whatever's most convenient. Instead, plan simple, nutrient-dense meals that require little prep.",
          points: [
            { title: "Batch cook once a week:", text: "Prepare grains, proteins, and veggies in bulk." },
            { title: "Keep healthy snacks handy:", text: "Nuts, fruits, and yogurt prevent unhealthy impulse eating." },
            { title: "Use smart tools like NutriAI:", text: "Apps like NutriAI help track your nutrition and suggest meals that match your schedule and goals." }
          ]
        },
        {
          heading: "2. Move Whenever You Can",
          text: "You don't need a gym to stay active — just consistency.",
          points: [
            { title: "Micro workouts:", text: "10–15 minutes of stretching, squats, or brisk walking between meetings can make a big difference." },
            { title: "Active breaks:", text: "Take calls while walking or use the stairs instead of the elevator." },
            { title: "Set reminders:", text: "Let your device (or NutriAI!) nudge you to move every hour." }
          ]
        },
        {
          heading: "3. Make Rest and Hydration Non-Negotiable",
          text: "Your body can't perform without recovery.",
          points: [
            { title: "Sleep at least 7 hours:", text: "Consistent rest improves focus, energy, and metabolism." },
            { title: "Drink more water:", text: "Keep a reusable bottle nearby — aim for one glass every hour." },
            { title: "Unplug before bed:", text: "Reduce screen time 30 minutes before sleeping to improve sleep quality." }
          ]
        },
        {
          heading: "4. Let Technology Support You",
          text: "AI-driven apps like NutriAI are designed for people who don't have hours to plan meals or track macros. With personalized recommendations, automatic food logging, and reminders, NutriAI keeps you on track without adding extra work.",
          points: []
        }
      ],
      highlight: "Staying healthy isn't about perfection — it's about balance and consistency.",
      conclusion: "With a few mindful habits and the right tools, you can fuel your body, stay active, and feel your best — even on your busiest days. Download NutriAI today and start making health a seamless part of your routine."
    }
  },
  {
    id: 2,
    slug: "from-vision-to-beta-the-story-behind-nutri",
    title: "From Vision to Beta: The Story Behind Nutri",
    category: "Company News",
    excerpt: "A simple idea that grew into something bigger. Discover how Nutri was built with simplicity and purpose to make healthy eating feel simple again.",
    author: {
      name: "NutriAI Team",
      title: "Product & Development",
      image: author_01
    },
    date: "6 Nov, 2025",
    comments: 0,
    views: 8,
    image: "/assets/images/blog.jpg",
    featured: false,
    content: {
      intro: "Nutri began with one goal in mind — to make healthy eating feel simple again. Many people want to eat better, but tracking meals and planning nutrition often feels overwhelming. We wanted to change that by creating something easy, intuitive, and genuinely useful. What started as a small idea has grown into a complete app designed to help people build better habits and understand what works for them.",
      sections: [
        {
          heading: "Building Nutri with Simplicity and Purpose",
          text: "From day one, our focus was clear: keep it simple and make it meaningful. We designed Nutri to be more than just another nutrition tracker. Every feature, from meal planning to hydration reminders, was built to help users find balance without the stress of numbers or strict routines. We worked closely with early testers and nutrition experts to make sure Nutri feels natural to use and truly supports your goals.",
          points: []
        },
        {
          heading: "Opening the Beta: Try Nutri for Free",
          text: "After months of testing and refining, Nutri is officially open for beta access. This is your chance to be among the first to experience the app and help shape its future.",
          points: [
            { title: "iOS Users:", text: "You can download Nutri directly from the App Store." },
            { title: "Android Users:", text: "Join the waitlist here. Approval usually takes around 20 minutes, and once confirmed, you will receive full access to the app for free." },
            { title: "Beta Benefits:", text: "Everyone who joins now can use Nutri without any cost during the beta phase. You can also fill out our feedback form after testing to receive three additional months of free access when the app officially launches." }
          ]
        },
        {
          heading: "Looking Ahead: What Comes Next",
          text: "Beta testing is just the beginning. Our team is already working on new features to make Nutri even more powerful and personal.",
          points: [
            { title: "Smart meal suggestions:", text: "Tailored to your preferences and dietary needs." },
            { title: "Detailed progress insights:", text: "Track your journey with visual analytics and trends." },
            { title: "Community support:", text: "Connect with others on similar wellness journeys." },
            { title: "Multi-device syncing:", text: "Keep your data connected everywhere you go." }
          ]
        }
      ],
      highlight: "Nutri is more than an app — it is a community built around real people who want to eat well, live balanced, and make consistent progress.",
      conclusion: "Your feedback during this beta phase will help us shape the future of digital nutrition. Join the beta today, start your journey, and be part of the story as Nutri evolves."
    }
  }
];

export const getFeaturedBlog = () => {
  return blogs.find(blog => blog.featured) || blogs[0];
};

export const getBlogById = (id) => {
  return blogs.find(blog => blog.id === parseInt(id));
};

export const getBlogBySlug = (slug) => {
  return blogs.find(blog => blog.slug === slug);
};
