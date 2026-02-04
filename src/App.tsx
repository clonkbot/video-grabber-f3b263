import { useState, useEffect } from 'react';
import './App.css';

type Platform = 'twitter' | 'youtube' | null;

interface VideoResult {
  platform: Platform;
  title: string;
  thumbnail: string;
  qualities: string[];
}

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [scanlineOffset, setScanlineOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const detectPlatform = (inputUrl: string): Platform => {
    if (inputUrl.includes('twitter.com') || inputUrl.includes('x.com')) {
      return 'twitter';
    }
    if (inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be')) {
      return 'youtube';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const platform = detectPlatform(url);
    if (!platform) {
      alert('Please enter a valid Twitter/X or YouTube URL');
      return;
    }

    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setResult({
        platform,
        title: platform === 'youtube'
          ? 'Epic Video Title - Full HD Experience'
          : 'Viral Tweet Video @username',
        thumbnail: platform === 'youtube'
          ? 'https://picsum.photos/seed/yt/640/360'
          : 'https://picsum.photos/seed/tw/640/360',
        qualities: platform === 'youtube'
          ? ['4K (2160p)', '1080p HD', '720p', '480p', '360p', 'Audio Only (MP3)']
          : ['Best Quality', 'Standard', 'Audio Only']
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleDownload = (quality: string) => {
    alert(`Demo Mode: Would download "${result?.title}" in ${quality}\n\nNote: This is a frontend demo. Actual video downloading requires backend integration with yt-dlp or similar services.`);
  };

  const resetForm = () => {
    setUrl('');
    setResult(null);
  };

  return (
    <div className="app">
      {/* Scanlines overlay */}
      <div className="scanlines" style={{ backgroundPositionY: scanlineOffset }} />

      {/* CRT vignette */}
      <div className="vignette" />

      {/* Noise texture */}
      <div className="noise" />

      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="logo-container">
            <div className="vhs-badge">VHS</div>
            <h1 className="title">
              <span className="title-main">VIDEO</span>
              <span className="title-sub">GRABBER</span>
            </h1>
          </div>
          <p className="tagline">
            <span className="glitch" data-text="REWIND THE WEB">REWIND THE WEB</span>
          </p>
          <div className="platform-icons">
            <div className="platform-badge twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <div className="platform-badge youtube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Main input area */}
        {!result ? (
          <section className="input-section">
            <form onSubmit={handleSubmit} className="input-form">
              <div className="input-wrapper">
                <div className="input-chrome">
                  <div className="chrome-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="chrome-label">PASTE URL</span>
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://twitter.com/... or https://youtube.com/..."
                  className="url-input"
                  disabled={isLoading}
                />
                <div className="input-glow" />
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !url.trim()}
              >
                {isLoading ? (
                  <span className="loading-text">
                    <span className="loading-dots">
                      <span>▶</span>
                      <span>▶</span>
                      <span>▶</span>
                    </span>
                    TRACKING SIGNAL
                  </span>
                ) : (
                  <>
                    <span className="btn-icon">▼</span>
                    <span>GRAB VIDEO</span>
                  </>
                )}
              </button>
            </form>

            <div className="features">
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <span>FAST</span>
              </div>
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <span>SECURE</span>
              </div>
              <div className="feature">
                <div className="feature-icon">∞</div>
                <span>UNLIMITED</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="result-section">
            <button onClick={resetForm} className="back-btn">
              ◀ NEW DOWNLOAD
            </button>

            <div className="video-card">
              <div className="video-preview">
                <img src={result.thumbnail} alt="Video thumbnail" className="thumbnail" />
                <div className="play-overlay">
                  <div className="play-icon">▶</div>
                </div>
                <div className="platform-tag">{result.platform?.toUpperCase()}</div>
                <div className="tracking-lines" />
              </div>

              <div className="video-info">
                <h2 className="video-title">{result.title}</h2>

                <div className="quality-options">
                  <h3 className="quality-label">SELECT QUALITY:</h3>
                  <div className="quality-grid">
                    {result.qualities.map((quality, index) => (
                      <button
                        key={quality}
                        onClick={() => handleDownload(quality)}
                        className="quality-btn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="quality-text">{quality}</span>
                        <span className="download-icon">↓</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Decorative elements */}
        <div className="corner-decor top-left">
          <span>REC</span>
          <span className="rec-dot" />
        </div>
        <div className="corner-decor top-right">
          <span className="timestamp">{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="corner-decor bottom-left">
          <span>SP</span>
        </div>
        <div className="corner-decor bottom-right">
          <span>HI-FI STEREO</span>
        </div>
      </main>

      <footer className="footer">
        <p>Requested by @Myst1k_Myst1k · Built by @clonkbot</p>
      </footer>
    </div>
  );
}

export default App;
