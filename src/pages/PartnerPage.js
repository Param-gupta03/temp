import React, { useState, useContext } from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const PartnerPage = () => {
    // Get everything from Context (no props)
    const { supabase, showMessage, setIsGeneratingImage } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        contact_name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.contact_name || !formData.email) {
            showMessage('Please fill in all required fields.');
            return;
        }

        showMessage('Sending partnership inquiry...');
        setIsGeneratingImage(true);

        try {
            const { error } = await supabase
                .from('partner_inquiries')
                .insert([formData]);

            if (error) {
                console.error("Supabase insert error:", error);
                showMessage(error.message || 'Failed to send inquiry.');
            } else {
                showMessage('Partnership inquiry submitted successfully!');
                setFormData({ contact_name: '', email: '', phone: '', message: '' });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
                Become a Green Turtle Partner
            </h2>

            <p className="text-lg text-gray-700 text-center mb-8">
                Join us in creating a greener future. If your brand aligns with our mission, fill out the form below and let’s connect.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Contact Person's Name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Phone (Optional)
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Your Phone Number"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Message
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Tell us more about your brand and why you're a good fit for Green Turtle."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md"
                >
                    Submit Inquiry
                </button>
            </form>

            <button
                onClick={() => navigate('/products')}
                className="mt-8 text-green-700 hover:text-green-900 font-semibold py-2 px-4 rounded-md transition duration-300"
            >
                ← Back to Products
            </button>
        </section>
    );
};

export default PartnerPage;