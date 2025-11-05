import { ArrowRight, Brain, Sparkles, TrendingUp, Users, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white text-nutri-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI Technology</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Eat Better. Feel Better.
            <br />
            <span className="text-nutri-blue-500">
              Think Smarter.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            NutriAI is your personal AI nutritionist — helping you make data-driven food choices,
            balance your lifestyle, and reach your wellness goals effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/contact"
              className="group px-8 py-4 bg-nutri-blue-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-md hover:shadow-xl transition-all"
            >
              Explore Features
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '1M+', label: 'Meals Tracked' },
              { value: '95%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'AI Support' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-nutri-blue-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How NutriAI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to transform your nutrition journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'Smart Analysis',
                description: 'NutriAI analyzes your habits, preferences, and health goals to build your personalized nutrition profile.',
              },
              {
                icon: Sparkles,
                title: 'AI Recommendations',
                description: 'Receive personalized meal suggestions, nutrition scores, and daily insights tailored to your needs.',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                description: 'Watch your health metrics evolve through clear, visual dashboards that motivate you.',
              },
              {
                icon: Globe,
                title: 'Integrated Support',
                description: 'Connect with wearables, smart fridges, or fitness apps for a unified wellness ecosystem.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-nutri-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <step.icon className="w-12 h-12 text-nutri-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Join the Movement
              </h2>
              <p className="text-xl text-nutri-blue-50 mb-8 leading-relaxed">
                Together, we're building a world where better eating is effortless.
                Join NutriAI and discover how small, smart changes can transform your health.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized AI nutrition coaching',
                  'Track meals, mood, and wellness metrics',
                  'Join a supportive community',
                  'Achieve your health goals faster',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-lg text-nutri-blue-50">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-nutri-blue-500 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Download the App</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, value: 'Community', desc: 'Join like-minded users' },
                { icon: Heart, value: 'Wellness', desc: 'Holistic health tracking' },
                { icon: Brain, value: 'AI Coach', desc: '24/7 personalized guidance' },
                { icon: TrendingUp, value: 'Results', desc: 'Proven transformation' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/20 transition-colors"
                >
                  <item.icon className="w-10 h-10 text-white mb-4" />
                  <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-nutri-blue-50 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Start your journey with NutriAI today and experience the power of AI-driven nutrition.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-nutri-blue-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
