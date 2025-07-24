import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Bot, 
  Cpu, 
  Wifi, 
  Zap, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  MessageCircle,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Lightbulb
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false); // Default to light mode
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAmbassadorForm, setShowAmbassadorForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campusName: '',
    experience: '',
    image: null as File | null
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Application submitted:', formData);
    setShowAmbassadorForm(false);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      campusName: '',
      experience: '',
      image: null
    });
  };

  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Robotics Prototyping",
      description: "From concept to reality - we build intelligent robotic systems that solve real-world problems.",
      features: ["Custom Robot Design", "AI Integration", "Automation Solutions"]
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "IoT Development",
      description: "Connect your world with smart IoT solutions that enhance efficiency and provide valuable insights.",
      features: ["Smart Sensors", "Cloud Integration", "Real-time Analytics"]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Custom R&D Solutions",
      description: "Innovative research and development tailored to your unique challenges and business goals.",
      features: ["Research Consulting", "Proof of Concepts", "Technology Roadmaps"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Innovation Focus" }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Agriculture Robot",
      description: "Autonomous farming robot with AI-powered crop monitoring and precision agriculture capabilities.",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["IoT", "AI/ML", "Robotics"],
      status: "Completed"
    },
    {
      id: 2,
      title: "Smart Home IoT System",
      description: "Complete home automation solution with voice control, energy monitoring, and security features.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["IoT", "Mobile App", "Cloud"],
      status: "In Progress"
    },
    {
      id: 3,
      title: "Medical Assistance Robot",
      description: "Healthcare robot for patient monitoring, medication delivery, and emergency response.",
      image: "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["Robotics", "AI", "Healthcare"],
      status: "Research Phase"
    }
  ];

  const ambassadors = [
    {
      id: 1,
      name: "Sarah Ahmed",
      campus: "University of Dhaka",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Computer Science student passionate about robotics and AI. Leading tech innovation initiatives on campus.",
      achievements: ["Organized 5+ tech workshops", "50+ students mentored", "3 hackathon wins"]
    },
    {
      id: 2,
      name: "Rafiq Hassan",
      campus: "BUET",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Electrical Engineering student with expertise in IoT and embedded systems. Active in robotics competitions.",
      achievements: ["Built 10+ IoT projects", "Regional robotics champion", "Tech community leader"]
    },
    {
      id: 3,
      name: "Fatima Khan",
      campus: "North South University",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Mechatronics student focused on automation and smart manufacturing. Research enthusiast.",
      achievements: ["Published 2 research papers", "Innovation award winner", "Startup co-founder"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ZantechBD
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#ambassadors" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Campus Ambassadors</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="https://zantechbd.com/">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Store
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Empowering
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Future Tech</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                  Robotics & IoT Innovation Starts Here
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                  We transform ideas into intelligent solutions through cutting-edge robotics, IoT development, and custom R&D services for businesses, startups, and students.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Bot className="w-12 h-12" />, label: "Robotics", color: "from-cyan-500 to-blue-500" },
                    { icon: <Wifi className="w-12 h-12" />, label: "IoT", color: "from-purple-500 to-pink-500" },
                    { icon: <Cpu className="w-12 h-12" />, label: "AI/ML", color: "from-green-500 to-emerald-500" },
                    { icon: <Zap className="w-12 h-12" />, label: "Innovation", color: "from-orange-500 to-red-500" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-3 w-fit mx-auto mb-3`}>
                        {item.icon}
                      </div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From concept to deployment, we provide comprehensive technology solutions that drive innovation and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our innovative projects that showcase the power of robotics, IoT, and cutting-edge technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed' ? 'bg-green-500 text-white' :
                        project.status === 'In Progress' ? 'bg-blue-500 text-white' :
                        'bg-orange-500 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Ambassadors Section */}
      <section id="ambassadors" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Campus <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ambassadors</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Meet our passionate student ambassadors who are driving innovation and technology adoption in universities across Bangladesh.
            </p>
            <button 
              onClick={() => setShowAmbassadorForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Apply as Campus Ambassador</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador) => (
              <div key={ambassador.id} className="group">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={ambassador.image} 
                      alt={ambassador.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Ambassador
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {ambassador.name}
                  </h3>
                  
                  <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                    {ambassador.campus}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {ambassador.bio}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Key Achievements:</h4>
                    {ambassador.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  About <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">ZantechBD</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  We are a forward-thinking technology company based in Bangladesh, specializing in robotics, IoT solutions, and cutting-edge R&D services.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                  Our mission is to bridge the gap between innovative ideas and practical solutions, empowering businesses, startups, and students with the tools they need to succeed in the digital age.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Globe className="w-8 h-8" />, title: "Global Reach", desc: "Serving clients worldwide" },
                  { icon: <Shield className="w-8 h-8" />, title: "Quality Assured", desc: "100% tested solutions" },
                  { icon: <Users className="w-8 h-8" />, title: "Expert Team", desc: "Skilled professionals" },
                  { icon: <Star className="w-8 h-8" />, title: "Innovation First", desc: "Cutting-edge technology" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg p-2">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Bot className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Robotics</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Advanced automation</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Wifi className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">IoT</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Smart connectivity</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Lightbulb className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">R&D</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Innovation labs</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Cpu className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI/ML</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Intelligent systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get In <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your innovative ideas to life? Let's discuss your project and explore how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "zantechbd@gmail.com" },
                  { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+880 1XXX-XXXXXX" },
                  { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "Dhaka, Bangladesh" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg p-3">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{contact.label}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose ZantechBD?</h3>
                <div className="space-y-3">
                  {[
                    "Expert team with years of experience",
                    "Custom solutions tailored to your needs",
                    "End-to-end project management",
                    "Ongoing support and maintenance"
                  ].map((reason, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300">
                    <option>Robotics Prototyping</option>
                    <option>IoT Development</option>
                    <option>R&D Solutions</option>
                    <option>Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Ambassador Application Modal */}
      {showAmbassadorForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Apply as Campus Ambassador
              </h3>
              <button 
                onClick={() => setShowAmbassadorForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Campus Name *
                  </label>
                  <input
                    type="text"
                    name="campusName"
                    value={formData.campusName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="University/College name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What is your experience? *
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Tell us about your experience with technology, leadership, projects, achievements, etc."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAmbassadorForm(false)}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ZantechBD</span>
              </div>
              <p className="text-gray-400">
                Empowering the future through innovative robotics and IoT solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <p>Robotics Prototyping</p>
                <p>IoT Development</p>
                <p>R&D Solutions</p>
                <p>Consultation</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <p>About Us</p>
                <p>info@zantechbd.com</p>
                <p>zantechbd@gmail.com</p>
                <p>Our Team</p>
                <p>Careers</p>
                <p>Contact</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <p>LinkedIn</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Youtube</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZantechBD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-50">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;