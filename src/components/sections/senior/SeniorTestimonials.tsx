import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart } from "lucide-react";

const SeniorTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Singh",
      year: "B.Tech CSE, 1st Year",
      content: "The seniors on Campus Connect are amazing! They helped me with every step of my admission process and made me feel so welcome. I couldn't have done it without their guidance.",
      rating: 5,
      avatar: "https://placehold.co/100x100/A1B5D6/4A3F35?text=PS",
      seniorMentioned: "Arjun Sharma"
    },
    {
      name: "Rahul Kumar",
      year: "B.Tech ME, 1st Year", 
      content: "Being from a rural background, I was completely lost about the admission process. The document verification service and personal guidance from seniors was a lifesaver!",
      rating: 5,
      avatar: "https://placehold.co/100x100/E8A09A/4A3F35?text=RK",
      seniorMentioned: "Vikash Singh"
    },
    {
      name: "Sneha Reddy",
      year: "B.Tech ECE, 2nd Year",
      content: "Not only did seniors help with admission, but they've been mentoring me throughout my first year. Their career advice and study tips have been invaluable!",
      rating: 5,
      avatar: "https://placehold.co/100x100/B8E6B8/4A3F35?text=SR",
      seniorMentioned: "Ananya Gupta"
    },
    {
      name: "Vikram Shah",
      year: "B.Tech CSE, 1st Year",
      content: "The seniors are so approachable and friendly. They shared real insights about college life that you can't find anywhere else. Made my transition to college so much smoother!",
      rating: 5,
      avatar: "https://placehold.co/100x100/F4D03F/4A3F35?text=VS",
      seniorMentioned: "Kartik Shah"
    }
  ];

  const seniorFeedback = [
    {
      name: "Arjun Sharma",
      role: "Senior Mentor, CSE '24",
      content: "Mentoring juniors through Campus Connect has been incredibly rewarding. Seeing them succeed and knowing I played a part in their journey gives me immense satisfaction.",
      avatar: "https://placehold.co/100x100/8E44AD/FFFFFF?text=AS"
    },
    {
      name: "Priya Patel",
      role: "Senior Mentor, ME '25",
      content: "I love how the platform makes it easy to help juniors. The structured approach ensures that no student feels lost during their admission process.",
      avatar: "https://placehold.co/100x100/E67E22/FFFFFF?text=PP"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Success Stories & Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your guidance is transforming junior students' college experience and career paths
          </p>
        </div>

        {/* Junior Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            What Juniors Say About Your Mentoring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-blue-500 opacity-50 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.year}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-blue-600 font-medium">Mentored by</p>
                      <p className="text-sm font-semibold text-blue-700">{testimonial.seniorMentioned}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Senior Feedback */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Seniors Love Mentoring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seniorFeedback.map((feedback, index) => (
              <Card key={index} className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-red-500 mr-2" />
                    <Quote className="h-6 w-6 text-green-500 opacity-50" />
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{feedback.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img
                      src={feedback.avatar}
                      alt={feedback.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-green-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                      <p className="text-sm text-green-600">{feedback.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Numbers */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">Your Collective Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Students Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.8/5</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Hours Contributed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SeniorTestimonials;