import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DeploymentGuide = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out", 
        isMobile ? "" : "pl-[240px]"
      )}>
        <div className="p-6 pb-16 space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Deployment Guide</h1>
            <p className="text-muted-foreground">
              Follow these instructions to deploy StreamLytic outside of Lovable.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Deployment Options</CardTitle>
              <CardDescription>
                Multiple ways to deploy your StreamLytic dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Option 1: Deploy from GitHub</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Clone the repository: <code className="bg-muted px-1 py-0.5 rounded">git clone https://github.com/yourusername/streamlytic-dashboard.git</code></li>
                  <li>Navigate to the project directory: <code className="bg-muted px-1 py-0.5 rounded">cd streamlytic-dashboard</code></li>
                  <li>Install dependencies: <code className="bg-muted px-1 py-0.5 rounded">npm install</code></li>
                  <li>Build the project: <code className="bg-muted px-1 py-0.5 rounded">npm run build</code></li>
                  <li>The built files will be in the <code className="bg-muted px-1 py-0.5 rounded">dist</code> directory</li>
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Option 2: Deploy to Netlify</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Fork the repository on GitHub</li>
                  <li>Sign up or log in to <a href="https://www.netlify.com/" className="text-blue-600 hover:underline">Netlify</a></li>
                  <li>Click "New site from Git" on the Netlify dashboard</li>
                  <li>Choose GitHub as your Git provider and authenticate</li>
                  <li>Select your forked repository</li>
                  <li>Use these build settings:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Build command: <code className="bg-muted px-1 py-0.5 rounded">npm run build</code></li>
                      <li>Publish directory: <code className="bg-muted px-1 py-0.5 rounded">dist</code></li>
                    </ul>
                  </li>
                  <li>Click "Deploy site"</li>
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Option 3: Deploy to Vercel</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Fork the repository on GitHub</li>
                  <li>Sign up or log in to <a href="https://vercel.com/" className="text-blue-600 hover:underline">Vercel</a></li>
                  <li>Click "New Project" on the Vercel dashboard</li>
                  <li>Import your forked repository</li>
                  <li>Vercel will automatically detect the Vite.js framework</li>
                  <li>Click "Deploy"</li>
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Option 4: Self-Host on a Web Server</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Follow Option 1 to build the application</li>
                  <li>Upload the contents of the <code className="bg-muted px-1 py-0.5 rounded">dist</code> directory to your web server using FTP or SFTP</li>
                  <li>Configure your web server (Apache/Nginx) to serve the application
                    <ul className="list-disc pl-6 mt-1">
                      <li>For Apache, create a <code className="bg-muted px-1 py-0.5 rounded">.htaccess</code> file for SPA routing</li>
                      <li>For Nginx, configure the <code className="bg-muted px-1 py-0.5 rounded">try_files</code> directive</li>
                    </ul>
                  </li>
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Option 5: Deploy to GitHub Pages</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Update the <code className="bg-muted px-1 py-0.5 rounded">vite.config.ts</code> file to include a base URL:
                    <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                      {`export default defineConfig({
  base: '/your-repo-name/',
  // other config...
})`}
                    </pre>
                  </li>
                  <li>Create a <code className="bg-muted px-1 py-0.5 rounded">deploy.yml</code> file in the <code className="bg-muted px-1 py-0.5 rounded">.github/workflows</code> directory</li>
                  <li>Add GitHub Actions workflow for automatic deployment</li>
                  <li>Push changes to your repository</li>
                  <li>GitHub Actions will build and deploy your site to GitHub Pages</li>
                </ol>
              </div>
              
              <Separator />
              
              <div className="bg-muted p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Connecting with Backend Services</h3>
                <p className="mb-2">For the Streamflow RTMP server connection:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Clone and set up the RTMP server from <a href="https://github.com/bangtutorial/streamflow/" className="text-blue-600 hover:underline">https://github.com/bangtutorial/streamflow/</a></li>
                  <li>Configure the StreamLytic dashboard to connect to your RTMP server instance by updating the API endpoints in the codebase</li>
                  <li>Follow the Streamflow documentation for proper server setup and configuration</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DeploymentGuide;
