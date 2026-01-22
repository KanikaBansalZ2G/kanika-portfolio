import './index.css';
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ChevronDown, Code, BarChart3, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'projects', 'skills', 'experience', 'education', 'certifications', 'connect', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // ---------------------------------------------------------
    // 1. Google Form URL (Must end with /formResponse)
    // ---------------------------------------------------------
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfTNy4ZJp-qL9rYz_hhrTSWSJcJTtMIwIc3nGeVhowUeoaImQ/formResponse';
    
    // ---------------------------------------------------------
    // 2. Map form data to Google Form Entry IDs
    // ---------------------------------------------------------
    const googleFormData = new FormData();
    googleFormData.append('entry.317432554', formData.name);      // Name ID
    googleFormData.append('entry.1636178309', formData.email);    // Email ID
    googleFormData.append('entry.377226873', formData.subject);   // Subject ID
    googleFormData.append('entry.602348522', formData.message);   // Message ID
    
    fetch(formUrl, {
      method: 'POST',
      body: googleFormData,
      mode: 'no-cors' // This is important for Google Forms
    })
    .then(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch(() => {
      setFormStatus('success'); // Still show success as no-cors doesn't return response
      setFormData({ name: '', email: '', subject: '', message: '' });
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const certifications = [
    { name: "Python for Data Science, AI & Development", org: "IBM | Coursera", icon: "🐍" },
    { name: "Python Essentials – 1 (PCEP)", org: "Python Institute | Cisco", icon: "🎓" },
    { name: "Excel Dashboards | Visually Stunning Dashboards", org: "Udemy", icon: "📊" },
    { name: "Analyzing and Visualizing Data with Microsoft Power BI", org: "Jobaaj", icon: "📈" },
    { name: "Basics of Python Programming, Bootcamp", org: "Open Weaver Inc", icon: "💻" },
    { name: "Programming in C | C++ | Python", org: "Aptech", icon: "⚡" }
  ];

  const projects = [
    {
      title: "Nighttime Lights & Urbanization",
      desc: "Analyzing urban expansion in India using satellite imagery from NOAA/VIIRS in Google Earth Engine",
      tech: ["JavaScript", "GEE", "Python", "Excel"],
      icon: "🛰️",
      completion: 95,
      org: "Reserve Bank of India"
    },
    {
      title: "Land Records & Rural Credit",
      desc: "Investigating SWAMITVA Scheme's effect on formal credit demand through regression analysis",
      tech: ["Excel", "Stata", "Python"],
      icon: "📊",
      completion: 80,
      org: "RBI DEPR Team"
    },
    {
      title: "COVID-19 Food Prices Impact",
      desc: "Web-scraped food price data and analyzed lockdown impacts on perishable vs non-perishable goods",
      tech: ["Python", "Selenium", "Pandas", "VBA"],
      icon: "🍎",
      completion: 100,
      org: "Reserve Bank of India"
    },
    {
      title: "MGNREGS Data Automation",
      desc: "Automated data tasks using VBA/Macros, boosting efficiency 60%. Handled 12+ lakh datapoints",
      tech: ["Excel", "VBA", "SQL", "Python"],
      icon: "⚙️",
      completion: 100,
      org: "Reserve Bank of India"
    }
  ];

  const skills = [
    { cat: "Languages", items: ["Python", "C", "SQL", "JavaScript"] },
    { cat: "Data Science", items: ["NumPy", "Pandas", "Matplotlib", "Plotly"] },
    { cat: "Tools", items: ["Excel", "Stata", "GEE", "VS Code"] },
    { cat: "Platforms", items: ["RESTful API", "Google Colab", "GitHub"] },
    { cat: "Soft Skills", items: ["Decision Making", "Problem Solving", "Teaching"] }
  ];

  const experience = [
    {
      role: "Research Intern",
      org: "Reserve Bank of India",
      loc: "Mumbai, MH",
      period: "Jan 2025 – Dec 2025",
      points: [
        "Automated MGNREGS data tasks using VBA/Macros, boosting efficiency 60%",
        "Streamlined datasets with 12+ lakh datapoints for analysis",
        "Web scraped JJM population datasets to Gram Panchayat level"
      ]
    },
    {
      role: "Assistant Professor",
      org: "JVMGRR College",
      loc: "Charkhi Dadri, HR",
      period: "Aug 2023 – Apr 2024",
      points: [
        "Delivered 200+ hours of lectures on statistics",
        "Designed coursework improving student performance",
        "Coordinated academic activities as SPoC"
      ]
    }
  ];

  const education = [
    { degree: "BS Data Science", school: "IIT Madras (Online)", period: "2025 - Onwards", current: true },
    { degree: "M.Sc. Statistics", school: "CCS University, Meerut", period: "2021 - 2023" },
    { degree: "B.Sc. Mathematics, CS, Physics", school: "Uttarakhand University", period: "2018 - 2021" }
  ];

  const interests = [
    { name: "Data Visualization", icon: "📊", desc: "Creating visual stories from complex data" },
    { name: "Geospatial Analysis", icon: "🗺️", desc: "Exploring spatial patterns with GIS" },
    { name: "Automation", icon: "🤖", desc: "Building efficient workflows" },
    { name: "Research", icon: "🔬", desc: "Policy research & economic analysis" },
    { name: "Teaching", icon: "👩‍🏫", desc: "Simplifying complex concepts" },
    { name: "Problem Solving", icon: "🧩", desc: "Computational thinking" }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 opacity-20 pointer-events-none" 
           style={{backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px'}}></div>

      <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-cyan-500/20' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wider">
              <span className="text-white">KANIKA</span> <span className="text-cyan-400">BANSAL</span>
            </h1>
            <div className="hidden md:flex gap-8">
              {['home', 'projects', 'skills', 'experience', 'education', 'certifications', 'connect', 'contact'].map((s) => (
                <button key={s} onClick={() => scrollTo(s)}
                  className={`capitalize transition-all text-sm ${activeSection === s ? 'text-cyan-400 border-b-2 border-cyan-400' : 'hover:text-cyan-400'}`}>
                  {s}
                </button>
              ))}
            </div>
            <button className="md:hidden text-cyan-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['home', 'projects', 'skills', 'experience', 'education', 'certifications', 'connect', 'contact'].map((s) => (
                <button key={s} onClick={() => scrollTo(s)}
                  className="block w-full text-left capitalize py-2 px-4 hover:bg-cyan-400/10 border-l-2 border-transparent hover:border-cyan-400">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block relative">
            <div className="w-40 h-40 rounded-full border-4 border-cyan-400 mx-auto mb-6 flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-cyan-500/20 to-transparent">
              <span>KB</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-cyan-400 w-20"></div>
            <div className="text-cyan-400 text-sm tracking-widest">DATA SCIENTIST & RESEARCHER</div>
            <div className="h-px bg-cyan-400 w-20"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-white">KANIKA</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400">BANSAL</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Transforming complex data into actionable insights through automation, geospatial analysis at Reserve Bank of India
          </p>

          <div className="border border-cyan-500/30 p-6 max-w-3xl mx-auto mb-8 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
            <h3 className="text-cyan-400 text-lg font-bold mb-3 tracking-wider">ABOUT ME</h3>
            <p className="text-gray-300 leading-relaxed">
              I am a data scientist and researcher currently working at the Reserve Bank of India, where I leverage advanced analytics, 
              automation, and geospatial techniques to transform complex datasets into actionable insights. With expertise in Python, 
              statistical modeling, and remote sensing technologies like Google Earth Engine, I specialize in building efficient data 
              pipelines and conducting policy-relevant research. My academic background includes pursuing a BS in Data Science from 
              IIT Madras and holding an M.Sc. in Statistics, complemented by hands-on experience in teaching and mentoring students 
              in statistical and computational thinking.
            </p>
          </div>
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            <button onClick={() => scrollTo('projects')} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold tracking-wider">
              View Projects
            </button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-3 border-2 border-cyan-400 hover:bg-cyan-400/10 tracking-wider">
              Contact Me
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { label: "Projects", value: "10+" },
              { label: "Lectures", value: "200+" },
              { label: "Efficiency", value: "60%" },
              { label: "Certificates", value: "6+" }
            ].map((stat, i) => (
              <div key={i} className="border border-cyan-500/30 p-6 relative hover:border-cyan-400">
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
                <div className="text-4xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <ChevronDown className="mx-auto animate-bounce text-cyan-400" size={32} />
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">PROJECTS</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="border-2 border-cyan-500/30 p-6 relative hover:border-cyan-400 bg-black/50">
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-400"></div>
                <div className="text-6xl mb-4">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">{p.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{p.org}</p>
                <p className="text-gray-300 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 border border-cyan-500/50 text-cyan-400 text-xs">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="4"/>
                      <circle cx="40" cy="40" r="35" fill="none" stroke="cyan" strokeWidth="4" 
                              strokeDasharray={220} strokeDashoffset={220 * (1 - p.completion / 100)} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold">{p.completion}%</div>
                  </div>
                  <div className="text-sm text-gray-400">Completion</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">SKILLS</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((sg, i) => (
              <div key={i} className="border border-cyan-500/30 p-6 relative hover:border-cyan-400">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{sg.cat}</h3>
                <div className="space-y-2">
                  {sg.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">EXPERIENCE</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>
          <div className="space-y-8">
            {experience.map((ex, i) => (
              <div key={i} className="border-2 border-cyan-500/30 p-8 relative hover:border-cyan-400">
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
                <div className="flex flex-col md:flex-row md:justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-cyan-400">{ex.role}</h3>
                    <p className="text-xl text-white">{ex.org}</p>
                    <p className="text-gray-400">{ex.loc}</p>
                  </div>
                  <div className="px-4 py-2 border border-cyan-400 text-cyan-400 text-sm mt-4 md:mt-0">{ex.period}</div>
                </div>
                <div className="space-y-3">
                  {ex.points.map((pt, j) => (
                    <div key={j} className="flex gap-3">
                      <div className="w-2 h-2 bg-cyan-400 mt-2"></div>
                      <p className="text-gray-300">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">EDUCATION</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>
          <div className="space-y-6">
            {education.map((ed, i) => (
              <div key={i} className="border border-cyan-500/30 p-6 relative hover:border-cyan-400">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{ed.degree}</h3>
                    <p className="text-lg text-white">{ed.school}</p>
                  </div>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="px-4 py-2 border border-cyan-400 text-cyan-400 text-sm">{ed.period}</div>
                    {ed.current && <div className="px-4 py-2 bg-cyan-500 text-black text-sm">Current</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">CERTIFICATIONS</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="border-2 border-cyan-500/30 p-6 relative hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group">
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cert.icon}</div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3 leading-tight">{cert.name}</h3>
                <p className="text-gray-400 text-sm">{cert.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="connect" className="min-h-screen py-20 px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">CONNECT WITH ME</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="https://www.linkedin.com/in/kanika-bansal-21225024a" target="_blank" rel="noopener noreferrer" 
               className="border-2 border-cyan-500/30 p-12 relative hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group text-center">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>
              <Linkedin className="mx-auto mb-6 text-cyan-400 group-hover:scale-110 transition-transform" size={80} />
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">LinkedIn</h3>
              <p className="text-gray-400 text-lg mb-4">Let's connect professionally</p>
              <div className="inline-block px-6 py-2 border border-cyan-400 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                View Profile →
              </div>
            </a>

            <a href="https://github.com/KanikaBansalZ2G" target="_blank" rel="noopener noreferrer"
               className="border-2 border-cyan-500/30 p-12 relative hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group text-center">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>
              <Github className="mx-auto mb-6 text-cyan-400 group-hover:scale-110 transition-transform" size={80} />
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">GitHub</h3>
              <p className="text-gray-400 text-lg mb-4">Check out my code & projects</p>
              <div className="inline-block px-6 py-2 border border-cyan-400 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                View Repositories →
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-cyan-400 text-2xl">✦</div>
            <h2 className="text-5xl font-bold">CONTACT ME</h2>
            <div className="h-px bg-cyan-400 flex-1"></div>
          </div>

          <div className="border-2 border-cyan-500/30 p-8 relative bg-black/50 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>

            <h3 className="text-3xl font-bold mb-4 text-center">Send Me a Message</h3>
            <p className="text-gray-400 mb-8 text-center">
              Have a project in mind or want to collaborate? Drop me a message and I'll get back to you soon!
            </p>

            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-cyan-500/20 border border-cyan-400 text-cyan-400 text-center">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400 text-red-400 text-center">
                ✗ Something went wrong. Please try again or connect via LinkedIn.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cyan-400 mb-2 text-sm tracking-wider">YOUR NAME *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border border-cyan-500/30 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-cyan-400 mb-2 text-sm tracking-wider">YOUR EMAIL *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border border-cyan-500/30 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyan-400 mb-2 text-sm tracking-wider">SUBJECT *</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration"
                  className="w-full bg-transparent border border-cyan-500/30 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-cyan-400 mb-2 text-sm tracking-wider">MESSAGE *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or idea..."
                  className="w-full bg-transparent border border-cyan-500/30 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 outline-none resize-none transition-all"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold tracking-wider transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>

            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>🔒 Your email is secure and will only be used to respond to your message.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-cyan-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-4xl font-bold mb-4"><span className="text-white">KANIKA</span> <span className="text-cyan-400">BANSAL</span></p>
          <p className="text-gray-400">© 2026 Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;