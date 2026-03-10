'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Button from '@/components/ui/Button'

const projects = [
    {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        image: '/portfolio/ecommerce.jpg',
        description: 'A full-featured e-commerce platform with payment integration and inventory management.',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
        liveLink: '#',
        githubLink: '#'
    },
    {
        title: 'Food Delivery App',
        category: 'Mobile App',
        image: '/portfolio/food-app.jpg',
        description: 'Cross-platform food delivery app with real-time tracking and push notifications.',
        technologies: ['React Native', 'Firebase', 'Redux'],
        liveLink: '#',
        githubLink: '#'
    },
    {
        title: 'Healthcare Portal',
        category: 'Web Application',
        image: '/portfolio/healthcare.jpg',
        description: 'Patient management system for healthcare providers with appointment scheduling.',
        technologies: ['React', 'Django', 'PostgreSQL'],
        liveLink: '#',
        githubLink: '#'
    },
    {
        title: 'Fitness Tracker',
        category: 'Mobile App',
        image: '/portfolio/fitness.jpg',
        description: 'iOS and Android app for tracking workouts and nutrition with social features.',
        technologies: ['Flutter', 'Firebase', 'HealthKit'],
        liveLink: '#',
        githubLink: '#'
    }
]

const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'E-Commerce']

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [selectedProject, setSelectedProject] = useState(null)

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Our <span className="text-blue-600">Portfolio</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Take a look at some of our recent projects. We've helped businesses across industries achieve their digital goals.
                    </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full transition-all ${activeCategory === category
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                {project.title.charAt(0)}
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                        {project.category}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 hover:text-blue-700"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-600 hover:text-gray-900"
                                    >
                                        <Github className="w-4 h-4 mr-1" />
                                        Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's create something amazing together. Contact us today to discuss your project.
                    </p>
                    <Button href="/contact" variant="primary" size="lg">
                        Get in Touch
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}