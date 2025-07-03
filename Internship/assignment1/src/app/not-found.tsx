export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-center max-w-md mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-md text-center text-gray-600">
        Right now, we only have one page that handles our quote generator logic.
        Please return to the main page to get inspired
      </p>
    </div>
  );
}
