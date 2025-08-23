import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import About from "./About";
import Products from "./Products";
import Solutions from "./Solutions";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Quote from "./Quote";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative w-full min-h-[95vh] flex items-center justify-center p-4">
        {/* Background Image */}
        <img
          src="/images/hero-bg.jpg"
          alt="A modern office with glass partitions"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Content inside a Glassmorphism Card */}
        <div
          className="relative max-w-4xl w-full bg-black/20 backdrop-blur-xl border border-white/20 
               rounded-2xl shadow-2xl p-8 sm:p-12 text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-shadow-lg">
            Smart Spaces, Smart Solutions
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-100 mb-8 text-shadow">
            From premium glass partitions to sleek aluminium windows, we
            engineer solutions for architects, designers, and homeowners who
            value clarity and style.
          </p>
          <Button
            variant="gradientGreen"
            onClick={() => navigate("/contact")}
            className="border border-transparent hover:border-white/50 transition duration-300" // subtle hover effect
          >
            Get a Free Consultation
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <SectionTitle title="Why Choose Us?" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Premium-grade materials"
            description="Built to last with top-quality materials."
            image={"/images/Premium-grade-materials.jpg"}
          />
          <Card
            title="Custom design options"
            description="Tailored to your style and needs."
            image={"/images/Custom-Design.jpg"}
          />
          <Card
            title="Professional installation"
            description="Seamless setup from start to finish."
            image={"/images/Installation.jpg"}
          />
          <Card
            title="Residential & commercial"
            description="Perfect for any kind of space."
            image={"/images/Commercial.jpg"}
          />
        </div>
      </section>

      {/* About Us Preview */}
      <section className="bg-gray-50 py-16">
        <About preview />
      </section>

      {/* Products Preview */}
      <section className="py-16">
        <Products preview />
      </section>

      {/* Solutions Preview */}
      <section className="bg-gray-50 py-16">
        <Solutions preview />
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <Gallery preview />
      </section>

      {/* Contact Preview */}
      <section className="bg-gray-50 py-16">
        <Contact preview />
      </section>

      {/* Quote Preview */}
      <section className="py-16">
        <Quote preview />
      </section>
    </div>
  );
}
