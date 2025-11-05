import { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Users, Rocket, Star, AlertCircle, Clock } from 'lucide-react';

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
      // Always use relative path - goes through Vite proxy in dev, OpenLiteSpeed proxy in production
      const apiUrl = '/api/beta-testers';
      
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
              Beta Program
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-nutri-blue-50 mb-12 max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience the future of AI-powered nutrition.
            Get exclusive early access, shape the product, and enjoy lifetime perks.
          </p>

          {!isSubmitted ? (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <span className="text-2xl">📱</span>
                    <span className="font-semibold">Android Beta Program</span>
                  </div>
                  <p className="text-sm text-green-600 text-center mt-2">
                    Apply for early access to NutriAI on Android
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-left text-gray-900 font-semibold mb-3 text-lg">
                    Enter your email to join the waitlist
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
                  {isLoading ? 'Joining...' : 'Join Beta Program'}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="w-20 h-20 bg-nutri-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Received!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for applying to the NutriAI beta program for{' '}
                <span className="font-semibold text-nutri-blue-500">
                  Android
                </span>.
                <br />
                Your application is now under review.
              </p>

              <div className="bg-gradient-to-r from-nutri-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-nutri-blue-500" />
                  Your Application Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Application Submitted</div>
                      <div className="text-sm text-gray-600">We've received your request!</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-nutri-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Under Review</div>
                      <div className="text-sm text-gray-600">Our team is reviewing your application</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Decision Email</div>
                      <div className="text-sm text-gray-600">You'll hear from us within 24-48 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 mb-6 text-left border-l-4 border-orange-400">
                <h3 className="font-semibold text-gray-900 mb-2">📧 Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent a confirmation email to your inbox. If approved, you'll receive another email with instructions to download the beta app.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 text-nutri-blue-500 font-semibold hover:text-nutri-blue-600 transition-colors"
              >
                Submit another application
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { icon: Sparkles, label: 'Early Access', desc: 'Be the first to try' },
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
              Join our exclusive community and help shape the future of nutrition
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
                description: 'Test new features before they launch to the public.',
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
                answer: 'We\'ll be rolling out invites in waves starting early 2026. Early sign-ups get priority access.',
              },
              {
                question: 'How long is the beta period?',
                answer: 'The beta program will run for approximately 3-6 months, giving you plenty of time to explore all features.',
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
