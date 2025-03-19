
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Home, 
  Video, 
  HardDrive, 
  Settings, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  MenuIcon,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
};

const NavItem = ({ 
  icon: Icon, 
  label, 
  path, 
  isActive, 
  isCollapsed,
  onClick 
}: NavItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
        isActive 
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={onClick}
    >
      <Icon size={20} className={cn(
        "flex-shrink-0",
        !isActive && "text-muted-foreground group-hover:text-current"
      )} />
      <span className={cn(
        "transition-opacity duration-200",
        isCollapsed ? "opacity-0 w-0" : "opacity-100"
      )}>
        {label}
      </span>
    </Link>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Video, label: 'Video Management', path: '/videos' },
    { icon: HardDrive, label: 'Server Stats', path: '/server' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: FileText, label: 'Logs', path: '/logs' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50" 
          onClick={toggleMobileMenu}
        >
          <MenuIcon size={24} />
        </Button>
        
        <div className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r shadow-lg transition-transform duration-300 ease-in-out transform",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-primary" />
                <h2 className="font-semibold text-lg">StreamLytic</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X size={20} />
              </Button>
            </div>
            
            <nav className="px-2 py-5 space-y-2">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
              ))}
            </nav>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <div className={cn(
          "flex items-center gap-2",
          isCollapsed ? "justify-center w-full" : "justify-start"
        )}>
          <Video className="h-6 w-6 text-primary flex-shrink-0" />
          <h2 className={cn(
            "font-semibold text-lg transition-opacity duration-200",
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>
            StreamLytic
          </h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-3">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
      
      <div className="h-14 border-t flex items-center px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
