
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">Our Projects</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover how we're transforming civic technology through innovative solutions and successful implementations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-civora-teal/10 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-civora-navy mb-2">Smart City Dashboard</h3>
              <p className="text-sm text-gray-600">Government • 2024</p>
            </div>
            <p className="text-gray-700 mb-4">
              Comprehensive dashboard for city administrators to monitor infrastructure, services, and citizen engagement in real-time.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">React</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">AI Analytics</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">IoT Integration</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-civora-teal/10 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-civora-navy mb-2">Citizen Portal</h3>
              <p className="text-sm text-gray-600">Municipal • 2024</p>
            </div>
            <p className="text-gray-700 mb-4">
              Self-service portal for citizens to access government services, submit requests, and track application status online.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">SaaS Platform</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">Mobile App</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">Cloud Hosting</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-civora-teal/10 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-civora-navy mb-2">Budget Transparency Tool</h3>
              <p className="text-sm text-gray-600">State Government • 2023</p>
            </div>
            <p className="text-gray-700 mb-4">
              Interactive visualization platform for public budget data, enabling citizens to explore government spending.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">Data Visualization</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">Open Data</span>
              <span className="bg-civora-teal/20 text-civora-navy px-2 py-1 rounded text-xs">APIs</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-civora-navy mb-4">Want to Start Your Project?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Let's discuss how we can help transform your civic technology challenges into innovative solutions.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-civora-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-civora-teal/90 transition-colors"
          >
            Get Started
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
