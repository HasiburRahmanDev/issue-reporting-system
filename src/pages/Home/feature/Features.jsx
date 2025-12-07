import React from "react";

const Features = () => {
  const features = [
    {
      title: "Easy Issue Submission",
      description:
        "Quickly report problems with roads, streetlights, and public facilities using a simple form.",
      icon: "📝",
    },
    {
      title: "Photo & Location Attachments",
      description:
        "Attach images and GPS location to help authorities identify and resolve issues faster.",
      icon: "📍",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track the status of your reported issues and get notified when they are resolved.",
      icon: "⏱️",
    },
    {
      title: "Community Dashboard",
      description:
        "View all reported issues in your area and see what has been resolved.",
      icon: "📊",
    },
    {
      title: "Secure Authentication",
      description:
        "Log in securely to manage your reports and access personalized dashboards.",
      icon: "🔒",
    },
    {
      title: "Authority Integration",
      description:
        "Reports are automatically forwarded to the relevant municipal departments for action.",
      icon: "🏛️",
    },
  ];
  return (
    <div>
      <section className="my-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Application Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
