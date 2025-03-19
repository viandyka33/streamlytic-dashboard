
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Plus, X, Play, ArrowRight, Trash2, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Individual Stream Setup Item
const StreamItem = ({ 
  id, 
  title,
  onRemove 
}: { 
  id: number;
  title: string;
  onRemove: (id: number) => void;
}) => {
  const [streamKey, setStreamKey] = useState('•••••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);
  const [rtmpUrl, setRtmpUrl] = useState('rtmp://a.rtmp.youtube.com/live2');
  const [bitrate, setBitrate] = useState('3000');
  const [resolution, setResolution] = useState('1080p');
  const [fps, setFps] = useState('30fps');
  const [loopVideo, setLoopVideo] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success(`Started preview for "${title}"`);
    } else {
      toast.info(`Stopped preview for "${title}"`);
    }
  };

  const handleGoLive = () => {
    setIsLive(true);
    toast.success(`"${title}" is now live!`);
  };

  const handleStopStream = () => {
    setIsLive(false);
    toast.info(`"${title}" stream stopped`);
  };

  const handleToggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{id} - {title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 absolute right-4 top-4"
            onClick={() => onRemove(id)}
          >
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Preview Box */}
        <div className="relative aspect-video w-full bg-black/90 rounded-md overflow-hidden">
          {isPlaying ? (
            <img 
              src="/lovable-uploads/739de024-ad00-444d-a4b0-d181a273696e.png" 
              alt="Stream preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <Video className="h-12 w-12 text-gray-500" />
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border-0"
                onClick={handleTogglePlay}
              >
                {isPlaying ? (
                  <span className="h-2 w-2 rounded-sm bg-white"></span>
                ) : (
                  <Play size={14} className="ml-0.5" />
                )}
              </Button>
              
              <div className="text-white text-xs bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                {isPlaying ? "0:23 / 1:45" : "0:00 / 0:00"}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </Button>
              
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Button>
            </div>
          </div>
          
          {isLive && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              LIVE
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor={`loop-video-${id}`} className="text-sm">Loop Video</Label>
          <Switch 
            id={`loop-video-${id}`} 
            checked={loopVideo}
            onCheckedChange={setLoopVideo}
          />
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Input 
              type={showKey ? "text" : "password"} 
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              className="pr-10"
              placeholder="Stream Key"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground"
              onClick={handleToggleShowKey}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        
        <Input 
          value={rtmpUrl}
          onChange={(e) => setRtmpUrl(e.target.value)}
          placeholder="RTMP URL"
        />
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`bitrate-${id}`} className="text-xs">Bitrate (kbps)</Label>
            <Input 
              id={`bitrate-${id}`}
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`resolution-${id}`} className="text-xs">Resolution</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger id={`resolution-${id}`}>
                <SelectValue placeholder="Resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="1440p">1440p</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`fps-${id}`} className="text-xs">FPS</Label>
            <Select value={fps} onValueChange={setFps}>
              <SelectTrigger id={`fps-${id}`}>
                <SelectValue placeholder="FPS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24fps">24 fps</SelectItem>
                <SelectItem value="30fps">30 fps</SelectItem>
                <SelectItem value="60fps">60 fps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {!isLive ? (
          <>
            <Button 
              variant="destructive" 
              onClick={() => onRemove(id)}
              className="gap-2"
            >
              <Trash2 size={16} />
              Delete Stream
            </Button>
            <Button 
              onClick={handleGoLive}
              className="gap-2 bg-red-500 hover:bg-red-600"
            >
              <ArrowRight size={16} />
              Go Live
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline"
              className="gap-2"
              onClick={handleStopStream}
            >
              Stop
            </Button>
            <Badge variant="destructive" className="text-sm py-1.5">LIVE</Badge>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

// Main MultiStreamSetup component
export const MultiStreamSetup = () => {
  const [streams, setStreams] = useState([
    { id: 1, title: 'Live Music Stream' },
    { id: 2, title: 'Game Stream' },
  ]);
  
  const handleAddStream = () => {
    const newId = streams.length > 0 ? Math.max(...streams.map(s => s.id)) + 1 : 1;
    setStreams([...streams, { id: newId, title: `New Stream ${newId}` }]);
    toast.success("New stream added");
  };
  
  const handleRemoveStream = (id: number) => {
    setStreams(streams.filter(stream => stream.id !== id));
    toast.info("Stream removed");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Multi-Stream Setup</h2>
        <Button onClick={handleAddStream} className="gap-2">
          <Plus size={16} />
          Add Stream
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {streams.map(stream => (
          <StreamItem
            key={stream.id}
            id={stream.id}
            title={stream.title}
            onRemove={handleRemoveStream}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiStreamSetup;
