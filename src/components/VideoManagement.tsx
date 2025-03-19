
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UploadCloud, 
  Trash2, 
  PlayCircle, 
  PauseCircle, 
  Film, 
  Clock, 
  ListVideo,
  Check,
  X,
  MoreVertical,
  FileVideo,
  Calendar
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock video data
const mockVideos = [
  {
    id: 1,
    title: 'Introduction to StreamLytic',
    filename: 'intro-streamlytic.mp4',
    duration: '02:35',
    size: '12.5 MB',
    resolution: '1080p',
    uploadDate: '2023-10-15',
    scheduled: false,
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Product Demo - August 2023',
    filename: 'product-demo-aug.mp4',
    duration: '08:12',
    size: '45.2 MB',
    resolution: '1080p',
    uploadDate: '2023-08-22',
    scheduled: true,
    scheduleDate: '2023-12-01',
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Technical Webinar',
    filename: 'tech-webinar.mp4',
    duration: '45:18',
    size: '256.7 MB',
    resolution: '720p',
    uploadDate: '2023-09-05',
    scheduled: false,
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

// Video card component
const VideoCard = ({ 
  video, 
  onDelete 
}: { 
  video: typeof mockVideos[0], 
  onDelete: (id: number) => void 
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
            {video.duration}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg truncate" title={video.title}>
            {video.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <PlayCircle className="mr-2 h-4 w-4" />
                Play
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => onDelete(video.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{video.resolution}</span>
            <span className="text-muted-foreground">{video.size}</span>
          </div>
          
          {video.scheduled && (
            <Badge variant="outline" className="flex items-center gap-1 w-full justify-center">
              <Clock size={12} />
              Scheduled for {video.scheduleDate}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Upload video dialog component
const UploadVideoDialog = ({ 
  onUpload 
}: { 
  onUpload: (video: any) => void 
}) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resolution, setResolution] = useState('1080p');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!title || !file) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      
      const newVideo = {
        id: Math.floor(Math.random() * 1000),
        title,
        filename: file.name,
        duration: '00:30', // Mock duration
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        resolution,
        uploadDate: new Date().toISOString().split('T')[0],
        scheduled: false,
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' // Mock thumbnail
      };
      
      onUpload(newVideo);
      setTitle('');
      setFile(null);
      
      toast.success('Video uploaded successfully!');
    }, 2000);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadCloud size={16} />
          Upload Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload New Video</DialogTitle>
          <DialogDescription>
            Upload a video file to your library. You can schedule it for streaming later.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              placeholder="Enter video title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Video File</Label>
            <div className="border border-input rounded-md">
              {!file ? (
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center h-32 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <FileVideo className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to browse files
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileVideo size={20} />
                      <span className="text-sm font-medium truncate max-w-[300px]">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setFile(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution</Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger id="resolution">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="1440p">1440p</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!title || !file || isUploading}
            className="gap-2"
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Schedule video dialog component
const ScheduleVideoDialog = ({ 
  selectedVideos, 
  onSchedule 
}: { 
  selectedVideos: number[], 
  onSchedule: () => void 
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  
  const handleSchedule = () => {
    if (!date || !time || platforms.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }
    
    toast.success(`${selectedVideos.length} videos scheduled for ${date} at ${time}`);
    onSchedule();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          disabled={selectedVideos.length === 0}
        >
          <Clock size={16} />
          Schedule Selected
          {selectedVideos.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedVideos.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Streaming</DialogTitle>
          <DialogDescription>
            Set a date and time to stream the selected {selectedVideos.length} video(s).
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platforms">Streaming Platforms</Label>
            <Select>
              <SelectTrigger id="platforms">
                <SelectValue placeholder="Select platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitch">Twitch</SelectItem>
                <SelectItem value="custom">Custom RTMP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resolution">Streaming Quality</Label>
            <Select defaultValue="1080p">
              <SelectTrigger id="resolution">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="1440p">1440p</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button onClick={handleSchedule} className="gap-2">
            <Calendar size={16} />
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main VideoManagement component
export const VideoManagement = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  
  const handleVideoDelete = (id: number) => {
    // Remove from selected videos if present
    setSelectedVideos(prev => prev.filter(videoId => videoId !== id));
    
    // Remove from videos list
    setVideos(prev => prev.filter(video => video.id !== id));
    
    toast.success('Video deleted successfully');
  };
  
  const handleVideoUpload = (newVideo: any) => {
    setVideos(prev => [newVideo, ...prev]);
  };
  
  const handleToggleSelect = (id: number) => {
    setSelectedVideos(prev => 
      prev.includes(id) 
        ? prev.filter(videoId => videoId !== id) 
        : [...prev, id]
    );
  };
  
  const handleSchedule = () => {
    // Mark selected videos as scheduled
    setVideos(prev => 
      prev.map(video => 
        selectedVideos.includes(video.id) 
          ? { 
              ...video, 
              scheduled: true, 
              scheduleDate: new Date().toISOString().split('T')[0] 
            } 
          : video
      )
    );
    
    // Clear selection
    setSelectedVideos([]);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Video Management</h2>
        <div className="flex gap-2">
          <ScheduleVideoDialog 
            selectedVideos={selectedVideos}
            onSchedule={handleSchedule}
          />
          <UploadVideoDialog onUpload={handleVideoUpload} />
        </div>
      </div>
      
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="library">
            <Film className="mr-2 h-4 w-4" />
            Video Library
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            <ListVideo className="mr-2 h-4 w-4" />
            Scheduled Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="animate-fade-in">
          {videos.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Film className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No videos in your library</h3>
                <p className="mt-2 mb-4 text-sm text-muted-foreground">
                  Upload videos to get started with streaming.
                </p>
                <UploadVideoDialog onUpload={handleVideoUpload} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onDelete={handleVideoDelete} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="scheduled" className="animate-fade-in">
          {videos.filter(v => v.scheduled).length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No scheduled broadcasts</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select videos from your library and schedule them for streaming.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .filter(video => video.scheduled)
                .map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onDelete={handleVideoDelete} 
                  />
                ))
              }
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoManagement;
