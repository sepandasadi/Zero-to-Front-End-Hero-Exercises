export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-xl text-gray-600 mb-8">
        Deployed on AWS S3 + CloudFront
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Deployment Info</h2>
        <ul className="text-left space-y-2">
          <li>✅ Hosted on AWS S3</li>
          <li>✅ Distributed via CloudFront CDN</li>
          <li>✅ Global edge locations</li>
          <li>✅ HTTPS enabled</li>
          <li>✅ Fast loading worldwide</li>
        </ul>
      </div>
    </div>
  );
}

