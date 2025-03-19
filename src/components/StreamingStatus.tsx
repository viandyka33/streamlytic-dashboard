
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wifi, 
  WifiOff, 
  Activity, 
  BarChart, 
  Clock, 
  Users, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useStreamStatus, { StreamingPlatform } from '@/hooks/useStreamStatus';

const StreamStatusIndicator = ({ status }: { status: 'connected' | 'disconnected' | 'connecting' }) => {
  const statusConfig = {
    connected: {
      color: 'bg-stream-connected',
      icon: CheckCircle2,
      text: 'Connected'
    },
    disconnected: {
      color: 'bg-stream-disconnected',
      icon: XCircle,
      text: 'Disconnected'
    },
    connecting: {
      color: 'bg-stream-warning',
      icon: Activity,
      text: 'Connecting'
    }
  };
  
  const { color, icon: Icon, text } = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        "h-2.5 w-2.5 rounded-full animate-pulse",
        color
      )} />
      <Icon size={16} className={cn(
        status === 'connected' ? 'text-stream-connected' : 
        status === 'disconnected' ? 'text-stream-disconnected' : 
        'text-stream-warning'
      )} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const PlatformCard = ({ platform }: { platform: StreamingPlatform }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{platform.name}</CardTitle>
          <StreamStatusIndicator status={platform.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">LATENCY</p>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-muted-foreground" />
                <span className="font-medium">
                  {platform.latency !== undefined ? `${platform.latency} ms` : 'N/A'}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">BITRATE</p>
              <div className="flex items-center gap-2">
                <BarChart size={16} className="text-muted-foreground" />
                <span className="font-medium">
                  {platform.bitrate !== undefined ? `${platform.bitrate} Kbps` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">VIEWERS</p>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span className="font-medium">
                  {platform.viewers !== undefined ? platform.viewers : 'N/A'}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">LAST CONNECTED</p>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="font-medium text-xs">
                  {platform.lastConnected 
                    ? new Date(platform.lastConnected).toLocaleTimeString() 
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StreamingStatus = () => {
  const { streamStats, loading, error } = useStreamStatus();
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-56 bg-muted rounded-xl" />
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
            <WifiOff size={20} />
            Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to fetch streaming status: {error.message}</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Streaming Status</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <Wifi size={14} />
          {streamStats.activeStreams} Active Streams
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {streamStats.platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </div>
      
      <Card className="animate-slide-in">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6 md:gap-10">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Bitrate</p>
              <p className="text-xl font-medium">{streamStats.currentBitrate} Kbps</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Resolution</p>
              <p className="text-xl font-medium">{streamStats.resolution}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">FPS</p>
              <p className="text-xl font-medium">{streamStats.fps}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Encoder</p>
              <p className="text-xl font-medium">{streamStats.encoding}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamingStatus;
