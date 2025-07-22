"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Star,
  Palette,
  Video,
  Package,
  ImageIcon,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Calendar,
  Zap,
  Target,
  Briefcase,
  Globe,
  Code,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Languages,
  ChevronLeft,
  ChevronRight,
  Quote,
  BookOpen,
  Coffee,
  Lightbulb,
  Rocket,
  Shield,
  Headphones,
  Trophy,
  Medal,
  User,
  Copy,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link" // Import Link for external links
import Footer from "@/components/footer/footer"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [portfolioFilter, setPortfolioFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "bn">("en")
  const [particlesEnabled, setParticlesEnabled] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0, // Will be updated to 10
    awards: 0,
  })
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    message: string | null
    type: "success" | "error" | null
  }>({ message: null, type: null })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const typingTexts = [
    "Professional Graphic Designer",
    "Creative Illustrator",
    "Logo Design Expert",
    "Video Editor",
    "Brand Identity Specialist",
    "Digital Artist",
  ]

  const languages = {
    en: {
      name: "English",
      hero: {
        greeting: "Hi, I'm",
        subtitle:
          "I am a professional & Creative Graphic Designer. I have been working as a Graphic Design for more than 10 years. I am expert in Logo Design and Creative Illustration (Digital+Black & White). Now I am here on great platform to offer my services. Hope we will enjoy working together. Many thanks.",
        available: "Available for projects",
        downloadCV: "Download CV",
        viewPortfolio: "View Portfolio",
      },
      about: {
        quote:
          "I am a professional & creative graphic designer with more than 10 years of experience in the industry. I specialize in Logo Design and Creative Illustration, both digital and black & white formats.",
        description:
          "My expertise extends to Adobe Illustrator, Adobe Photoshop, Video Editing, Banner Design, Animation, and Product Package Design. I'm passionate about creating designs that not only look great but also communicate effectively with the target audience.",
      },
    },
    bn: {
      name: "বাংলা",
      hero: {
        greeting: "হ্যালো, আমি",
        subtitle:
          "আমি একজন পেশাদার এবং সৃজনশীল গ্রাফিক ডিজাইনার। আমি ১০ বছরেরও বেশি সময় ধরে গ্রাফিক ডিজাইনার হিসেবে কাজ করছি। আমি লোগো ডিজাইন এবং সৃজনশীল চিত্রণে (ডিজিটাল+সাদা-কালো) বিশেষজ্ঞ। এখন আমি আমার পরিষেবাগুলি অফার করার জন্য একটি দুর্দান্ত প্ল্যাটফর্মে আছি। আশা করি আমরা একসাথে কাজ করে উপভোগ করব। অনেক ধন্যবাদ।",
        available: "প্রকল্পের জন্য উপলব্ধ",
        downloadCV: "সিভি ডাউনলোড",
        viewPortfolio: "পোর্টফোলিও দেখুন",
      },
      about: {
        quote:
          "আমি একজন পেশাদার এবং সৃজনশীল গ্রাফিক ডিজাইনার যিনি ১০ বছরেরও বেশি সময় ধরে শিল্পে কাজ করছেন। আমি লোগো ডিজাইন এবং সৃজনশীল চিত্রণে, ডিজিটাল এবং সাদা-কালো উভয় ফর্ম্যাটে বিশেষজ্ঞ।",
        description:
          "আমার দক্ষতা অ্যাডোব ইলাস্ট্রেটর, অ্যাডোব ফটোশপ, ভিডিও এডিটিং, ব্যানার ডিজাইন, অ্যানিমেশন এবং প্রোডাক্ট প্যাকেজ ডিজাইনে বিস্তৃত। আমি এমন ডিজাইন তৈরি করতে আগ্রহী যা দেখতে সুন্দর এবং লক্ষ্য দর্শকদের সাথে কার্যকরভাবে যোগাযোগ করে।",
      },
    },
  }

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://x.com/Riponhasan24",
      icon: <Twitter className="h-5 w-5" />,
      color: "hover:bg-blue-400",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/riponhasan24",
      icon: <Instagram className="h-5 w-5" />,
      color: "hover:bg-pink-600",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/RIPONHASAN",
      icon: <Youtube className="h-5 w-5" />,
      color: "hover:bg-red-600",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/riponhasan24",
      icon: <ExternalLink className="h-5 w-5" />, // Using ExternalLink for Behance
      color: "hover:bg-blue-800",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Riponhasan.M",
      icon: <Facebook className="h-5 w-5" />,
      color: "hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/riponhasan",
      icon: <Linkedin className="h-5 w-5" />,
      color: "hover:bg-blue-600",
    },
    {
      name: "Github",
      url: "https://github.com/riponhasan", // Placeholder, assuming user has one
      icon: <Github className="h-5 w-5" />,
      color: "hover:bg-gray-800",
    },
  ]

  // Particle animation
  useEffect(() => {
    if (!particlesEnabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = isDarkMode
          ? `rgba(59, 130, 246, ${particle.opacity})`
          : `rgba(147, 51, 234, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [particlesEnabled, isDarkMode])

  // Typing animation
  useEffect(() => {
    let currentIndex = 0
    let currentText = ""
    let isDeleting = false
    let textIndex = 0

    const type = () => {
      const fullText = typingTexts[textIndex]

      if (isDeleting) {
        currentText = fullText.substring(0, currentIndex - 1)
        currentIndex--
      } else {
        currentText = fullText.substring(0, currentIndex + 1)
        currentIndex++
      }

      setTypedText(currentText)

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && currentIndex === fullText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % typingTexts.length
        typeSpeed = 500
      }

      setTimeout(type, typeSpeed)
    }

    if (isTyping) {
      type()
    }

    return () => setIsTyping(false)
  }, [isTyping])

  // Stats counter animation
  useEffect(() => {
    const targetStats = { projects: 500, clients: 200, experience: 10, awards: 25 } // Updated experience to 10
    const duration = 2000
    const steps = 60

    const increment = {
      projects: targetStats.projects / steps,
      clients: targetStats.clients / steps,
      experience: targetStats.experience / steps,
      awards: targetStats.awards / steps,
    }

    let currentStep = 0
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          projects: Math.floor(increment.projects * currentStep),
          clients: Math.floor(increment.clients * currentStep),
          experience: Math.floor(increment.experience * currentStep),
          awards: Math.floor(increment.awards * currentStep),
        })
        currentStep++
      } else {
        setStats(targetStats)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  // Scroll detection for active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "experience", "blog", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setMusicPlaying(true)
    const handlePause = () => setMusicPlaying(false)
    const handleEnded = () => setMusicPlaying(false)
    const handleError = () => {
      console.log("Audio error occurred")
      setMusicPlaying(false)
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (musicPlaying) {
          audioRef.current.pause()
          setMusicPlaying(false)
        } else {
          if (audioRef.current.ended) {
            audioRef.current.currentTime = 0
          }
          await audioRef.current.play()
          setMusicPlaying(true)
        }
      } catch (error) {
        console.log("Audio playback failed:", error)
        setMusicPlaying(false)
      }
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus({ message: null, type: null }) // Clear previous status

    const form = event.currentTarget
    const formData = new FormData(form)

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const projectType = formData.get("projectType") as string
    const message = formData.get("message") as string

    if (!firstName || !lastName || !email || !projectType || !message) {
      setFormStatus({ message: "Please fill in all required fields.", type: "error" })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormStatus({ message: "Please enter a valid email address.", type: "error" })
      return
    }

    // Simulate form submission
    console.log("Form Data:", Object.fromEntries(formData.entries()))
    setFormStatus({ message: "Message sent successfully! I'll get back to you soon.", type: "success" })
    form.reset() // Clear form fields
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ripon.designer@email.com")
    alert("Email copied to clipboard!")
  }

  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Logo Design",
      description: "Professional logo design that represents your brand identity perfectly",
      features: ["Brand Identity", "Vector Graphics", "Multiple Formats", "Unlimited Revisions"],
      price: "Starting at $50",
      popular: true,
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: "Creative Illustration",
      description: "Digital and black & white illustrations for various purposes",
      features: ["Digital Art", "Black & White", "Custom Style", "High Resolution"],
      price: "Starting at $75",
      popular: false,
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Video Editing",
      description: "Professional video editing and motion graphics services",
      features: ["Motion Graphics", "Color Grading", "Audio Sync", "Multiple Formats"],
      price: "Starting at $100",
      popular: false,
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Package Design",
      description: "Eye-catching product packaging design that sells",
      features: ["3D Mockups", "Print Ready", "Brand Consistency", "Market Research"],
      price: "Starting at $120",
      popular: false,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Design",
      description: "Modern and responsive web design solutions",
      features: ["Responsive Design", "UI/UX", "Modern Layouts", "SEO Optimized"],
      price: "Starting at $200",
      popular: false,
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Brand Identity",
      description: "Complete brand identity packages for businesses",
      features: ["Logo Suite", "Brand Guidelines", "Color Palette", "Typography"],
      price: "Starting at $300",
      popular: true,
    },
  ]

  const skills = [
    { name: "Adobe Illustrator", level: 95, color: "from-orange-400 to-red-500" },
    { name: "Adobe Photoshop", level: 90, color: "from-blue-400 to-blue-600" },
    { name: "Logo Design", level: 98, color: "from-purple-400 to-pink-500" },
    { name: "Video Editing", level: 85, color: "from-green-400 to-blue-500" },
    { name: "Package Design", level: 88, color: "from-yellow-400 to-orange-500" },
    { name: "Animation", level: 80, color: "from-indigo-400 to-purple-500" },
    { name: "UI/UX Design", level: 82, color: "from-pink-400 to-red-500" },
    { name: "Brand Strategy", level: 87, color: "from-teal-400 to-blue-500" },
  ]

  const portfolioItems = [
    {
      id: 1,
      title: "Tech Startup Branding",
      category: "branding",
      image: "/placeholder.svg?height=400&width=600&text=Tech+Startup+Brand",
      description: "Complete brand identity package for innovative tech startup",
      tags: ["Logo", "Brand Identity", "Web Design"],
      client: "TechFlow Inc.",
      year: "2024",
      likes: 124,
      views: 2340,
      featured: true,
    },
    {
      id: 2,
      title: "Organic Food Packaging",
      category: "packaging",
      image: "/placeholder.svg?height=400&width=600&text=Organic+Food+Package",
      description: "Eco-friendly packaging design for organic food products",
      tags: ["Package Design", "Eco-Friendly", "Print"],
      client: "Green Harvest",
      year: "2024",
      likes: 89,
      views: 1560,
      featured: false,
    },
    {
      id: 3,
      title: "Digital Art Collection",
      category: "illustration",
      image: "/placeholder.svg?height=400&width=600&text=Digital+Art+Collection",
      description: "Custom digital illustrations for NFT collection",
      tags: ["Digital Art", "NFT", "Character Design"],
      client: "CryptoArt Studio",
      year: "2023",
      likes: 156,
      views: 3200,
      featured: true,
    },
    {
      id: 4,
      title: "Corporate Video Campaign",
      category: "video",
      image: "/placeholder.svg?height=400&width=600&text=Corporate+Video",
      description: "Motion graphics and video editing for corporate campaign",
      tags: ["Video Editing", "Motion Graphics", "Corporate"],
      client: "Business Solutions Ltd.",
      year: "2023",
      likes: 67,
      views: 980,
      featured: false,
    },
    {
      id: 5,
      title: "Restaurant Brand Identity",
      category: "branding",
      image: "/placeholder.svg?height=400&width=600&text=Restaurant+Brand",
      description: "Complete branding solution for fine dining restaurant",
      tags: ["Logo", "Menu Design", "Brand Identity"],
      client: "Bella Vista Restaurant",
      year: "2024",
      likes: 98,
      views: 1780,
      featured: false,
    },
    {
      id: 6,
      title: "Mobile App UI Design",
      category: "ui-ux",
      image: "/placeholder.svg?height=400&width=600&text=Mobile+App+UI",
      description: "Modern UI/UX design for fitness tracking mobile app",
      tags: ["UI Design", "Mobile App", "User Experience"],
      client: "FitTrack App",
      year: "2024",
      likes: 143,
      views: 2890,
      featured: true,
    },
    {
      id: 7,
      title: "Book Cover Illustration",
      category: "illustration",
      image: "/placeholder.svg?height=400&width=600&text=Book+Cover+Art",
      description: "Fantasy book cover illustration with custom artwork",
      tags: ["Book Cover", "Fantasy Art", "Digital Painting"],
      client: "Mystic Tales Publishing",
      year: "2023",
      likes: 201,
      views: 4560,
      featured: false,
    },
    {
      id: 8,
      title: "E-commerce Website Design",
      category: "web-design",
      image: "/placeholder.svg?height=400&width=600&text=Ecommerce+Website",
      description: "Modern e-commerce website design with seamless UX",
      tags: ["Web Design", "E-commerce", "Responsive"],
      client: "Fashion Forward",
      year: "2024",
      likes: 87,
      views: 1340,
      featured: false,
    },
    {
      id: 9,
      title: "Animated Logo Design",
      category: "animation",
      image: "/placeholder.svg?height=400&width=600&text=Animated+Logo",
      description: "Dynamic animated logo with smooth transitions",
      tags: ["Animation", "Logo", "Motion Graphics"],
      client: "Dynamic Media",
      year: "2024",
      likes: 112,
      views: 2100,
      featured: true,
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "Ripon delivered exceptional logo design that perfectly captured our brand essence. His attention to detail and creative vision exceeded our expectations. The entire process was smooth and professional.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=SJ",
      project: "Brand Identity Design",
    },
    {
      id: 2,
      name: "Ahmed Rahman",
      role: "Startup Founder",
      company: "InnovateBD",
      content:
        "Outstanding work on our complete brand identity. Ripon understood our vision immediately and translated it into stunning visuals. Professional, creative, and delivered ahead of schedule.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=AR",
      project: "Complete Branding Package",
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Product Manager",
      company: "EcoGoods",
      content:
        "The packaging design exceeded our expectations and helped increase our sales by 40%! Ripon's creative approach and understanding of market trends made all the difference.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=LC",
      project: "Product Packaging Design",
    },
    {
      id: 4,
      name: "Michael Torres",
      role: "Creative Director",
      company: "Digital Agency",
      content:
        "Ripon's video editing skills are top-notch. He transformed our raw footage into a compelling story that resonated with our audience. Highly recommend for any video project.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=MT",
      project: "Corporate Video Production",
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Restaurant Owner",
      company: "Bella Vista",
      content:
        "The brand identity Ripon created for our restaurant perfectly captures our essence. From logo to menu design, everything is cohesive and beautiful. Our customers love the new look!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=EW",
      project: "Restaurant Branding",
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "The Psychology of Color in Logo Design",
      excerpt: "Understanding how colors influence perception and brand recognition in logo design...",
      image: "/placeholder.svg?height=200&width=300&text=Color+Psychology",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Design Theory",
      tags: ["Logo Design", "Color Theory", "Branding"],
    },
    {
      id: 2,
      title: "Trends in Package Design for 2024",
      excerpt: "Exploring the latest trends in packaging design that are shaping the industry...",
      image: "/placeholder.svg?height=200&width=300&text=Package+Trends",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Industry Trends",
      tags: ["Package Design", "Trends", "2024"],
    },
    {
      id: 3,
      title: "Creating Effective Brand Identities",
      excerpt: "A comprehensive guide to developing brand identities that resonate with audiences...",
      image: "/placeholder.svg?height=200&width=300&text=Brand+Identity",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Branding",
      tags: ["Brand Identity", "Strategy", "Design Process"],
    },
  ]

  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Design Excellence Award",
      year: "2023",
      organization: "Bangladesh Design Council",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Top Rated Seller",
      year: "2022-2024",
      organization: "Fiverr Platform",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Creative Innovation Prize",
      year: "2022",
      organization: "Asian Design Awards",
    },
    {
      icon: <Medal className="h-8 w-8" />,
      title: "Best Logo Design",
      year: "2021",
      organization: "Local Design Competition",
    },
  ]

  const filteredPortfolio = portfolioItems.filter((item) => {
    const matchesFilter = portfolioFilter === "all" || item.category === portfolioFilter
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const portfolioCategories = [
    { id: "all", name: "All Projects", count: portfolioItems.length },
    { id: "branding", name: "Branding", count: portfolioItems.filter((item) => item.category === "branding").length },
    {
      id: "illustration",
      name: "Illustration",
      count: portfolioItems.filter((item) => item.category === "illustration").length,
    },
    {
      id: "packaging",
      name: "Packaging",
      count: portfolioItems.filter((item) => item.category === "packaging").length,
    },
    { id: "video", name: "Video", count: portfolioItems.filter((item) => item.category === "video").length },
    { id: "ui-ux", name: "UI/UX", count: portfolioItems.filter((item) => item.category === "ui-ux").length },
    {
      id: "web-design",
      name: "Web Design",
      count: portfolioItems.filter((item) => item.category === "web-design").length,
    },
    {
      id: "animation",
      name: "Animation",
      count: portfolioItems.filter((item) => item.category === "animation").length,
    },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Palette className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 animate-pulse">Ripon Hasan</h1>
          <p className="text-xl opacity-80 animate-bounce">Loading Portfolio...</p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: particlesEnabled ? 0.6 : 0 }}
      />

      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onError={() => {
          console.log("Audio failed to load")
          setMusicPlaying(false)
        }}
      >
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Controls */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
          onClick={() => setParticlesEnabled(!particlesEnabled)}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
          onClick={toggleMusic}
        >
          {musicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
          onClick={() => setCurrentLanguage(currentLanguage === "en" ? "bn" : "en")}
        >
          <Languages className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1
                className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
              >
                Ripon Hasan
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["home", "about", "services", "portfolio", "experience", "blog", "testimonials", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        activeSection === item
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : `${isDarkMode ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${isDarkMode ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isDarkMode ? "bg-gray-900" : "bg-white"} border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              {["home", "about", "services", "portfolio", "experience", "blog", "testimonials", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isDarkMode ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}>
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className={`${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"} animate-pulse`}
                >
                  <Star className="h-3 w-3 mr-1" />
                  {stats.experience}+ Years Experience
                </Badge>
                <h1
                  className={`text-5xl lg:text-7xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {languages[currentLanguage].hero.greeting}{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Ripon Hasan
                  </span>
                </h1>
                <div className="h-16 flex items-center">
                  <p className={`text-2xl font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
                <p className={`text-xl leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {languages[currentLanguage].hero.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/placeholder-cv.pdf" download="Ripon_Hasan_CV.pdf" passHref>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {languages[currentLanguage].hero.downloadCV}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("portfolio")}
                  className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  {languages[currentLanguage].hero.viewPortfolio}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {languages[currentLanguage].hero.available}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer" passHref>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 ${social.color} hover:text-white`}
                    >
                      {social.icon}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className={`relative ${isVisible ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <Image
                  src="/ripon-2.jpg"
                  alt="Ripon Hasan - Graphic Designer"
                  width={500}
                  height={500}
                  className="relative z-10 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-bounce">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute bottom-10 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-bounce delay-300">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <div className="absolute top-1/2 -right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-bounce delay-500">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="absolute bottom-1/4 -left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-bounce delay-700">
                <Lightbulb className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Stats Counter */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projects Completed", value: stats.projects, icon: <Briefcase className="h-6 w-6" /> },
              { label: "Happy Clients", value: stats.clients, icon: <Users className="h-6 w-6" /> },
              { label: "Years Experience", value: stats.experience, icon: <Clock className="h-6 w-6" /> },
              { label: "Awards Won", value: stats.awards, icon: <Award className="h-6 w-6" /> },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm border ${isDarkMode ? "border-gray-700" : "border-gray-200"} transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex justify-center mb-2 text-blue-600">{stat.icon}</div>
                <div className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                  {stat.value}+
                </div>
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div
            className={`w-6 h-10 border-2 ${isDarkMode ? "border-gray-400" : "border-gray-600"} rounded-full flex justify-center`}
          >
            <div
              className={`w-1 h-3 ${isDarkMode ? "bg-gray-400" : "bg-gray-600"} rounded-full mt-2 animate-pulse`}
            ></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"} relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <User className="h-3 w-3 mr-1" />
              About Me
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Passionate Designer with a Vision
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Creating impactful visual solutions that tell stories and connect with audiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"} border ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
              >
                <Quote className={`h-8 w-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"} mb-4`} />
                <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"} italic`}>
                  {languages[currentLanguage].about.quote}
                </p>
              </div>

              <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {languages[currentLanguage].about.description}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div
                  className={`text-center p-4 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"} border ${isDarkMode ? "border-blue-800" : "border-blue-200"}`}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats.projects}+</div>
                  <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Projects Completed</div>
                </div>
                <div
                  className={`text-center p-4 rounded-lg ${isDarkMode ? "bg-purple-900/20" : "bg-purple-50"} border ${isDarkMode ? "border-purple-800" : "border-purple-200"}`}
                >
                  <div className="text-3xl font-bold text-purple-600 mb-1">{stats.clients}+</div>
                  <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Happy Clients</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    M.A Razzak Model High School Graduate
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    From Manikganj, Currently in Dhaka
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Coffee className="h-5 w-5 text-brown-500" />
                  <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Fueled by creativity and coffee
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Skills & Expertise
              </h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {skill.name}
                    </span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{skill.level}%</span>
                  </div>
                  <div
                    className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-3 overflow-hidden`}
                  >
                    <div
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-20">
            <h3 className={`text-2xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Achievements & Recognition
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`text-center transform hover:scale-105 transition-all duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} hover:shadow-xl`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`mx-auto w-16 h-16 ${isDarkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-purple-500"} rounded-full flex items-center justify-center text-white mb-4`}
                    >
                      {achievement.icon}
                    </div>
                    <h4 className={`font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>
                      {achievement.year}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {achievement.organization}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`py-20 ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-purple-50"} relative`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <Briefcase className="h-3 w-3 mr-1" />
              Services
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              What I Can Do For You
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Comprehensive design solutions to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg relative overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    {service.icon}
                  </div>
                  <CardTitle className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {service.title}
                  </CardTitle>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-6 relative z-10">
                  <CardDescription className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {service.description}
                  </CardDescription>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h3 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              My Design Process
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your needs and goals",
                  icon: <Search className="h-6 w-6" />,
                },
                {
                  step: "02",
                  title: "Concept",
                  description: "Creating initial design concepts",
                  icon: <Lightbulb className="h-6 w-6" />,
                },
                {
                  step: "03",
                  title: "Design",
                  description: "Developing the final design",
                  icon: <Palette className="h-6 w-6" />,
                },
                {
                  step: "04",
                  title: "Delivery",
                  description: "Final files and ongoing support",
                  icon: <Rocket className="h-6 w-6" />,
                },
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-white"} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-blue-600">{process.icon}</div>
                  </div>
                  <div className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>
                    {process.step}
                  </div>
                  <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {process.title}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"} relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Portfolio
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              My Creative Work
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              A showcase of my best work across different design disciplines
            </p>
          </div>

          {/* Portfolio Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {portfolioCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={portfolioFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPortfolioFilter(category.id)}
                  className={`transition-all duration-300 ${
                    portfolioFilter === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <Card
                key={item.id}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg transform hover:-translate-y-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
              >
                <div className="relative overflow-hidden">
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-white">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="secondary">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.year}
                    </Badge>
                  </div>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Client: {item.client}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-12">
              <Search className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                No projects found
              </h3>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <Clock className="h-3 w-3 mr-1" />
              Experience
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              My Professional Journey
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Over {stats.experience} years of professional design experience and continuous growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Timeline */}
            <div className="space-y-8">
              <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Career Timeline
              </h3>
              <div className="relative">
                <div
                  className={`absolute left-6 top-0 bottom-0 w-0.5 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
                ></div>
                <div className="space-y-8">
                  {[
                    {
                      title: "Senior Graphic Designer & Creative Director",
                      period: "2022 - Present",
                      company: "Freelance & Agency Work",
                      description:
                        "Leading design projects for international clients, specializing in brand identity and digital illustrations. Managing creative teams and client relationships.",
                      icon: <Rocket className="h-6 w-6" />,
                      color: "bg-blue-600",
                    },
                    {
                      title: "Graphic Designer & Brand Specialist",
                      period: "2019 - 2022",
                      company: "Design Studio BD",
                      description:
                        "Developed comprehensive brand identities for 100+ clients. Specialized in logo design, packaging, and digital marketing materials.",
                      icon: <Palette className="h-6 w-6" />,
                      color: "bg-purple-600",
                    },
                    {
                      title: "Freelance Designer",
                      period: "2017 - 2019",
                      company: "Fiverr & Behance",
                      description:
                        "Built a strong client base through online platforms, completing 200+ projects. Gained expertise in client communication and project management.",
                      icon: <Users className="h-6 w-6" />,
                      color: "bg-green-600",
                    },
                    {
                      title: "Junior Designer",
                      period: "2016 - 2017",
                      company: "Local Design Agency",
                      description:
                        "Started professional career, learning advanced techniques in Adobe Creative Suite and design principles.",
                      icon: <Lightbulb className="h-6 w-6" />,
                      color: "bg-orange-600",
                    },
                  ].map((job, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 ${job.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                      >
                        {job.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"} transform hover:scale-105 transition-all duration-300`}
                        >
                          <h4 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                            {job.title}
                          </h4>
                          <p className="text-blue-600 font-medium mb-2">{job.period}</p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>
                            {job.company}
                          </p>
                          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{job.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="space-y-8">
              <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Skills & Certifications
              </h3>

              {/* Technical Skills */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Code className="h-5 w-5 mr-2 text-blue-600" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Adobe Creative Suite", level: 95, icon: "🎨" },
                    { name: "UI/UX Design", level: 88, icon: "📱" },
                    { name: "Motion Graphics", level: 82, icon: "🎬" },
                    { name: "3D Design", level: 75, icon: "🎯" },
                    { name: "Web Design", level: 80, icon: "🌐" },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-medium flex items-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <span className="mr-2">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Award className="h-5 w-5 mr-2 text-yellow-500" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Adobe Certified Expert (ACE)", year: "2023", issuer: "Adobe" },
                    { name: "Google UX Design Certificate", year: "2022", issuer: "Google" },
                    { name: "Advanced Motion Graphics", year: "2021", issuer: "School of Motion" },
                    { name: "Brand Identity Design", year: "2020", issuer: "Coursera" },
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                    >
                      <div>
                        <h5 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{cert.name}</h5>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{cert.issuer}</p>
                      </div>
                      <Badge variant="outline">{cert.year}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Globe className="h-5 w-5 mr-2 text-green-500" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Bengali", level: "Native", flag: "🇧🇩" },
                    { name: "English", level: "Fluent", flag: "🇺🇸" },
                    { name: "Hindi", level: "Conversational", flag: "🇮🇳" },
                  ].map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span
                        className={`font-medium flex items-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </span>
                      <Badge variant="secondary">{lang.level}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"} relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Blog
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Latest Insights
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Sharing knowledge and insights about design, creativity, and industry trends
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"} group-hover:text-blue-600 transition-colors`}
                  >
                    {post.title}
                  </h3>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-blue-600 group-hover:text-white transition-colors bg-transparent"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              View All Posts
              <BookOpen className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-purple-50"} relative`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className={`mb-4 ${isDarkMode ? "text-blue-400 border-blue-400/50" : "text-blue-600 border-blue-200"}`}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              What Clients Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Real feedback from satisfied clients who trusted me with their projects
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-2xl`}>
              <CardContent className="p-8 text-center">
                <Quote className={`h-12 w-12 mx-auto mb-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-xl italic mb-8 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {testimonials[currentTestimonial].content}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="mt-4">
                  Project: {testimonials[currentTestimonial].project}
                </Badge>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="sm"
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-blue-600 scale-125"
                      : isDarkMode
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`text-sm italic mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {testimonial.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h5 className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {testimonial.name}
                      </h5>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 ${isDarkMode ? "bg-gradient-to-br from-blue-900 to-purple-900" : "bg-gradient-to-br from-blue-600 to-purple-600"} text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-blue-200 border-blue-200/50">
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Let&apos;s Create Something Amazing</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to bring your vision to life? Get in touch and let&apos;s discuss your next project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-blue-100">+8801760406787</p>
                      <Button
                        variant="link"
                        className="text-blue-200 hover:text-white p-0 h-auto"
                        onClick={() => window.open("tel:+8801760406787")}
                      >
                        Call Me <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-blue-100">ripon.designer@email.com</p>
                      <Button
                        variant="link"
                        className="text-blue-200 hover:text-white p-0 h-auto"
                        onClick={handleCopyEmail}
                      >
                        Copy Email <Copy className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-blue-100">Dhaka, Bangladesh</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-blue-100">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Find Me Online</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer" passHref>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 justify-start"
                      >
                        {social.icon}
                        <span className="ml-2 text-sm">{social.name}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Why Choose Me?</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Zap className="h-4 w-4" />, text: "Fast turnaround time" },
                    { icon: <Shield className="h-4 w-4" />, text: "100% satisfaction guarantee" },
                    { icon: <Headphones className="h-4 w-4" />, text: "24/7 support available" },
                    { icon: <Target className="h-4 w-4" />, text: "Unlimited revisions" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-green-400">{feature.icon}</div>
                      <span className="text-blue-100">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-blue-100">
                  Let&apos;s discuss your project requirements and bring your ideas to life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-white/50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    >
                      <option value="" className="text-gray-900">
                        Select a service
                      </option>
                      <option value="logo" className="text-gray-900">
                        Logo Design
                      </option>
                      <option value="illustration" className="text-gray-900">
                        Creative Illustration
                      </option>
                      <option value="video" className="text-gray-900">
                        Video Editing
                      </option>
                      <option value="package" className="text-gray-900">
                        Package Design
                      </option>
                      <option value="branding" className="text-gray-900">
                        Brand Identity
                      </option>
                      <option value="web" className="text-gray-900">
                        Web Design
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-medium text-white mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="" className="text-gray-900">
                        Select budget range
                      </option>
                      <option value="50-100" className="text-gray-900">
                        $50 - $100
                      </option>
                      <option value="100-250" className="text-gray-900">
                        $100 - $250
                      </option>
                      <option value="250-500" className="text-gray-900">
                        $250 - $500
                      </option>
                      <option value="500+" className="text-gray-900">
                        $500+
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="projectTimeline" className="block text-sm font-medium text-white mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="projectTimeline"
                      name="projectTimeline"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="" className="text-gray-900">
                        Select timeline
                      </option>
                      <option value="asap" className="text-gray-900">
                        ASAP (Rush job)
                      </option>
                      <option value="1-week" className="text-gray-900">
                        Within 1 week
                      </option>
                      <option value="2-weeks" className="text-gray-900">
                        Within 2 weeks
                      </option>
                      <option value="1-month" className="text-gray-900">
                        Within 1 month
                      </option>
                      <option value="flexible" className="text-gray-900">
                        Flexible
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="newsletter" name="newsletter" />
                    <label htmlFor="newsletter" className="text-sm text-blue-100">
                      Subscribe to my newsletter for design tips and updates
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  {formStatus.message && (
                    <p
                      className={`text-center text-sm mt-4 ${formStatus.type === "success" ? "text-green-300" : "text-red-300"}`}
                    >
                      {formStatus.message}
                    </p>
                  )}
                </form>
                <p className="text-xs text-blue-200 text-center">* Required fields. I&apos;ll respond within 24 hours.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? "bg-gray-900" : "bg-gray-900"} text-white py-16 relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ripon Hasan
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Professional Graphic Designer creating impactful visual solutions for businesses worldwide. Specializing
                in logo design, brand identity, and creative illustrations that tell your story.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer" passHref>
                    <div
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 cursor-pointer transform hover:scale-110`}
                    >
                      {social.icon}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  "Logo Design",
                  "Creative Illustration",
                  "Video Editing",
                  "Package Design",
                  "Banner Design",
                  "Animation",
                  "Brand Identity",
                  "Web Design",
                ].map((service, index) => (
                  <li key={index} className="hover:text-white transition-colors cursor-pointer flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-blue-400" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  { name: "About Me", section: "about" },
                  { name: "Portfolio", section: "portfolio" },
                  { name: "Services", section: "services" },
                  { name: "Experience", section: "experience" },
                  { name: "Blog", section: "blog" },
                  { name: "Testimonials", section: "testimonials" },
                  { name: "Contact", section: "contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="hover:text-white transition-colors flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 text-blue-400" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

       <Footer/>

          {/* Back to Top Button */}
          {showScrollToTop && (
            <button
              onClick={() => scrollToSection("home")}
              className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
            >
              <ArrowRight className="h-5 w-5 transform -rotate-90" />
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
