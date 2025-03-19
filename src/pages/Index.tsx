
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import StreamingStatus from '@/components/StreamingStatus';
import SystemMonitor from '@/components/SystemMonitor';
import VideoManagement from '@/components/VideoManagement';
import StreamSettings from '@/components/StreamSettings';
import { MultiStreamSetup } from '@/components/MultiStreamSetup';
import { 
  ArrowLeftFromLine, 
  ArrowRightFromLine,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Simple dashboard component
const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor your streaming status and system performance.
        </p>
      </div>
      
      <StreamingStatus />
      
      <SystemMonitor />
    </div>
  );
};

// Main Index component
const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const isMobile = useIsMobile();
  
  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Render the active page content
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'videos':
        return <VideoManagement />;
      case 'server':
        return <SystemMonitor />;
      case 'settings':
        return <StreamSettings />;
      case 'multistream':
        return <MultiStreamSetup />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out", 
          isMobile ? "" : (sidebarCollapsed ? "pl-[80px]" : "pl-[240px]")
        )}
      >
        <div className="dashboard-container p-6 pb-16">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
