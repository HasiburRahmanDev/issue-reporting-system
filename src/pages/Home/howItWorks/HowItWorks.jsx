import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Identify an Issue",
      description:
        "Notice a problem with roads, streetlights, or public facilities in your area.",
      icon: "🔍",
    },
    {
      step: "2",
      title: "Submit Report",
      description:
        "Use the online form to describe the issue, attach a photo, and add location details.",
      icon: "📝",
    },
    {
      step: "3",
      title: "Track Progress",
      description:
        "Monitor the status of your report in real time through the dashboard.",
      icon: "📊",
    },
    {
      step: "4",
      title: "Resolution",
      description:
        "Get notified once the issue has been resolved by the authorities.",
      icon: "✅",
    },
  ];
  return (
    <div>
      <section className="my-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="card-title">{`Step ${step.step}: ${step.title}`}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
