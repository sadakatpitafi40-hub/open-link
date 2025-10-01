import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async () => {
    const res = await fetch("http://localhost:5000/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">🔗 URL Shortener</h1>
      <input
        className="border p-2 rounded w-1/2"
        type="text"
        placeholder="Enter your URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={shorten}>
        Shorten
      </button>
      {shortUrl && (
        <p className="mt-4">
          Short URL: <a className="text-blue-600" href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
