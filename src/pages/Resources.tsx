import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import ResourceCard from '@/components/resources/ResourceCard';
import { getCareerResources } from '@/services/chatService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom';
import { PageHeader, PageContent } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';

interface Resource {
  id: string;
  title: string;
  source: string;
  url: string;
  type: string;
  typeUrl?: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const jobsForHerUrl = "https://in.talent.com/g/rnd-template?k=Work+from+home&source=google&utm_medium=paid&utm_campaign=search&utm_product=google_ads&utm_id=17216002772&utm_term=jobs+for+her&gad_source=1&gclid=Cj0KCQjwiLLABhCEARIsAJYS6um3q9j9pSET1grTGn-4D-pMWcSV4aiOIJje1kFtAkYKCoAQKmWi9OQaAokmEALw_wcB";
  
  // Type specific URLs
  const courseUrl = "https://www.udemy.com/share/102SK4/";
  const workshopUrl = "https://www.udemy.com/share/10dccF/";
  const communityUrl = jobsForHerUrl;
  const eventUrl1 = "https://womenintech-summit.com/";
  const eventUrl2 = "https://india.womenleadersasia.com/";
  const articleUrl = "https://www.morganstanley.com/articles/return-to-work-top-tips-relaunch-career/";

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Get base resources from service
        const careerResources = await getCareerResources();
        
        // Add typeUrls to existing resources
        const resourcesWithTypeUrls = careerResources.map(resource => ({
          ...resource,
          typeUrl: getTypeUrl(resource.type)
        }));
        
        // Add additional resources with proper types (excluding JobsForHer)
        const additionalResources: Resource[] = [
          {
            id: "women-in-tech",
            title: "Women in Tech Global Summit",
            source: "WomenTech Network",
            url: "https://www.womentech.net/women-tech-conference",
            type: "Event",
            typeUrl: eventUrl1
          },
          {
            id: "women-leadership",
            title: "Women's Leadership Conference",
            source: "GlobalWIN",
            url: "https://india.womenleadersasia.com/",
            type: "Event",
            typeUrl: eventUrl2
          }
        ];
        
        // Combine and set resources
        setResources([...resourcesWithTypeUrls, ...additionalResources]);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);
  
  // Helper function to get URL based on resource type
  const getTypeUrl = (type: string): string => {
    switch (type) {
      case 'Course':
        return courseUrl;
      case 'Workshop':
        return workshopUrl;
      case 'Article':
        return articleUrl;
      case 'Event':
        return eventUrl1;
      case 'Community':
        return communityUrl;
      default:
        return "";
    }
  };
  
  // Create a function to deduplicate resources
  const getUniqueResources = () => {
    const uniqueResources = [];
    const seenTitles = new Set();
    
    for (const resource of resources) {
      if (!seenTitles.has(resource.title)) {
        seenTitles.add(resource.title);
        uniqueResources.push(resource);
      }
    }
    
    return uniqueResources;
  };
  
  const uniqueResources = getUniqueResources();
  const courses = uniqueResources.filter(resource => resource.type === 'Course');
  const workshops = uniqueResources.filter(resource => resource.type === 'Workshop');
  const articles = uniqueResources.filter(resource => resource.type === 'Article');
  const events = uniqueResources.filter(resource => resource.type === 'Event');

  // Helper to create proper spacing between resources
  const renderResources = (resourceList: Resource[]) => {
    return resourceList.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resourceList.map(resource => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            source={resource.source}
            url={resource.url}
            type={resource.type}
            typeUrl={resource.typeUrl}
          />
        ))}
      </div>
    ) : (
      <p className="text-center py-10 text-career-secondary">No resources available</p>
    );
  };

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <PageHeader title="Career Resources" />
      
      {/* Tabs - Updated to use full width */}
      <div className="bg-white border-b border-career-soft sticky top-16 z-10 w-full">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-center p-2 flex bg-transparent h-auto">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar max-w-full w-full justify-center px-2">
              <TabsTrigger value="all" className="px-6 py-2">All</TabsTrigger>
              <TabsTrigger value="courses" className="px-6 py-2">Courses</TabsTrigger>
              <TabsTrigger value="workshops" className="px-6 py-2">Workshops</TabsTrigger>
              <TabsTrigger value="articles" className="px-6 py-2">Articles</TabsTrigger>
              <TabsTrigger value="events" className="px-6 py-2">Events</TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
      </div>
      
      <PageContent fullWidth={true}>
        <div className="space-y-8 w-full max-w-full px-2 sm:px-4">
          {/* Resources Content */}
          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-40 bg-career-soft animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : (
                renderResources(uniqueResources)
              )}
            </TabsContent>
            
            <TabsContent value="courses" className="mt-0">
              {renderResources(courses)}
            </TabsContent>
            
            <TabsContent value="workshops" className="mt-0">
              {renderResources(workshops)}
            </TabsContent>
            
            <TabsContent value="articles" className="mt-0">
              {renderResources(articles)}
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              {renderResources(events)}
            </TabsContent>
          </Tabs>
          
          {/* Featured Resources */}
          <div className="pt-8 border-t border-career-soft">
            <h2 className="text-xl font-medium text-career-dark mb-6">Featured Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resume Builder Guide */}
              <Card className="bg-white rounded-xl border border-career-soft hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-career-primary text-lg">Resume Building Guide</h3>
                  <p className="text-sm text-career-neutralGray mt-2">
                    Create a standout resume that showcases your skills and experience effectively.
                  </p>
                  <Link to="/resume-build" className="mt-4 inline-block text-career-primary text-sm font-medium">
                    Build Your Resume →
                  </Link>
                </CardContent>
              </Card>
              
              {/* Interview Prep Guide */}
              <Card className="bg-white rounded-xl border border-career-soft hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-career-primary text-lg">Interview Preparation Guide</h3>
                  <p className="text-sm text-career-neutralGray mt-2">
                    Comprehensive guide with tips, dos and don'ts for acing your next job interview.
                  </p>
                  <Link to="/interview-prep" className="mt-4 inline-block text-career-primary text-sm font-medium">
                    Read the guide →
                  </Link>
                </CardContent>
              </Card>
              
              {/* Community */}
              <Card className="bg-white rounded-xl border border-career-soft hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-career-primary text-lg">JobsForHer Career Community</h3>
                  <p className="text-sm text-career-neutralGray mt-2">
                    Join our community of professional women sharing advice, opportunities, and support.
                  </p>
                  <a href={jobsForHerUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-career-primary text-sm font-medium">
                    Learn more →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageContent>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Resources;
