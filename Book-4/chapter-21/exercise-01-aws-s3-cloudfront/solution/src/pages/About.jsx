export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About This Project</h1>
      <div className="prose lg:prose-xl max-w-none">
        <p className="text-gray-700 mb-4">
          This portfolio website demonstrates cloud deployment best practices
          using AWS services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Technologies Used</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>React 18 with Vite build tool</li>
          <li>Tailwind CSS for styling</li>
          <li>AWS S3 for static website hosting</li>
          <li>AWS CloudFront for global CDN distribution</li>
          <li>AWS Certificate Manager for SSL certificates</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Architecture Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>99.99% availability with S3</li>
          <li>Global edge locations for fast loading</li>
          <li>Automatic HTTPS encryption</li>
          <li>Cost-effective hosting (~$1-5/month)</li>
          <li>Scalable to millions of users</li>
        </ul>
      </div>
    </div>
  );
}

