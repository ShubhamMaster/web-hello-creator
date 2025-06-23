
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AISolutions() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">AI Solutions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to transform your civic operations with intelligent automation and data-driven insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-civora-navy mb-4">Predictive Analytics</h3>
            <p className="text-gray-700">
              Leverage AI to predict trends, optimize resource allocation, and make data-driven decisions for better civic outcomes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-civora-navy mb-4">Natural Language Processing</h3>
            <p className="text-gray-700">
              Automate document processing, citizen request analysis, and multilingual communication systems.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-civora-navy mb-4">Computer Vision</h3>
            <p className="text-gray-700">
              Implement intelligent monitoring systems for infrastructure, traffic management, and public safety.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-civora-navy mb-6 text-center">Why Choose Our AI Solutions?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Custom AI Models</h4>
              <p className="text-gray-700">Tailored AI solutions designed specifically for your civic challenges and requirements.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Scalable Infrastructure</h4>
              <p className="text-gray-700">Cloud-native AI solutions that grow with your organization's needs.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Ethical AI</h4>
              <p className="text-gray-700">Responsible AI development with transparency, fairness, and privacy at the core.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-civora-navy mb-3">Expert Support</h4>
              <p className="text-gray-700">Dedicated AI specialists to guide your implementation and optimization journey.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
