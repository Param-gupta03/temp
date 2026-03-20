import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Get from global context
    const { supabase, showMessage, setIsGeneratingImage } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            showMessage('Please enter your email address.');
            return;
        }

        showMessage('Subscribing...');
        setIsGeneratingImage(true);

        try {
            const { error } = await supabase
                .from('subscriptions')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    showMessage('This email is already subscribed.');
                } else {
                    showMessage(error.message || 'Subscription failed.');
                }
            } else {
                showMessage('Subscription successful!');
                setEmail('');
            }
        } catch (err) {
            console.error(err);
            showMessage('An unexpected error occurred.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-md mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Stay Updated with Green Turtle!</h2>
            <p className="text-lg text-gray-700 mb-8">
                Enter your email address below to receive exciting news, launch updates, and exclusive offers from us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email-subscribe" className="sr-only">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            id="email-subscribe"
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-md">
                    Subscribe Now
                </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Your email will only be used for Green Turtle updates.
            </p>

            <button
                onClick={() => navigate('/')}
                className="mt-8 text-green-700 hover:text-green-900 font-semibold py-2 px-4 rounded-md transition duration-300"
            >
                ← Back
            </button>
        </section>
    );
};

export default SubscriptionPage;