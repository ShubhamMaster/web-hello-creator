
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SaaSDevelopment() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">SaaS Development</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Build scalable, secure, and user-friendly Software-as-a-Service platforms tailored for civic and government operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-civora-navy mb-6">Modern SaaS Architecture</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our SaaS development approach focuses on creating robust, multi-tenant applications that can scale 
              efficiently while maintaining security and performance standards required for civic applications.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">✓</span>
                Cloud-native architecture
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">✓</span>
                Multi-tenant security
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">✓</span>
                API-first development
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">✓</span>
                Real-time collaboration features
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-civora-navy mb-6">Key Features</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-civora-teal pl-4">
                <h4 className="font-semibold text-civora-navy">User Management</h4>
                <p className="text-gray-700 text-sm">Role-based access control and user provisioning</p>
              </div>
              <div className="border-l-4 border-civora-teal pl-4">
                <h4 className="font-semibold text-civora-navy">Data Analytics</h4>
                <p className="text-gray-700 text-sm">Built-in reporting and dashboard capabilities</p>
              </div>
              <div className="border-l-4 border-civora-teal pl-4">
                <h4 className="font-semibold text-civora-navy">Integration Ready</h4>
                <p className="text-gray-700 text-sm">RESTful APIs and webhook support</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
