
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-civora-navy mb-6">About Civora Nexus</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transforming civic technology through innovative AI solutions and cutting-edge software development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-civora-navy mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Civora Nexus, we're dedicated to revolutionizing how governments and civic organizations 
              operate through intelligent technology solutions. Our mission is to bridge the gap between 
              traditional civic processes and modern digital innovation.
            </p>
            <p className="text-lg text-gray-700">
              We believe in creating sustainable, scalable, and user-friendly solutions that empower 
              communities and enhance civic engagement.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-civora-navy mb-4">Our Values</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">•</span>
                Innovation in civic technology
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">•</span>
                Transparency and accountability
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">•</span>
                Community-centered solutions
              </li>
              <li className="flex items-start">
                <span className="text-civora-teal mr-2">•</span>
                Sustainable development practices
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
