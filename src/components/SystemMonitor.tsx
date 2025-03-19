
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  HardDrive, 
  Memory, 
  Clock, 
  Network, 
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useSystemStats, { formatBytes, formatUptime } from '@/hooks/useSystemStats';

// Circular progress component for CPU, RAM, and Disk usage
const CircularProgress = ({ 
  value, 
  size = 120, 
  strokeWidth = 12,
  label,
  sublabel,
  icon: Icon, 
}: { 
  value: number, 
  size?: number, 
  strokeWidth?: number,
  label: string,
  sublabel: string,
  icon: React.ElementType, 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  // Determine color based on value
  const getColor = () => {
    if (value < 60) return 'stroke-sky-500 dark:stroke-sky-400';
    if (value < 80) return 'stroke-amber-500 dark:stroke-amber-400';
    return 'stroke-red-500 dark:stroke-red-400';
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="circular-progress">
          <circle
            className="circular-progress-track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className={cn("circular-progress-indicator", getColor())}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold">{value}%</span>
          <Icon className="mt-1 text-muted-foreground" size={16} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-medium">{label}</h3>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
};

// Network traffic card
const NetworkTrafficCard = ({ 
  upload, 
  download 
}: { 
  upload: number, 
  download: number 
}) => {
  // Helper for speed conversion
  const formatSpeed = (speed: number) => {
    if (speed < 1000) return `${speed.toFixed(0)} KB/s`;
    return `${(speed / 1000).toFixed(1)} MB/s`;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Network Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <ArrowUpDown size={14} className="text-blue-500 dark:text-blue-300" />
                </span>
                <span className="text-sm font-medium">Upload</span>
              </div>
              <Badge variant="secondary">{formatSpeed(upload)}</Badge>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (upload / 10000) * 100)}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <ArrowUpDown size={14} className="text-green-500 dark:text-green-300" />
                </span>
                <span className="text-sm font-medium">Download</span>
              </div>
              <Badge variant="secondary">{formatSpeed(download)}</Badge>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (download / 20000) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// System info card
const SystemInfoCard = ({ 
  model, 
  uptime 
}: { 
  model: string, 
  uptime: number 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">System Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">CPU Model</p>
            <p className="font-medium">{model}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock size={14} />
              Uptime
            </p>
            <p className="font-medium">{formatUptime(uptime)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main System Monitor component
export const SystemMonitor = () => {
  const { stats, loading, error } = useSystemStats();
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle size={20} />
            Monitoring Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to fetch system stats: {error.message}</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold tracking-tight">System Monitor</h2>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="current">Current Status</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="stats-card">
              <CardContent className="p-6">
                <CircularProgress 
                  value={stats.cpu.usage}
                  label="CPU Usage"
                  sublabel={`${stats.cpu.temperature}°C`}
                  icon={Cpu}
                />
              </CardContent>
            </Card>
            
            <Card className="stats-card">
              <CardContent className="p-6">
                <CircularProgress 
                  value={stats.memory.percentage}
                  label="Memory Usage"
                  sublabel={`${stats.memory.used} GB / ${stats.memory.total} GB`}
                  icon={Memory}
                />
              </CardContent>
            </Card>
            
            <Card className="stats-card">
              <CardContent className="p-6">
                <CircularProgress 
                  value={stats.disk.percentage}
                  label="Disk Usage"
                  sublabel={`${stats.disk.used} GB / ${stats.disk.total} GB`}
                  icon={HardDrive}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <NetworkTrafficCard 
              upload={stats.network.upload} 
              download={stats.network.download} 
            />
            <SystemInfoCard model={stats.cpu.model} uptime={stats.uptime} />
          </div>
        </TabsContent>
        
        <TabsContent value="detailed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Model</p>
                      <p className="font-medium">{stats.cpu.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cores</p>
                      <p className="font-medium">{stats.cpu.cores}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Usage</p>
                      <p className="font-medium">{stats.cpu.usage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{stats.cpu.temperature}°C</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Memory Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total RAM</p>
                      <p className="font-medium">{stats.memory.total} GB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Used RAM</p>
                      <p className="font-medium">{stats.memory.used} GB</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">JVM Heap</p>
                      <p className="font-medium">{stats.jvm.used} GB / {stats.jvm.total} GB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">JVM Usage</p>
                      <p className="font-medium">{stats.jvm.percentage}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Storage Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Space</p>
                      <p className="font-medium">{stats.disk.total} GB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Used Space</p>
                      <p className="font-medium">{stats.disk.used} GB</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Usage</p>
                    <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          stats.disk.percentage < 60 ? "bg-sky-500" : 
                          stats.disk.percentage < 80 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${stats.disk.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm mt-1 text-right">{stats.disk.percentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Network Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Upload Speed</p>
                      <p className="font-medium">{formatBytes(stats.network.upload * 1024)}/s</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Download Speed</p>
                      <p className="font-medium">{formatBytes(stats.network.download * 1024)}/s</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Uploaded</p>
                      <p className="font-medium">{stats.network.total_uploaded} GB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Downloaded</p>
                      <p className="font-medium">{stats.network.total_downloaded} GB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitor;
