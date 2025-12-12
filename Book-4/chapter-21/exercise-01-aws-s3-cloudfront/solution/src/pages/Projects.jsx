export default function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack React + Node.js application with payment processing',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaboration tool with WebSocket support',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
    },
    {
      title: 'Weather Dashboard',
      description: 'Weather forecasting with API integration and data visualization',
      tech: ['React', 'OpenWeather API', 'Chart.js'],
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media performance tracking',
      tech: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    },
    {
      title: 'Fitness Tracker',
      description: 'Mobile-first fitness tracking application with goal setting',
      tech: ['React Native', 'Redux', 'Firebase'],
    },
    {
      title: 'Recipe Finder',
      description: 'Search and save recipes with nutritional information',
      tech: ['React', 'Spoonacular API', 'LocalStorage'],
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

