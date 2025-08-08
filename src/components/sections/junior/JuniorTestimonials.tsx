import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const JuniorTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      year: "B.Tech CSE, 1st Year",
      content: "Campus Connect made my admission process so much easier! The seniors were incredibly helpful and guided me through every step. I couldn't have done it without them.",
      rating: 5,
      avatar: "https://placehold.co/100x100/A1B5D6/4A3F35?text=RS"
    },
    {
      name: "Priya Patel",
      year: "B.Tech ECE, 1st Year", 
      content: "Being from a different state, I was completely lost. The document verification service and campus navigation help from seniors was a lifesaver!",
      rating: 5,
      avatar: "https://placehold.co/100x100/E8A09A/4A3F35?text=PP"
    },
    {
      name: "Arjun Kumar",
      year: "B.Tech ME, 1st Year",
      content: "The seniors not only helped with admission but also shared valuable tips about college life, hostel facilities, and study resources. Highly recommended!",
      rating: 5,
      avatar: "https://placehold.co/100x100/B8E6B8/4A3F35?text=AK"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            What Juniors Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from students who successfully navigated their admission process with our help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-purple-500 opacity-50 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.year}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JuniorTestimonials;