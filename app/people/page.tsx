import Navigation from "@/components/navigation"
import { Users, Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

export default function PeoplePage() {
  const organizers = [
    {
      name: "Alexander Brassington",
      title: "Event Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years in event management, Alexander brings together technology and artistry to create unforgettable experiences.",
      email: "alexander@diversion2026.com",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Isabella Cogsworth",
      title: "Program Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Isabella curates our speaker lineup and ensures every session delivers maximum value to our attendees.",
      email: "isabella@diversion2026.com",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Theodore Steamwell",
      title: "Technical Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Theodore oversees all technical aspects of the event, from AV systems to our innovative steampunk installations.",
      email: "theodore@diversion2026.com",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Cordelia Gearwright",
      title: "Marketing Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Cordelia crafts our brand story and ensures our message reaches innovators and creators worldwide.",
      email: "cordelia@diversion2026.com",
      linkedin: "#",
      twitter: "#",
    },
  ]

  const advisors = [
    {
      name: "Sir Reginald Clockmaker",
      title: "Industry Advisor",
      company: "Vintage Tech Consortium",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Veteran technology executive with 30+ years experience bridging traditional craftsmanship with modern innovation.",
    },
    {
      name: "Lady Evangeline Brass",
      title: "Creative Advisor",
      company: "Artisan Digital Collective",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Renowned designer and artist who pioneered the integration of steampunk aesthetics in digital experiences.",
    },
    {
      name: "Dr. Mortimer Steamheart",
      title: "Academic Advisor",
      company: "Institute of Applied Mechanics",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Leading researcher in mechanical computing and sustainable technology solutions for the modern age.",
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
              <h1 className="text-4xl md:text-6xl font-bold text-amber-200">Our Team</h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate individuals behind Diversion 2026. Our team of organizers, advisors, and volunteers
              work tirelessly to create an extraordinary experience for every attendee.
            </p>
          </div>

          {/* Organizers */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-200 mb-12 text-center">Event Organizers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {organizers.map((person, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border-4 border-orange-400/50 mx-auto mb-6"
                    priority={index < 2}
                    unoptimized={person.image?.startsWith("/placeholder")}
                  />
                  <h3 className="text-xl font-bold text-amber-200 mb-2">{person.name}</h3>
                  <p className="text-orange-400 font-semibold mb-4">{person.title}</p>
                  <p className="text-amber-100 text-sm leading-relaxed mb-6">{person.bio}</p>

                  {/* Contact Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={`mailto:${person.email}`}
                      className="text-amber-300 hover:text-orange-400 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={person.linkedin} className="text-amber-300 hover:text-orange-400 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={person.twitter} className="text-amber-300 hover:text-orange-400 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advisory Board */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-200 mb-12 text-center">Advisory Board</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-800/30 to-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-orange-600/30 hover:border-red-400/50 transition-all duration-300 text-center"
                >
                  <Image
                    src={advisor.image || "/placeholder.svg"}
                    alt={advisor.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-3 border-red-400/50 mx-auto mb-4"
                    priority={index < 2}
                    unoptimized={advisor.image?.startsWith("/placeholder")}
                  />
                  <h3 className="text-lg font-bold text-amber-200 mb-1">{advisor.name}</h3>
                  <p className="text-red-400 font-semibold text-sm mb-1">{advisor.title}</p>
                  <p className="text-amber-300 text-sm mb-3">{advisor.company}</p>
                  <p className="text-amber-100 text-sm leading-relaxed">{advisor.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Section */}
          <div className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-2xl p-8 border border-amber-600/30 text-center">
            <h2 className="text-3xl font-bold text-amber-200 mb-6">Join Our Volunteer Team</h2>
            <p className="text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Diversion 2026 wouldn&apos;t be possible without our amazing volunteers. Join our team and help create an
              unforgettable experience while gaining valuable event management experience and networking opportunities.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-amber-900/30 rounded-lg p-4">
                <h4 className="text-amber-200 font-semibold mb-2">Event Support</h4>
                <p className="text-amber-100 text-sm">
                  Help with registration, attendee assistance, and general event logistics.
                </p>
              </div>
              <div className="bg-amber-900/30 rounded-lg p-4">
                <h4 className="text-amber-200 font-semibold mb-2">Technical Crew</h4>
                <p className="text-amber-100 text-sm">
                  Assist with AV setup, live streaming, and technical troubleshooting.
                </p>
              </div>
              <div className="bg-amber-900/30 rounded-lg p-4">
                <h4 className="text-amber-200 font-semibold mb-2">Workshop Assistants</h4>
                <p className="text-amber-100 text-sm">
                  Support workshop facilitators and help participants with hands-on activities.
                </p>
              </div>
            </div>

            <div className="space-x-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Apply to Volunteer
              </button>
              <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-amber-900 px-8 py-3 rounded-lg font-bold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
