import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">My Learning Page</h1>
      <p className="text-lg mb-6">learning Next.js and React fundamentals</p>

      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={150}
        height={40}
      />

      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2">practicing:</h2>
        <ul className="list-disc list-inside text-left">
          <li>JSX and components</li>
          <li>Props and state</li>
          <li>Pages and routing in Next.js</li>
          <li>Styling with Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
}
