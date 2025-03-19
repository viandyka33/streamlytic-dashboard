
import { useState, useEffect } from 'react';

export type StreamingPlatform = {
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'connecting';
  lastConnected?: string;
  viewers?: number;
  latency?: number;
  bitrate?: number;
};

export type StreamStats = {
  activeStreams: number;
  totalStreamTime: number; // in seconds
  platforms: StreamingPlatform[];
  currentBitrate: number; // in Kbps
  resolution: string;
  fps: number;
  encoding: string;
};

// Mock data generator for streaming status
const generateMockStreamData = (): StreamStats => {
  const platformStatuses: ('connected' | 'disconnected' | 'connecting')[] = ['connected', 'disconnected', 'connecting'];
  
  return {
    activeStreams: Math.floor(Math.random() * 3),
    totalStreamTime: Math.floor(Math.random() * 86400), // up to 24 hours in seconds
    platforms: [
      {
        name: 'YouTube',
        url: 'rtmp://a.rtmp.youtube.com/live2',
        status: platformStatuses[Math.floor(Math.random() * 3)] as 'connected' | 'disconnected' | 'connecting',
        lastConnected: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        viewers: Math.floor(Math.random() * 1000),
        latency: Math.floor(Math.random() * 2000), // ms
        bitrate: Math.floor(Math.random() * 5000) + 2000, // Kbps
      },
      {
        name: 'Facebook',
        url: 'rtmps://live-api-s.facebook.com:443/rtmp',
        status: platformStatuses[Math.floor(Math.random() * 3)] as 'connected' | 'disconnected' | 'connecting',
        lastConnected: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        viewers: Math.floor(Math.random() * 500),
        latency: Math.floor(Math.random() * 1000) + 500, // ms
        bitrate: Math.floor(Math.random() * 3000) + 1000, // Kbps
      },
      {
        name: 'Twitch',
        url: 'rtmp://live.twitch.tv/app',
        status: platformStatuses[Math.floor(Math.random() * 3)] as 'connected' | 'disconnected' | 'connecting',
        lastConnected: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        viewers: Math.floor(Math.random() * 2000),
        latency: Math.floor(Math.random() * 1500) + 200, // ms
        bitrate: Math.floor(Math.random() * 6000) + 1500, // Kbps
      }
    ],
    currentBitrate: Math.floor(Math.random() * 5000) + 2000, // Kbps
    resolution: ['720p', '1080p', '1440p', '4K'][Math.floor(Math.random() * 4)],
    fps: [30, 60][Math.floor(Math.random() * 2)],
    encoding: ['x264', 'NVENC', 'QuickSync'][Math.floor(Math.random() * 3)]
  };
};

export const useStreamStatus = () => {
  const [streamStats, setStreamStats] = useState<StreamStats>(generateMockStreamData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // In a real application, this would be an API call or WebSocket connection
    const fetchStreamStatus = () => {
      try {
        // Simulating API latency
        setTimeout(() => {
          setStreamStats(generateMockStreamData());
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching stream status:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchStreamStatus();
    
    // Set up interval for real-time updates
    const intervalId = setInterval(fetchStreamStatus, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return { streamStats, loading, error };
};

export default useStreamStatus;
