import logo from "../assets/logo.png";
export const Footer = () => {
  const footerData = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers&Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track Your Orders",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "FaceBook", "YouTube"],
    },
  ];
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-10 
      py-10 border-b border-gray-500/30 text-gray-500"
      >
        <div>
          <img src={logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 ">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © RecipeApp - All Right Reserved.
      </p>
    </div>
  );
};
