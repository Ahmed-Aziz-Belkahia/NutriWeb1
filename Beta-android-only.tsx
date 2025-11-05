import { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Users, Rocket, Star, AlertCircle, Smartphone } from 'lucide-react';

export default function Beta() {
  const [email, setEmail] = useState('');
  const [platform] = useState<'android'>('android');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Use relative path or full URL based on environment
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/beta-testers'
        : '/api/beta-testers';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, platform }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('This email is already registered for beta testing!');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Error submitting beta signup:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutri-blue-500 to-nutri-blue-600">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-nutri-blue-300 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Rocket className="w-4 h-4" />
            <span>Limited Spots Available</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Join the NutriAI
            <br />
            <span className="text-nutri-blue-100">
              Android Beta
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-nutri-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience the future of AI-powered nutrition on Android.
            Get exclusive early access, shape the product, and enjoy lifetime perks.
          </p>

          <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-semibold mb-8">
            <Smartphone className="w-5 h-5" />
            <span>Android Beta Testing • iOS Already Available on App Store</span>
          </div>

          {!isSubmitted ? (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-left text-gray-900 font-semibold mb-3 text-lg">
                    Enter your email to join the Android beta
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-nutri-blue-500 focus:outline-none text-lg transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mb-6 flex items-center justify-center text-red-600 bg-red-50 p-3 rounded-2xl">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-nutri-blue-500 text-white rounded-full font-bold text-lg hover:bg-nutri-blue-600 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? 'Joining...' : 'Join Android Beta'}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We've received your request to join the NutriAI Android beta program.
                <br />
                Check your inbox for next steps.
              </p>
              <div className="bg-nutri-blue-50 rounded-2xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>Check your email for detailed instructions and beta link</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>Click the Google Play Store link to access the app</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>Download and start using the NutriAI Android app!</span>
                  </li>
                </ol>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 text-nutri-blue-500 font-semibold hover:text-nutri-blue-600 transition-colors"
              >
                Submit another email
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { icon: Sparkles, label: 'Early Access', desc: 'Be the first to try Android features' },
              { icon: Users, label: 'Shape the Product', desc: 'Your feedback matters' },
              { icon: Star, label: 'Lifetime Perks', desc: 'Exclusive benefits' },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <item.icon className="w-10 h-10 text-white mb-3 mx-auto" />
                <div className="text-lg font-bold text-white mb-1">{item.label}</div>
                <div className="text-sm text-nutri-blue-100">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Beta Testers Get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our exclusive Android beta community and help shape the future of nutrition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Premium Access',
                description: 'Full access to all premium features during the beta period at no cost.',
                color: 'bg-nutri-blue-500',
              },
              {
                title: 'Priority Support',
                description: 'Direct line to our team for questions, feedback, and feature requests.',
                color: 'bg-purple-500',
              },
              {
                title: 'Exclusive Discord',
                description: 'Join our private beta community to connect with other early adopters.',
                color: 'bg-pink-500',
              },
              {
                title: 'Early Feature Access',
                description: 'Test new Android features before they launch to the public.',
                color: 'bg-orange-500',
              },
              {
                title: 'Founder Benefits',
                description: 'Special lifetime discounts and perks as a thank you for being early.',
                color: 'bg-green-500',
              },
              {
                title: 'Shape the Product',
                description: 'Your feedback directly influences our product roadmap and priorities.',
                color: 'bg-blue-600',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 ${benefit.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 mt-12 text-left">
            {[
              {
                question: 'When does the beta program start?',
                answer: 'We\'re rolling out Android beta access immediately. Sign up now to get instant access!',
              },
              {
                question: 'What about iOS?',
                answer: 'NutriAI is already available on the iOS App Store! This beta program is specifically for testing new Android features.',
              },
              {
                question: 'How long is the beta period?',
                answer: 'The Android beta program will run for approximately 3-6 months, giving you plenty of time to explore all features.',
              },
              {
                question: 'Is the beta really free?',
                answer: 'Yes! Beta testers get complete free access to all premium features during the testing period.',
              },
              {
                question: 'What happens after beta ends?',
                answer: 'Beta testers receive exclusive lifetime discounts and early access to future features as a thank you.',
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. You can opt out of the beta program at any time with no obligations.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
