
import { Link } from "react-router-dom"
import { Heart, Brain, BriefcaseBusiness, Users, Compass, ArrowRight, ShieldCheck, CalendarDays } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* Navbar */}
            <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <Heart size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700">
                                Live Life
                            </h2>
                            <p className="text-xs text-gray-500">
                                Counselling & Wellness
                            </p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>

                        <a href="#services" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            Services
                        </a>

                        <a href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            About
                        </a>

                        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            Login
                        </Link>

                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition">
                            Get Started
                        </Link>
                    </div>

                    <Link to="/login" className="md:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Login
                    </Link>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Heart size={16} />
                            Your well-being matters
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                            Supporting Your Well-being,
                            <span className="text-blue-600">Every Step of the Way.</span>
                        </h1>

                        <p className="text-gray-600 text-lg leading-8 mt-6 max-w-xl">
                            Take a positive step towards personal growth, healthier relationships,
                            and emotional well-being with professional counselling and guidance.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link to="/register" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-sm transition">
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <a href="#services" className="border border-gray-300 hover:border-blue-400 hover:bg-white px-6 py-3.5 rounded-xl font-semibold text-gray-700 transition">
                                Explore Services
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" />
                                Supportive environment
                            </span>
                            <span className="flex items-center gap-2">
                                <CalendarDays size={18} className="text-blue-600" />
                                Convenient appointments
                            </span>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-blue-100 rounded-[2rem] rotate-3"></div>

                        <div className="relative bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-blue-50">
                            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 text-white p-4 rounded-2xl">
                                        <Brain size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Your journey matters
                                        </h3>
                                        <p className="text-gray-500 mt-1">
                                            Take it one step at a time.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                        <Heart size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Personal well-being</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Find support for life's challenges.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Healthier relationships</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Work towards stronger connections.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="bg-orange-100 text-orange-700 p-2 rounded-lg">
                                        <Compass size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Personal growth</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Move forward with greater clarity.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-20 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            How we can help
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                            Support for every stage of life
                        </h2>

                        <p className="text-gray-600 mt-4 leading-7">
                            Explore our counselling and wellness services designed to support
                            your personal journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="group border border-gray-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition">
                                <Heart size={25} />
                            </div>
                            <h3 className="text-lg font-bold mt-5">
                                Personal Counselling
                            </h3>
                            <p className="text-gray-600 text-sm leading-6 mt-3">
                                Get support in navigating personal challenges and improving well-being.
                            </p>
                        </div>

                        <div className="group border border-gray-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition">
                            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl w-fit group-hover:bg-purple-600 group-hover:text-white transition">
                                <BriefcaseBusiness size={25} />
                            </div>
                            <h3 className="text-lg font-bold mt-5">
                                Career Counselling
                            </h3>
                            <p className="text-gray-600 text-sm leading-6 mt-3">
                                Explore your strengths and make informed career decisions.
                            </p>
                        </div>

                        <div className="group border border-gray-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition">
                            <div className="bg-green-100 text-green-600 p-3 rounded-xl w-fit group-hover:bg-green-600 group-hover:text-white transition">
                                <Users size={25} />
                            </div>
                            <h3 className="text-lg font-bold mt-5">
                                Family Counselling
                            </h3>
                            <p className="text-gray-600 text-sm leading-6 mt-3">
                                Build healthier communication and stronger relationships.
                            </p>
                        </div>

                        <div className="group border border-gray-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition">
                            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl w-fit group-hover:bg-orange-600 group-hover:text-white transition">
                                <Compass size={25} />
                            </div>
                            <h3 className="text-lg font-bold mt-5">
                                Life Coaching
                            </h3>
                            <p className="text-gray-600 text-sm leading-6 mt-3">
                                Set meaningful goals and work towards personal growth.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                        <Heart size={30} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        About Live Life
                    </h2>

                    <p className="text-gray-600 leading-8 mt-6">
                        Live Life is a counselling and wellness platform designed to make
                        accessing support and managing services simpler. Our goal is to
                        provide a welcoming experience where people can take positive steps
                        towards their personal well-being.
                    </p>

                    <Link to="/register" className="inline-flex items-center gap-2 mt-8 text-blue-600 font-semibold hover:text-blue-800 transition">
                        Start your journey
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl px-6 py-12 md:p-14 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Take the first step today
                    </h2>

                    <p className="text-blue-100 mt-4 max-w-xl mx-auto leading-7">
                        Begin your journey towards personal growth with support tailored to your needs.
                    </p>

                    <Link to="/register" className="inline-flex items-center gap-2 mt-7 bg-white hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold transition">
                        Create Your Account
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">Live Life</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Counselling & Wellness
                        </p>
                    </div>

                    <div className="flex gap-5 text-sm">
                        <Link to="/" className="hover:text-white transition">
                            Home
                        </Link>
                        <a href="#services" className="hover:text-white transition">
                            Services
                        </a>
                        <Link to="/login" className="hover:text-white transition">
                            Login
                        </Link>
                    </div>

                    <p className="text-sm text-gray-400">
                        © 2026 Live Life. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    )
}
