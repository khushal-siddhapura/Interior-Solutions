import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Solutions = ({ preview = false }) => {
  const navigate = useNavigate();
  const previewCardNameAndDesc = [
    {
      image: "/images/InteriorDesignerSolution.jpg",
      title: "For Architects & Interior Designers",
      description: "Crafting spaces that reflect your vision.",
    },
    {
      image: "/images/CommercialSolution.jpg",
      title: "For Homeowners",
      description: "Transforming spaces for comfort and style.",
    },
    {
      image: "/images/HomeTownSolution.jpg",
      title: "For Commercial Spaces",
      description: "Creating workspaces that boost productivity.",
    },
  ];

  const architectCards = [
    {
      title: "Collaboration on design and fittings",
      description: "We work closely with you to achieve your vision.",
    },
    {
      title: "Custom size and finish options",
      description: "Flexible designs for unique projects.",
    },
    {
      title: "Bulk project pricing",
      description: "Special pricing for large orders.",
    },
  ];

  const homeownerCards = [
    {
      title: "Personalized consultations",
      description: "Expert advice to make the most of your space.",
    },
    {
      title: "Space-saving modern solutions",
      description: "Functional and stylish home upgrades.",
    },
    {
      title: "Hassle-free installation",
      description: "From start to finish, we handle it all.",
    },
  ];

  const commercialCards = [
    {
      title: "Office glass partitions",
      description: "Create modern, open workspaces.",
    },
    {
      title: "Conference room enclosures",
      description: "Private yet visually appealing.",
    },
    {
      title: "Front glazing systems",
      description: "Impress clients with sleek entrances.",
    },
  ];

  const sectionGradients = [
    "bg-gradient-to-tr from-purple-600 to-indigo-500",
    "bg-gradient-to-br from-rose-500 to-pink-400",
    "bg-gradient-to-tl from-teal-500 to-emerald-400",
  ];

  if (preview) {
    return (
      <div className="px-4">
        <SectionTitle title="Solutions We Offer" />
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {previewCardNameAndDesc.slice(0, 3).map((c) => (
            <Card
              key={c.title}
              image={c.image}
              title={c.title}
              description={c.description}
              useBackground={true}
            />
          ))}
        </div>
        <div className="text-center">
          <Button variant="ViewProduct" onClick={() => navigate("/solutions")}>
            Explore Solutions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-24">
      <SectionTitle
        title="Our Solutions"
        subtitle="Tailored services for every need"
      />

      {/* Section 1 */}
      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
        <div className="md:w-1/2 w-full">
          <img
            src="/images/InteriorDesign-Solutions.jpg"
            alt="Architects & Designers"
            className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h5 className="text-2xl font-bold mb-4">
            For Architects & Interior Designers
          </h5>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li>✅ Collaboration on design and fittings</li>
            <li>✅ Custom size and finish options</li>
            <li>✅ Bulk project pricing</li>
          </ul>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-12">
        <div className="md:w-1/2 w-full">
          <img
            src="/images/Developers.jpg"
            alt="For Developers & Builders"
            className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h5 className="text-2xl font-bold mb-4">For Developers & Builders</h5>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li>✅ End-to-end material sourcing</li>
            <li>✅ Project-based customization</li>
            <li>✅ Dedicated support & logistics</li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
        <div className="md:w-1/2 w-full">
          <img
            src="/images/HomeOwners-Solutions.jpg"
            alt="For Homeowners"
            className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h5 className="text-2xl font-bold mb-4">For Homeowners</h5>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li>✅ Personalized consultations</li>
            <li>✅ Premium finish options</li>
            <li>✅ Hassle-free installation services</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
