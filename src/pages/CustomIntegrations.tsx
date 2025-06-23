
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CustomIntegrations() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">Custom Integrations</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Seamlessly connect your existing systems with modern solutions through custom API integrations and middleware development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-civora-teal/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-civora-teal">🔗</span>
            </div>
            <h3 className="text-xl font-bold text-civora-navy mb-3">API Development</h3>
            <p className="text-gray-700">Custom REST and GraphQL APIs designed for your specific integration needs.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-civora-teal/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-civora-teal">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-civora-navy mb-3">Real-time Sync</h3>
            <p className="text-gray-700">Live data synchronization between multiple systems and platforms.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-civora-teal/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-civora-teal">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-civora-navy mb-3">Secure Connections</h3>
            <p className="text-gray-700">Enterprise-grade security with encryption and authentication protocols.</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-civora-navy mb-6">Integration Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Legacy System Modernization</h4>
              <p className="text-gray-700 mb-4">Bridge the gap between legacy systems and modern applications with custom middleware solutions.</p>
              
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Third-party Integrations</h4>
              <p className="text-gray-700">Connect with popular civic platforms, payment gateways, and government databases.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Data Migration</h4>
              <p className="text-gray-700 mb-4">Safe and efficient migration of data between different systems and formats.</p>
              
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Workflow Automation</h4>
              <p className="text-gray-700">Automate complex business processes across multiple integrated systems.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
