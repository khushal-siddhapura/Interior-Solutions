import React from "react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// To enhance the new design, I recommend installing react-icons:
// npm install react-icons
import { FiTarget, FiEye } from "react-icons/fi";

const About = ({ preview = false }) => {
  const navigate = useNavigate();

  // --- PREVIEW SECTION (UNCHANGED) ---
  if (preview) {
    return (
      <div className="relative max-w-4xl mx-auto rounded-2xl bg-slate-800 overflow-hidden shadow-2xl border border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="h-[400px] w-[800px] rounded-full bg-blue-200/25 blur-[120px] animate-pulse-slow" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center p-8 sm:p-16">
          <SectionTitle title="About Us" className="text-white" />
          <p className="max-w-2xl mx-auto text-slate-200 text-lg sm:text-xl mb-8 leading-relaxed tracking-wide">
            With years of experience, we bring innovation and precision to every
            project. We deliver premium glass & aluminium solutions that enhance
            both beauty and functionality.
          </p>
          <Button
            onClick={() => navigate("/about")}
            variant="secondary"
            className="btn-shine"
          >
            Learn More
          </Button>
        </div>
      </div>
    );
  }

  // ==================================================================
  // NEW & IMPROVED FULL "ABOUT US" PAGE SECTION
  // ==================================================================
  return (
    <section className="bg-slate-50 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
          {/* --- Enhanced Text Content Section --- */}
          <div className="animate-fade-in-up">
            <SectionTitle
              title="Crafting Spaces with Clarity and Strength"
              subtitle="At Interior Solutions, we transform environments through exceptional glass and aluminium craftsmanship."
            />
            <p className="text-slate-600 text-lg leading-relaxed mt-8">
              We believe every space holds the potential for greatness. Our
              experienced team merges innovative design with precision
              engineering, guiding each project from initial concept to flawless
              execution. We're dedicated to creating solutions that aren't just
              built, but thoughtfully crafted for lasting beauty and
              performance.
            </p>

            {/* --- Mission & Vision Cards --- */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FiTarget size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Our Mission
                  </h3>
                </div>
                <p className="mt-4 text-slate-600">
                  To deliver premium glass and aluminium solutions that enhance
                  both beauty and functionality, exceeding client expectations
                  every time.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FiEye size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Our Vision
                  </h3>
                </div>
                <p className="mt-4 text-slate-600">
                  To become India’s most trusted interior solutions brand by
                  setting new benchmarks in craftsmanship and client
                  satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* --- Enhanced Image Section with Decorative Background --- */}
          <div className="relative h-[500px] lg:h-full animate-fade-in group">
            {/* Decorative shape behind the image */}
            <div className="absolute top-0 left-0 w-5/6 h-5/6 bg-blue-200/20 rounded-3xl transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>

            <div className="absolute bottom-0 right-0 w-5/6 h-5/6 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/AboutUs.jpg"
                alt="About Interior Solutions"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
