
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Sliders, 
  Globe, 
  Video, 
  Mic, 
  Volume2, 
  Play,
  Save,
  Copy,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Stream Settings component
export const StreamSettings = () => {
  // General Settings
  const [streamKey, setStreamKey] = useState('5tr3am-k3y-xxx-yyyy-zzzz');
  const [streamName, setStreamName] = useState('Main Stream');
  const [autoStart, setAutoStart] = useState(false);
  const [recordStream, setRecordStream] = useState(true);
  
  // Video Settings
  const [resolution, setResolution] = useState('1080p');
  const [framerate, setFramerate] = useState('60');
  const [bitrate, setBitrate] = useState('6000');
  const [encoder, setEncoder] = useState('x264');
  const [preset, setPreset] = useState('medium');
  
  // Audio Settings
  const [audioCodec, setAudioCodec] = useState('AAC');
  const [audioBitrate, setAudioBitrate] = useState('160');
  const [audioSampleRate, setAudioSampleRate] = useState('48');
  const [audioChannels, setAudioChannels] = useState('2');
  
  // Destination Settings
  const [destinations, setDestinations] = useState([
    { 
      id: 1, 
      name: 'YouTube', 
      url: 'rtmp://a.rtmp.youtube.com/live2', 
      key: 'xxxx-xxxx-xxxx-xxxx',
      enabled: true
    },
    { 
      id: 2, 
      name: 'Facebook', 
      url: 'rtmps://live-api-s.facebook.com:443/rtmp', 
      key: 'yyyy-yyyy-yyyy-yyyy',
      enabled: false
    },
    { 
      id: 3, 
      name: 'Twitch', 
      url: 'rtmp://live.twitch.tv/app', 
      key: 'zzzz-zzzz-zzzz-zzzz',
      enabled: true
    },
  ]);
  
  // State for copy button
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Handle copy stream key
  const handleCopyStreamKey = () => {
    navigator.clipboard.writeText(streamKey);
    setCopySuccess(true);
    
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  
  // Handle regenerate stream key
  const handleRegenerateStreamKey = () => {
    // Generate a random stream key
    const newKey = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    setStreamKey(newKey);
    toast.success('Stream key regenerated successfully');
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };
  
  // Handle destination toggle
  const handleToggleDestination = (id: number) => {
    setDestinations(prev => 
      prev.map(dest => 
        dest.id === id 
          ? { ...dest, enabled: !dest.enabled } 
          : dest
      )
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Stream Settings</h2>
        <Button 
          className="gap-2" 
          onClick={handleSaveSettings}
        >
          <Save size={16} />
          Save Settings
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="mr-2 h-4 w-4" />
            Video
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Volume2 className="mr-2 h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="destinations">
            <Globe className="mr-2 h-4 w-4" />
            Destinations
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stream Information</CardTitle>
                <CardDescription>
                  Basic information about your stream
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stream-name">Stream Name</Label>
                  <Input
                    id="stream-name"
                    placeholder="My Awesome Stream"
                    value={streamName}
                    onChange={(e) => setStreamName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stream-key">Stream Key</Label>
                  <div className="flex">
                    <Input
                      id="stream-key"
                      type="password"
                      value={streamKey}
                      onChange={(e) => setStreamKey(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      variant="outline"
                      className={cn(
                        "rounded-l-none border-l-0 px-3",
                        copySuccess ? "text-green-500" : ""
                      )}
                      onClick={handleCopyStreamKey}
                    >
                      {copySuccess ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your stream key is sensitive and should not be shared.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 gap-2"
                    onClick={handleRegenerateStreamKey}
                  >
                    <RefreshCw size={14} />
                    Regenerate Key
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stream Options</CardTitle>
                <CardDescription>
                  Configure basic stream settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-start">Auto-Start Streaming</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start streaming when source connects
                    </p>
                  </div>
                  <Switch
                    id="auto-start"
                    checked={autoStart}
                    onCheckedChange={setAutoStart}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="record-stream">Record Stream</Label>
                    <p className="text-sm text-muted-foreground">
                      Save stream recordings to server
                    </p>
                  </div>
                  <Switch
                    id="record-stream"
                    checked={recordStream}
                    onCheckedChange={setRecordStream}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="recording-format">Recording Format</Label>
                  <Select defaultValue="mp4">
                    <SelectTrigger id="recording-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4</SelectItem>
                      <SelectItem value="mkv">MKV</SelectItem>
                      <SelectItem value="flv">FLV</SelectItem>
                      <SelectItem value="ts">TS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Video Settings Tab */}
        <TabsContent value="video" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Video Settings</CardTitle>
              <CardDescription>
                Configure video encoding settings for your stream
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger id="resolution">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p (1280x720)</SelectItem>
                      <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                      <SelectItem value="1440p">1440p (2560x1440)</SelectItem>
                      <SelectItem value="4K">4K (3840x2160)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="framerate">Frame Rate</Label>
                  <Select value={framerate} onValueChange={setFramerate}>
                    <SelectTrigger id="framerate">
                      <SelectValue placeholder="Select frame rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 FPS</SelectItem>
                      <SelectItem value="30">30 FPS</SelectItem>
                      <SelectItem value="60">60 FPS</SelectItem>
                      <SelectItem value="120">120 FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="encoder">Video Encoder</Label>
                  <Select value={encoder} onValueChange={setEncoder}>
                    <SelectTrigger id="encoder">
                      <SelectValue placeholder="Select encoder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="x264">x264 (CPU)</SelectItem>
                      <SelectItem value="nvenc">NVENC (NVIDIA GPU)</SelectItem>
                      <SelectItem value="quicksync">QuickSync (Intel GPU)</SelectItem>
                      <SelectItem value="amf">AMF (AMD GPU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bitrate">Video Bitrate (Kbps)</Label>
                  <Input
                    id="bitrate"
                    type="number"
                    placeholder="6000"
                    value={bitrate}
                    onChange={(e) => setBitrate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preset">Encoder Preset</Label>
                  <Select value={preset} onValueChange={setPreset}>
                    <SelectTrigger id="preset">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultrafast">Ultrafast (Lowest CPU Usage)</SelectItem>
                      <SelectItem value="superfast">Superfast</SelectItem>
                      <SelectItem value="veryfast">Veryfast</SelectItem>
                      <SelectItem value="faster">Faster</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="slower">Slower</SelectItem>
                      <SelectItem value="veryslow">Veryslow (Highest Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keyframe">Keyframe Interval (seconds)</Label>
                  <Select defaultValue="2">
                    <SelectTrigger id="keyframe">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-base">Advanced Options</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="b-frames">Use B-Frames</Label>
                    <p className="text-sm text-muted-foreground">
                      Improves compression efficiency at the cost of latency
                    </p>
                  </div>
                  <Switch
                    id="b-frames"
                    defaultChecked={true}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="vbv">Enable VBV Buffer</Label>
                    <p className="text-sm text-muted-foreground">
                      Helps maintain consistent bitrate
                    </p>
                  </div>
                  <Switch
                    id="vbv"
                    defaultChecked={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Audio Settings Tab */}
        <TabsContent value="audio" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
              <CardDescription>
                Configure audio encoding settings for your stream
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="audio-codec">Audio Codec</Label>
                  <Select value={audioCodec} onValueChange={setAudioCodec}>
                    <SelectTrigger id="audio-codec">
                      <SelectValue placeholder="Select codec" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AAC">AAC</SelectItem>
                      <SelectItem value="MP3">MP3</SelectItem>
                      <SelectItem value="Opus">Opus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audio-bitrate">Audio Bitrate (Kbps)</Label>
                  <Select value={audioBitrate} onValueChange={setAudioBitrate}>
                    <SelectTrigger id="audio-bitrate">
                      <SelectValue placeholder="Select bitrate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="96">96 Kbps</SelectItem>
                      <SelectItem value="128">128 Kbps</SelectItem>
                      <SelectItem value="160">160 Kbps</SelectItem>
                      <SelectItem value="192">192 Kbps</SelectItem>
                      <SelectItem value="256">256 Kbps</SelectItem>
                      <SelectItem value="320">320 Kbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sample-rate">Sample Rate (kHz)</Label>
                  <Select value={audioSampleRate} onValueChange={setAudioSampleRate}>
                    <SelectTrigger id="sample-rate">
                      <SelectValue placeholder="Select sample rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="44.1">44.1 kHz</SelectItem>
                      <SelectItem value="48">48 kHz</SelectItem>
                      <SelectItem value="96">96 kHz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audio-channels">Audio Channels</Label>
                  <Select value={audioChannels} onValueChange={setAudioChannels}>
                    <SelectTrigger id="audio-channels">
                      <SelectValue placeholder="Select channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Mono (1)</SelectItem>
                      <SelectItem value="2">Stereo (2)</SelectItem>
                      <SelectItem value="6">5.1 Surround (6)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-base">Audio Processing</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="noise-reduction">Noise Reduction</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce background noise in the audio
                    </p>
                  </div>
                  <Switch
                    id="noise-reduction"
                    defaultChecked={true}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audio-normalization">Audio Normalization</Label>
                    <p className="text-sm text-muted-foreground">
                      Maintain consistent audio levels
                    </p>
                  </div>
                  <Switch
                    id="audio-normalization"
                    defaultChecked={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Destinations Tab */}
        <TabsContent value="destinations" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Streaming Destinations</CardTitle>
              <CardDescription>
                Configure where your stream will be broadcasted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {destinations.map((dest, index) => (
                <div key={dest.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={dest.enabled ? "default" : "outline"}
                        className={dest.enabled ? "bg-green-500" : ""}
                      >
                        {dest.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <h3 className="text-lg font-medium">{dest.name}</h3>
                    </div>
                    <Switch
                      checked={dest.enabled}
                      onCheckedChange={() => handleToggleDestination(dest.id)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`url-${dest.id}`}>RTMP URL</Label>
                      <Input
                        id={`url-${dest.id}`}
                        value={dest.url}
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`key-${dest.id}`}>Stream Key</Label>
                      <div className="flex">
                        <Input
                          id={`key-${dest.id}`}
                          type="password"
                          value={dest.key}
                          readOnly
                          className="rounded-r-none"
                        />
                        <Button
                          variant="outline"
                          className="rounded-l-none border-l-0 px-3"
                          onClick={() => {
                            navigator.clipboard.writeText(dest.key);
                            toast.success(`${dest.name} stream key copied`);
                          }}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {index < destinations.length - 1 && <Separator />}
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4 gap-2">
                <Globe size={16} />
                Add New Destination
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <AlertCircle size={16} />
                Test All Connections
              </Button>
              <Button className="gap-2">
                <Play size={16} />
                Start Streaming
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreamSettings;
