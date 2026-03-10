'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, Smartphone, ShoppingCart, Code, Palette, TrendingUp, ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const servicesData = {
    'web': {
        icon: Globe,
        title: 'Web Development',
        description: 'Custom websites, web applications, and e-commerce solutions built with modern technologies.',
        longDescription: 'We create stunning, responsive websites that drive business growth. Our web development services include everything from simple landing pages to complex web applications.',
        features: [
            'Custom Website Development',
            'E-commerce Solutions',
            'Progressive Web Apps (PWA)',
            'CMS Integration',
            'API Development',
            'Database Design'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'Laravel', 'WordPress'],
        price: 'Project based'
    },
    'app': {
        icon: Smartphone,
        title: 'App Development',
        description: 'Native and cross-platform mobile apps for iOS and Android with stunning UI/UX.',
        longDescription: 'Transform your ideas into powerful mobile applications. We build high-performance apps that users love.',
        features: [
            'iOS App Development',
            'Android App Development',
            'Cross-Platform Apps',
            'UI/UX Design',
            'App Store Optimization',
            'Maintenance & Support'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
        price: 'Project based'
    },
    'ecommerce': {
        icon: ShoppingCart,
        title: 'E-Commerce Solutions',
        description: 'Complete online store setup with payment integration and inventory management.',
        longDescription: 'Launch your online store quickly with our e-commerce solutions. We handle everything from setup to launch.',
        features: [
            'Online Store Setup',
            'Payment Gateway Integration',
            'Inventory Management',
            'Shopping Cart Development',
            'Order Management System',
            'Customer Portal'
        ],
        technologies: ['Shopify', 'WooCommerce', 'Magento', 'Custom Solutions'],
        price: 'Project based'
    },
    'design': {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
        longDescription: 'Create memorable user experiences with our design services. We focus on usability and aesthetics.',
        features: [
            'User Research',
            'Wireframing',
            'Prototyping',
            'Visual Design',
            'Interaction Design',
            'Usability Testing'
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        price: 'Project based'
    }
}

export default function ServicePage() {
    const params = useParams()
    const slug = params.slug as string
    const service = servicesData[slug as keyof typeof servicesData]

    if (!service) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
                    <Button href="/services">Back to Services</Button>
                </div>
            </div>
        )
    }

    const Icon = service.icon

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
                    Back to Services
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Icon className="w-8 h-8 text-white" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {service.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-8">
                                {service.longDescription}
                            </p>

                            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold mb-6">Technologies We Use</h2>
                                <div className="flex flex-wrap gap-3">
                                    {service.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-lg sticky top-24"
                        >
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-blue-600">{service.price}</span>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Get a customized quote for your specific requirements.
                            </p>

                            <Button href="/contact" variant="primary" size="lg" fullWidth>
                                Get Started
                            </Button>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="font-semibold mb-4">Why Choose Us?</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Experienced Team
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Timely Delivery
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        24/7 Support
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}