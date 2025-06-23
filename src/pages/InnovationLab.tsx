
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InnovationLab() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">Innovation Lab</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Pioneering the future of civic technology through research, experimentation, and breakthrough innovations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-civora-navy mb-6">Cutting-Edge Research</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our Innovation Lab is where tomorrow's civic solutions are born today. We explore emerging technologies, 
              conduct research, and prototype solutions that will shape the future of government and civic engagement.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-civora-teal mr-3 text-xl">🔬</span>
                <div>
                  <h4 className="font-semibold text-civora-navy">Research & Development</h4>
                  <p className="text-gray-700 text-sm">Exploring next-generation technologies for civic applications</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-civora-teal mr-3 text-xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-civora-navy">Rapid Prototyping</h4>
                  <p className="text-gray-700 text-sm">Quick iteration and testing of innovative concepts</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-civora-teal mr-3 text-xl">🤝</span>
                <div>
                  <h4 className="font-semibold text-civora-navy">Collaboration Hub</h4>
                  <p className="text-gray-700 text-sm">Working with academia, government, and industry partners</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-civora-navy to-civora-teal p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-6">Current Projects</h3>
            <ul className="space-y-4">
              <li className="border-l-4 border-white/30 pl-4">
                <h4 className="font-semibold">AI-Powered Citizen Services</h4>
                <p className="text-white/80 text-sm">Developing intelligent chatbots and service automation</p>
              </li>
              <li className="border-l-4 border-white/30 pl-4">
                <h4 className="font-semibold">Blockchain Governance</h4>
                <p className="text-white/80 text-sm">Exploring distributed ledger for transparent decision-making</p>
              </li>
              <li className="border-l-4 border-white/30 pl-4">
                <h4 className="font-semibold">IoT Smart Cities</h4>
                <p className="text-white/80 text-sm">Connected sensors for urban infrastructure monitoring</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
