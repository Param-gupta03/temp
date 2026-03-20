import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ContactPage = () => {
    // Get everything from Context
    const { supabase, showMessage, setIsGeneratingImage } = useContext(AppContext);

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Name || !formData.Email || !formData.Message) {
            showMessage('Please fill in all fields.');
            return;
        }

        showMessage('Sending message...');
        setIsGeneratingImage(true);

        try {
            const { error } = await supabase
                .from('contact_inquiries')
                .insert([formData]);

            if (error) {
                console.error(error);
                showMessage(error.message || 'Failed to send message.');
            } else {
                showMessage('Your message has been sent successfully!');
                setFormData({ Name: '', Email: '', Message: '' });
            }
        } catch (err) {
            console.error(err);
            showMessage('An unexpected error occurred.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">Get in Touch</h2>
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-1/2 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                            <textarea
                                name="Message"
                                rows="6"
                                value={formData.Message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                                placeholder="How can we help you?"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="md:w-1/2 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Information</h3>
                    <div className="space-y-4 text-gray-700">
                        <p className="flex items-center">
                            <MapPin className="w-6 h-6 text-green-600 mr-3" />
                            Delhi Technological University, Shahbad Daulatpur Village
                            <br />Rohini, New Delhi-110042
                        </p>
                        <p className="flex items-center">
                            <Phone className="w-6 h-6 text-green-600 mr-3" />
                            +91 9254579730
                        </p>
                        <p className="flex items-center">
                            <Mail className="w-6 h-6 text-green-600 mr-3" />
                            greenturtle.marketplace@gmail.com
                        </p>
                    </div>

                    <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6995.957613964086!2d77.11045685582977!3d28.7500497068004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0138a74f7da7%3A0xf09fad683c23bd5d!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1754087038301!5m2!1sen!2sin"
                            width="100%"
                            height="250"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="Delhi Technological University Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;