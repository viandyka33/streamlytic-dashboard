
import { useState, useEffect } from 'react';

// Mock data generator to simulate server responses
const generateMockData = () => {
  return {
    cpu: {
      usage: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 40) + 40, 
      cores: 8,
      model: "Intel Core i9-9900K"
    },
    memory: {
      total: 16, // GB
      used: Math.floor(Math.random() * 16),
      percentage: Math.floor(Math.random() * 100)
    },
    disk: {
      total: 512, // GB
      used: Math.floor(Math.random() * 512),
      percentage: Math.floor(Math.random() * 100)
    },
    network: {
      upload: Math.floor(Math.random() * 10000), // KB/s
      download: Math.floor(Math.random() * 20000), // KB/s
      total_uploaded: Math.floor(Math.random() * 1000), // GB
      total_downloaded: Math.floor(Math.random() * 2000) // GB
    },
    jvm: {
      total: 2, // GB
      used: Math.random().toFixed(2), // GB
      percentage: Math.floor(Math.random() * 100)
    },
    uptime: Math.floor(Math.random() * 2592000) // seconds (up to 30 days)
  };
};

// Helper function to format bytes into human-readable format
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Format uptime into days, hours, minutes, seconds
export const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
};

export const useSystemStats = () => {
  const [stats, setStats] = useState(generateMockData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // In a real application, this would be an API call to get server stats
    const fetchStats = () => {
      try {
        // Simulating API latency
        setTimeout(() => {
          setStats(generateMockData());
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error fetching system stats:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchStats();
    
    // Set up interval for real-time updates
    const intervalId = setInterval(fetchStats, 2000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return { stats, loading, error };
};

export default useSystemStats;
