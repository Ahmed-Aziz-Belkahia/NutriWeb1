import { Mail, MessageSquare, Send, MapPin, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="overflow-hidden">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-nutri-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-nutri-blue-50 leading-relaxed">
            Have questions, feedback, or partnership ideas? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="bg-nutri-bg border-2 border-nutri-blue-500 rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-nutri-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-nutri-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-nutri-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-nutri-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-nutri-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-nutri-blue-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'hello@nutriai.app',
                    link: 'mailto:hello@nutriai.app',
                    color: 'bg-nutri-blue-500',
                  },
                  {
                    icon: MessageSquare,
                    title: 'Social Media',
                    content: '@NutriAI',
                    link: '#',
                    color: 'bg-blue-500',
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    content: '+1 (555) 123-4567',
                    link: 'tel:+15551234567',
                    color: 'bg-purple-500',
                  },
                  {
                    icon: MapPin,
                    title: 'Location',
                    content: 'San Francisco, CA',
                    link: '#',
                    color: 'bg-orange-500',
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start space-x-4 p-6 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all group"
                  >
                    <div
                      className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-nutri-blue-500 rounded-3xl p-8 text-white">
                <Clock className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Business Hours</h3>
                <div className="space-y-2 text-nutri-blue-50">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: 'Is NutriAI available on both iOS and Android?',
                answer: 'Yes! NutriAI is available for download on both the App Store and Google Play Store.',
              },
              {
                question: 'How much does NutriAI cost?',
                answer: 'We offer a free tier with basic features, and premium plans starting at $9.99/month with advanced AI coaching.',
              },
              {
                question: 'Is my health data secure?',
                answer: 'Absolutely. We use bank-level encryption and never share your personal health data with third parties.',
              },
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription at any time with no questions asked. Your data remains accessible.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nutri-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-nutri-blue-50 mb-10 leading-relaxed">
            Download NutriAI today and begin your journey to better health.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-nutri-blue-500 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Download for iOS
            </button>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-nutri-blue-500 transition-all">
              Download for Android
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
