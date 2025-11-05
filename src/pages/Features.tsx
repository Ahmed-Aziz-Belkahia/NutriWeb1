import {
  UtensilsCrossed,
  ScanLine,
  Activity,
  Bot,
  Users,
  Camera,
  TrendingUp,
  Heart,
  Apple,
  Zap,
  Shield,
  Smartphone,
} from 'lucide-react';

export default function Features() {
  const mainFeatures = [
    {
      icon: UtensilsCrossed,
      title: 'AI Meal Planner',
      description: 'Generate personalized meal plans that fit your diet type, macros, and taste preferences — instantly.',
      benefits: [
        'Custom meal plans in seconds',
        'Adapts to your dietary restrictions',
        'Learns your taste preferences',
        'Shopping list auto-generation',
      ],
      color: 'bg-orange-500',
    },
    {
      icon: ScanLine,
      title: 'Food Scanner',
      description: 'Just snap a photo or scan a barcode. NutriAI breaks down the nutrients and gives you a smart "NutriScore."',
      benefits: [
        'Instant nutritional breakdown',
        'Barcode scanning for packaged foods',
        'Photo recognition for meals',
        'Smart health scoring system',
      ],
      color: 'bg-nutri-blue-500',
    },
    {
      icon: Activity,
      title: 'Wellness Tracker',
      description: 'Track your mood, hydration, sleep, and stress — and see how they connect to what you eat.',
      benefits: [
        'Holistic health monitoring',
        'Mood and energy tracking',
        'Sleep quality insights',
        'Stress level correlation',
      ],
      color: 'bg-blue-600',
    },
    {
      icon: Bot,
      title: 'AI Coach',
      description: 'Your 24/7 nutrition coach learns from your habits and nudges you gently toward better decisions.',
      benefits: [
        'Personalized daily guidance',
        'Habit formation support',
        'Real-time recommendations',
        'Adaptive learning system',
      ],
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      title: 'Community & Challenges',
      description: 'Join like-minded users, set shared goals, and celebrate milestones together.',
      benefits: [
        'Connect with wellness community',
        'Group challenges and competitions',
        'Share recipes and tips',
        'Celebrate achievements together',
      ],
      color: 'bg-pink-500',
    },
  ];

  const additionalFeatures = [
    { icon: Camera, title: 'Visual Food Diary', desc: 'Photo-based meal logging', color: 'bg-nutri-blue-500' },
    { icon: TrendingUp, title: 'Progress Analytics', desc: 'Detailed health metrics', color: 'bg-green-500' },
    { icon: Heart, title: 'Health Integration', desc: 'Sync with fitness apps', color: 'bg-red-500' },
    { icon: Apple, title: 'Recipe Library', desc: '10,000+ healthy recipes', color: 'bg-orange-500' },
    { icon: Zap, title: 'Quick Logging', desc: 'Log meals in seconds', color: 'bg-yellow-500' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data stays secure', color: 'bg-blue-600' },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-nutri-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Smartphone className="w-4 h-4" />
            <span>App Features</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Everything You Need for Better Nutrition
          </h1>
          <p className="text-xl text-nutri-blue-50 leading-relaxed">
            Powerful AI-driven features designed to make healthy eating effortless and enjoyable.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className={`inline-flex items-center space-x-2 ${feature.color} text-white px-4 py-2 rounded-full text-sm font-semibold mb-6`}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span>Featured</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div
                          className={`w-6 h-6 ${feature.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative">
                    <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                      <div
                        className={`w-24 h-24 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8`}
                      >
                        <feature.icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="space-y-4">
                        {feature.benefits.slice(0, 3).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-4 bg-nutri-bg rounded-full"
                            style={{ width: `${100 - idx * 15}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              And Much More...
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover all the powerful tools that make NutriAI your complete nutrition companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nutri-blue-500 rounded-3xl p-12 md:p-16 text-center text-white shadow-xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Experience the Power of AI-Driven Nutrition
            </h2>
            <p className="text-xl text-nutri-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who have transformed their health with NutriAI's intelligent features.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-nutri-blue-500 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start Free Trial
              </a>
              <a
                href="/about"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-nutri-blue-500 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Seamless Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              NutriAI works with your favorite health and fitness platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Apple Health',
              'Google Fit',
              'Fitbit',
              'MyFitnessPal',
              'Strava',
              'Garmin',
              'Samsung Health',
              'Whoop',
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-nutri-blue-500 rounded-2xl mx-auto mb-3" />
                <div className="font-semibold text-gray-900 text-sm">{platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
