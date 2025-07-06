import Navigation from "@/components/navigation"
import { Users, Star, Award, Briefcase } from "lucide-react"
import Image from "next/image"

export default function LineupPage() {
  const speakers = [
    {
      name: "Dr. Victoria Steamwright",
      title: "Chief Innovation Officer",
      company: "Clockwork Industries",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pioneer in mechanical computing and steam-powered automation. Author of 'The Future is Brass' and holder of 47 patents in industrial innovation.",
      expertise: ["Mechanical Computing", "Steam Automation", "Industrial Design"],
      keynote: true,
    },
    {
      name: "Prof. Gideon Clockwork",
      title: "Director of Temporal Engineering",
      company: "University of Advanced Mechanics",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading researcher in time-based computing systems and chronological data processing. TED speaker with over 2M views.",
      expertise: ["Temporal Computing", "Data Processing", "Academic Research"],
      keynote: true,
    },
    {
      name: "Copper Cogsworth",
      title: "AI Ethics Specialist",
      company: "Ethical Tech Consortium",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Advocate for responsible AI development with Victorian principles. Consultant for major tech companies on ethical implementation.",
      expertise: ["AI Ethics", "Responsible Tech", "Policy Development"],
      keynote: false,
    },
    {
      name: "Marina Gearwright",
      title: "Sustainable Tech Evangelist",
      company: "Green Steam Solutions",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Environmental engineer specializing in eco-friendly steampunk technologies and sustainable innovation practices.",
      expertise: ["Sustainable Tech", "Environmental Engineering", "Green Innovation"],
      keynote: false,
    },
    {
      name: "Jasper Brassfield",
      title: "Startup Founder & CEO",
      company: "Pneumatic Ventures",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Serial entrepreneur who has founded 5 successful steampunk-tech startups. Angel investor and mentor to emerging innovators.",
      expertise: ["Entrepreneurship", "Venture Capital", "Startup Strategy"],
      keynote: false,
    },
    {
      name: "Arabella Steamheart",
      title: "Creative Director",
      company: "Artisan Digital Studios",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Award-winning designer blending traditional craftsmanship with digital innovation. Creator of the acclaimed 'Digital Brass' design system.",
      expertise: ["Digital Design", "UX/UI", "Creative Direction"],
      keynote: false,
    },
  ]

  const workshops = [
    {
      title: "Build Your Own Steam Engine",
      instructor: "Workshop Team",
      duration: "2 hours",
      level: "Beginner",
      description:
        "Hands-on workshop where you'll construct a working miniature steam engine using modern materials and traditional techniques.",
    },
    {
      title: "Steampunk UI/UX Design",
      instructor: "Arabella Steamheart",
      duration: "3 hours",
      level: "Intermediate",
      description: "Learn to create user interfaces that blend Victorian aesthetics with modern usability principles.",
    },
    {
      title: "Ethical AI Implementation",
      instructor: "Copper Cogsworth",
      duration: "2.5 hours",
      level: "Advanced",
      description:
        "Deep dive into implementing AI systems with ethical considerations and responsible development practices.",
    },
    {
      title: "Sustainable Tech Solutions",
      instructor: "Marina Gearwright",
      duration: "2 hours",
      level: "Intermediate",
      description: "Explore eco-friendly approaches to technology development and implementation in modern businesses.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-neutral-800 to-zinc-900">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-orange-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-amber-200">Speaker Lineup</h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Meet the visionaries, innovators, and thought leaders who will be sharing their expertise at Diversion
              2026. Our carefully curated lineup brings together the best minds in technology and design.
            </p>
          </div>

          {/* Keynote Speakers */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-200 mb-8 flex items-center">
              <Star className="h-8 w-8 text-orange-400 mr-3" />
              Keynote Speakers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {speakers
                .filter((speaker) => speaker.keynote)
                .map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-6">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4 border-orange-400/50"
                        priority={index < 2}
                        unoptimized={speaker.image?.startsWith("/placeholder")}
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-amber-200 mb-2">{speaker.name}</h3>
                        <p className="text-orange-400 font-semibold mb-1">{speaker.title}</p>
                        <p className="text-amber-300 mb-4">{speaker.company}</p>
                        <p className="text-amber-100 text-sm leading-relaxed mb-4">{speaker.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {speaker.expertise.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium border border-orange-400/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Featured Speakers */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-200 mb-8 flex items-center">
              <Award className="h-8 w-8 text-orange-400 mr-3" />
              Featured Speakers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers
                .filter((speaker) => !speaker.keynote)
                .map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-800/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-center mb-4">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full border-3 border-orange-400/50 mx-auto mb-4"
                        priority={index < 2}
                        unoptimized={speaker.image?.startsWith("/placeholder")}
                      />
                      <h3 className="text-xl font-bold text-amber-200 mb-1">{speaker.name}</h3>
                      <p className="text-orange-400 font-semibold text-sm mb-1">{speaker.title}</p>
                      <p className="text-amber-300 text-sm mb-3">{speaker.company}</p>
                    </div>
                    <p className="text-amber-100 text-sm leading-relaxed mb-4">{speaker.bio}</p>
                    <div className="flex flex-wrap gap-1">
                      {speaker.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-300 px-2 py-1 rounded-full text-xs font-medium border border-orange-400/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Workshops */}
          <div>
            <h2 className="text-3xl font-bold text-amber-200 mb-8 flex items-center">
              <Briefcase className="h-8 w-8 text-orange-400 mr-3" />
              Featured Workshops
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {workshops.map((workshop, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-800/30 to-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-orange-600/30 hover:border-red-400/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-amber-200">{workshop.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        workshop.level === "Beginner"
                          ? "bg-green-500/20 text-green-300 border border-green-400/30"
                          : workshop.level === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                            : "bg-red-500/20 text-red-300 border border-red-400/30"
                      }`}
                    >
                      {workshop.level}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-300 text-sm mb-3">
                    <span className="mr-4">👨‍🏫 {workshop.instructor}</span>
                    <span>⏱️ {workshop.duration}</span>
                  </div>
                  <p className="text-amber-100 text-sm leading-relaxed">{workshop.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-amber-800/40 to-orange-800/40 rounded-2xl p-8 border border-amber-600/30 text-center">
            <h2 className="text-3xl font-bold text-amber-200 mb-4">Ready to Learn from the Best?</h2>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Don&apos;t miss your chance to learn from industry leaders and connect with fellow innovators. Register now to
              secure your spot at Diversion 2026.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
