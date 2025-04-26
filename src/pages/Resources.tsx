
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import ResourceCard from '@/components/resources/ResourceCard';
import { getCareerResources } from '@/services/chatService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Resource {
  id: string;
  title: string;
  source: string;
  url: string;
  type: 'Course' | 'Workshop' | 'Article' | string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const careerResources = await getCareerResources();
        setResources(careerResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  const courses = resources.filter(resource => resource.type === 'Course');
  const workshops = resources.filter(resource => resource.type === 'Workshop');
  const articles = resources.filter(resource => resource.type === 'Article');

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Career Resources</h1>
        </div>
      </header>
      
      {/* Tabs */}
      <div className="bg-white border-b border-career-soft">
        <div className="container max-w-md mx-auto">
          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-4 space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-career-soft animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : resources.length > 0 ? (
                resources.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    source={resource.source}
                    url={resource.url}
                    type={resource.type}
                  />
                ))
              ) : (
                <p className="text-center py-10 text-career-secondary">No resources available</p>
              )}
            </TabsContent>
            
            <TabsContent value="courses" className="p-4 space-y-3">
              {courses.length > 0 ? (
                courses.map(course => (
                  <ResourceCard
                    key={course.id}
                    title={course.title}
                    source={course.source}
                    url={course.url}
                    type={course.type}
                  />
                ))
              ) : (
                <p className="text-center py-10 text-career-secondary">No courses available</p>
              )}
            </TabsContent>
            
            <TabsContent value="workshops" className="p-4 space-y-3">
              {workshops.length > 0 ? (
                workshops.map(workshop => (
                  <ResourceCard
                    key={workshop.id}
                    title={workshop.title}
                    source={workshop.source}
                    url={workshop.url}
                    type={workshop.type}
                  />
                ))
              ) : (
                <p className="text-center py-10 text-career-secondary">No workshops available</p>
              )}
            </TabsContent>
            
            <TabsContent value="articles" className="p-4 space-y-3">
              {articles.length > 0 ? (
                articles.map(article => (
                  <ResourceCard
                    key={article.id}
                    title={article.title}
                    source={article.source}
                    url={article.url}
                    type={article.type}
                  />
                ))
              ) : (
                <p className="text-center py-10 text-career-secondary">No articles available</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Featured Resources */}
      <div className="flex-1 p-4">
        <div className="container max-w-md mx-auto">
          <h2 className="text-lg font-medium text-career-dark mb-3">Featured Resources</h2>
          <div className="bg-white rounded-xl border border-career-soft p-4">
            <h3 className="font-semibold text-career-primary">JobsForHer Career Community</h3>
            <p className="text-sm text-career-neutralGray mt-1">
              Join our community of professional women sharing advice, opportunities, and support.
            </p>
            <button className="mt-3 text-career-primary text-sm font-medium">
              Learn more →
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Resources;
