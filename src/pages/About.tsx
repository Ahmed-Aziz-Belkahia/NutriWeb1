import { Target, Eye, Heart, Users, Leaf, Shield, Globe2, Sparkles, Brain } from 'lucide-react';

export default function About() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-nutri-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">About NutriAI</h1>
          <p className="text-xl sm:text-2xl text-nutri-blue-50 leading-relaxed">
            We believe nutrition should be personal, precise, and empowering.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-nutri-blue-50 text-nutri-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Brain className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Your Wellness Journey
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  At NutriAI, we believe nutrition should be personal, precise, and empowering.
                  Our mission is to use the power of artificial intelligence and behavioral science
                  to help every person understand their body, build healthier habits, and make
                  smarter dietary choices — without guesswork or guilt.
                </p>
                <p>
                  We're not just about calories. We're about connection — between what you eat,
                  how you feel, and who you want to become.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Heart, label: 'Personal', color: 'bg-red-500' },
                { icon: Target, label: 'Precise', color: 'bg-nutri-blue-500' },
                { icon: Sparkles, label: 'Empowering', color: 'bg-yellow-500' },
                { icon: Shield, label: 'Trustworthy', color: 'bg-blue-600' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-nutri-blue-500 rounded-3xl p-12 text-white shadow-xl">
                <Eye className="w-16 h-16 mb-6" />
                <h3 className="text-3xl font-bold mb-4">We envision a world where...</h3>
                <ul className="space-y-4">
                  {[
                    'Everyone has access to personalized nutrition guidance',
                    'Decisions are built on real data, not one-size-fits-all advice',
                    'Technology becomes your ally in wellness',
                    'AI is intuitive, supportive, and always learning with you',
                  ].map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-nutri-blue-50 text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-nutri-blue-50 text-nutri-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Eye className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Future of Nutrition
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We envision a world where everyone has access to personalized nutrition guidance —
                built on real data, not one-size-fits-all advice.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With NutriAI, technology becomes your ally in wellness — intuitive, supportive,
                and always learning with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Transparency',
                description: 'We believe you deserve to know what\'s in your food and how it affects you.',
                color: 'bg-blue-500',
              },
              {
                icon: Sparkles,
                title: 'Empowerment',
                description: 'Our AI guides — it doesn\'t dictate. You stay in control of your journey.',
                color: 'bg-nutri-blue-500',
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'NutriAI promotes mindful choices for your health and the planet\'s.',
                color: 'bg-green-500',
              },
              {
                icon: Users,
                title: 'Inclusivity',
                description: 'Nutrition should fit everyone — all bodies, all lifestyles, all cultures.',
                color: 'bg-orange-500',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Who It's For</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              NutriAI is designed for everyone on a wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Health-conscious individuals looking for smarter food tracking',
              'Fitness enthusiasts optimizing macros and recovery',
              'People managing specific diets (vegan, keto, gluten-free, etc.)',
              'Anyone ready to turn nutrition confusion into clarity',
            ].map((audience, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-8 h-8 bg-nutri-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Globe2 className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-nutri-blue-50 mb-10 leading-relaxed">
            Together, we're building a world where better eating is effortless.
            Join NutriAI and discover how small, smart changes can transform your health.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-nutri-blue-500 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>
    </div>
  );
}
