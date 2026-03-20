import React from 'react';
import { Leaf, Recycle, HeartHandshake, Lightbulb } from 'lucide-react'; // Importing Lucide icons for visual appeal
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate(); // Accept setCurrentPage as a prop
  return (
    <section className="py-8">
        {/* Hero Section for About Page */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16 md:py-24 flex items-center justify-center min-h-[40vh] rounded-lg shadow-lg mb-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
                    Our Story: Nurturing a Greener Tomorrow
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-200">
                    At Green Turtle, we believe every small step towards sustainability makes a monumental difference. Discover our passion for eco-conscious living.
                </p>
            </div>
        </div>

        {/* About EcoMart - Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">About Green Turtle 🐢</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                    {/* Updated image tag with a path to a custom image */}
                    <img src={`${process.env.PUBLIC_URL}/mission.jpg`} alt="Our Mission" className="rounded-lg shadow-xl w-full h-auto object-cover"></img>
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center md:justify-start">
                        <Leaf className="w-7 h-7 text-green-600 mr-3" /> Our Mission
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Green Turtle is your dedicated online marketplace for sustainable and eco-friendly products. Our mission is to make conscious consumerism accessible and convenient for everyone. We believe that every purchase can be a step towards a healthier planet.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We carefully curate a wide range of products, from organic apparel and reusable household items to renewable energy gadgets, ensuring they meet strict environmental and ethical standards. Our dropshipping model allows us to offer a diverse selection while minimizing waste and inventory costs.
                    </p>
                </div>
            </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 md:p-10 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center p-4">
                    <Recycle className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
                    <p className="text-gray-600">Committed to products that protect our planet's future.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <HeartHandshake className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Integrity</h3>
                    <p className="text-gray-600">Transparent and ethical practices in every step.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <Lightbulb className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                    <p className="text-gray-600">Constantly seeking new ways to be greener.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <Leaf className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
                    <p className="text-gray-600">Building a network of conscious consumers.</p>
                </div>
            </div>
        </div>

        {/* Call to Action / Join Us Section */}
        <div className="bg-green-100 rounded-lg shadow-lg p-6 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join the Green Turtle Movement!</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                Every choice matters. Join us in building a more sustainable future, one eco-friendly product at a time.
            </p>
            {/* Changed to use setCurrentPage for internal routing */}
            <button onClick={() => navigate('/contact')} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
                Get in Touch
            </button>
        </div>
    </section>
)};

export default AboutPage;
