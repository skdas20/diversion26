import Navigation from "@/components/navigation"
import { Book, Compass, Map, Clock, Users, Zap } from "lucide-react"

export default function GuidePage() {
  const guideSection = [
    {
      icon: <Map className="h-8 w-8" />,
      title: "Getting There",
      content:
        "The Steampunk Convention Center is easily accessible by train, airship, or horseless carriage. Detailed directions and parking information available on our travel page.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "What to Expect",
      content:
        "Three days of immersive experiences including keynote presentations, hands-on workshops, networking sessions, and interactive exhibitions showcasing the latest in steampunk technology.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Networking Tips",
      content:
        "Make the most of your experience by attending our structured networking sessions, joining special interest groups, and participating in our innovative speed-networking events.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Must-See Attractions",
      content:
        "Don't miss the Grand Exhibition Hall, the Innovation Showcase, the Maker's Workshop, and our famous Steam-Powered Demonstration Theater.",
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
              <Book className="h-12 w-12 text-orange-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-amber-200">Event Guide</h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to making the most of Diversion 2026. Everything you need to know for an
              unforgettable steampunk technology experience.
            </p>
          </div>

          {/* Guide Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {guideSection.map((section, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300"
              >
                <div className="text-orange-400 mb-4">{section.icon}</div>
                <h3 className="text-2xl font-bold text-amber-200 mb-4">{section.title}</h3>
                <p className="text-amber-100 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Registration Process */}
            <div className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-2xl p-8 border border-amber-600/30">
              <h2 className="text-3xl font-bold text-amber-200 mb-6 flex items-center">
                <Compass className="h-8 w-8 text-orange-400 mr-3" />
                Registration Process
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    1
                  </div>
                  <h4 className="text-amber-200 font-semibold mb-2">Choose Your Pass</h4>
                  <p className="text-amber-100 text-sm">
                    Select from our various ticket options including day passes, full event access, and premium
                    experiences.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    2
                  </div>
                  <h4 className="text-amber-200 font-semibold mb-2">Complete Registration</h4>
                  <p className="text-amber-100 text-sm">
                    Fill out your information, select workshops, and customize your experience preferences.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    3
                  </div>
                  <h4 className="text-amber-200 font-semibold mb-2">Receive Confirmation</h4>
                  <p className="text-amber-100 text-sm">
                    Get your digital ticket and access to our exclusive attendee portal with personalized schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* What to Bring */}
            <div className="bg-gradient-to-r from-orange-800/30 to-red-800/30 rounded-2xl p-8 border border-orange-600/30">
              <h2 className="text-3xl font-bold text-amber-200 mb-6">What to Bring</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-amber-200 mb-4">Essential Items</h4>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Valid ID and ticket confirmation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Comfortable walking shoes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Notebook and pen for taking notes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Business cards for networking
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Portable charger for devices
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-amber-200 mb-4">Optional Items</h4>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Steampunk costume or accessories
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Camera for capturing memories
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Laptop for workshop participation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Reusable water bottle
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>Light jacket for air-conditioned
                      spaces
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Code of Conduct */}
            <div className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-2xl p-8 border border-amber-600/30">
              <h2 className="text-3xl font-bold text-amber-200 mb-6">Code of Conduct</h2>
              <p className="text-amber-100 mb-6 leading-relaxed">
                Diversion 2026 is committed to providing a safe, inclusive, and respectful environment for all
                attendees. We expect all participants to adhere to our community standards.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-amber-200 font-semibold mb-3">Expected Behavior</h4>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li>• Treat all attendees with respect and courtesy</li>
                    <li>• Engage in constructive and professional dialogue</li>
                    <li>• Respect personal and intellectual property</li>
                    <li>• Follow venue rules and safety guidelines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-amber-200 font-semibold mb-3">Prohibited Behavior</h4>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li>• Harassment or discrimination of any kind</li>
                    <li>• Disruptive or inappropriate conduct</li>
                    <li>• Unauthorized recording or photography</li>
                    <li>• Violation of venue or safety policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
