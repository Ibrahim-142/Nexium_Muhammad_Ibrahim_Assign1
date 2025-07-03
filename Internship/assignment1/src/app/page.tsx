'use client';

import { useState } from 'react';
import quotes from '../../data/quotes.json';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = topic.trim();
    const match = quotes[trimmed as keyof typeof quotes];

    if (!trimmed) {
      setError('Please enter a topic.');
      setResult(null);
    } else if (match) {
      setError('');
      setResult(match);
    } else {
      setError(`No quotes found for "${trimmed}". Try: Coding, Football, Cricket, or Gaming.`);
      setResult(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>Quote Generator</h1>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g. Coding)"
            style={{ padding: '8px', width: '250px' }}
          />
          <br /><br />
          <button type="submit" style={{ padding: '8px 16px' }}>Submit</button>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {result && (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Quotes on &quot;{topic.trim()}&quot;</h2>
            <ul>
              {result.map((q, i) => (
                <li key={i}>&quot;{q}&quot;</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
