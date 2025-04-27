import React from 'react';
import { useAchievement } from '@/contexts/AchievementContext';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Check, Trophy, Target, Calendar, BarChart, PieChart } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const ChartContainer = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-career-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full aspect-[4/3] h-[230px] relative">
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Progress = () => {
  const { 
    badges, 
    milestones, 
    weeklyGoals,
    totalSessionsCompleted,
    careerActionsCompleted 
  } = useAchievement();

  // Log weekly goals for debugging
  console.log("Weekly Goals:", weeklyGoals);

  // Calculate total progress
  const totalBadges = badges.length;
  const unlockedBadges = badges.filter(badge => badge.unlocked).length;
  const badgeProgress = Math.round((unlockedBadges / totalBadges) * 100);

  // Calculate weekly goals progress
  const completedGoals = weeklyGoals.filter(goal => goal.completed).length;
  const weeklyProgress = Math.round((completedGoals / weeklyGoals.length) * 100);
  
  // Log weekly progress value for debugging
  console.log("Weekly Progress:", weeklyProgress, "% Complete");

  // Data for weekly activity pie chart
  const weeklyPieData = [
    { name: 'Completed', value: completedGoals, fill: '#5E76F6' },
    { name: 'Remaining', value: weeklyGoals.length - completedGoals, fill: '#E1E5F9' },
  ];

  // Data for badges radar chart
  const badgesRadarData = [
    { category: 'Resume', value: badges.some(b => b.id === 'resume-warrior' && b.unlocked) ? 100 : 0 },
    { category: 'Interview', value: badges.some(b => b.id === 'interview-challenger' && b.unlocked) ? 100 : 0 },
    { category: 'Jobs', value: badges.some(b => b.id === 'job-hunter' && b.unlocked) ? 100 : 0 },
    { category: 'Skills', value: badges.some(b => b.id === 'skill-stacker' && b.unlocked) ? 100 : 0 },
    { category: 'Network', value: badges.some(b => b.id === 'community-connector' && b.unlocked) ? 100 : 0 },
  ];

  // Data for milestones bar chart
  const milestonesBarData = milestones.map(milestone => ({
    name: milestone.name,
    value: milestone.progress,
    fill: milestone.progress === 100 ? '#5E76F6' : '#7F91FF',
  }));

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">My Career Journey</h1>
        </div>
      </header>

      <div className="flex-1 px-4 py-6">
        <div className="container max-w-5xl mx-auto space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            <Card className="col-span-1 sm:col-span-2 md:col-span-2 bg-gradient-to-br from-white to-career-soft/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-base font-medium text-career-secondary">Sessions</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 px-3">
                <p className="text-2xl font-bold text-career-primary">{totalSessionsCompleted}</p>
                <p className="text-xs text-career-neutralGray">Total chats</p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 sm:col-span-2 md:col-span-2 bg-gradient-to-br from-white to-career-soft/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-base font-medium text-career-secondary">Actions</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 px-3">
                <p className="text-2xl font-bold text-career-primary">{careerActionsCompleted}</p>
                <p className="text-xs text-career-neutralGray">Career steps</p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 sm:col-span-4 md:col-span-2 bg-gradient-to-br from-white to-career-soft/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-base font-medium text-career-secondary">Badges</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 px-3">
                <p className="text-2xl font-bold text-career-primary">{unlockedBadges}/{totalBadges}</p>
                <p className="text-xs text-career-neutralGray">Achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weekly Progress Chart */}
                <ChartContainer 
                  title="Weekly Goals" 
                  description="Your progress this week"
                  className="shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <RechartsPrimitive.PieChart>
                    <RechartsPrimitive.Pie
                      data={weeklyPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <RechartsPrimitive.Tooltip />
                    <RechartsPrimitive.Legend />
                  </RechartsPrimitive.PieChart>
                </ChartContainer>

                {/* Achievement Areas Chart - Enhanced Version */}
                <ChartContainer 
                  title="Career Competency Map" 
                  description="Your strengths & growth opportunities"
                  className="shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <RechartsPrimitive.RadarChart outerRadius={90} width={730} height={250}>
                    <RechartsPrimitive.PolarGrid gridType="circle" />
                    <RechartsPrimitive.PolarAngleAxis 
                      dataKey="category" 
                      tick={{ fill: '#4F566B', fontSize: 12, fontWeight: 500 }}
                    />
                    <RechartsPrimitive.PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: '#4F566B' }}
                      axisLine={false}
                      tickCount={5}
                    />
                    <RechartsPrimitive.Radar
                      name="Current Skills"
                      dataKey="value"
                      stroke="#5E76F6"
                      fill="#5E76F6"
                      fillOpacity={0.6}
                      data={badgesRadarData}
                    />
                    <RechartsPrimitive.Radar
                      name="Benchmark"
                      dataKey="benchmark"
                      stroke="#FF8A65"
                      fill="#FF8A65"
                      fillOpacity={0.4}
                      data={badgesRadarData.map(item => ({...item, benchmark: 80}))}
                    />
                    <RechartsPrimitive.Legend 
                      iconType="circle"
                      wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                    />
                    <RechartsPrimitive.Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                  </RechartsPrimitive.RadarChart>
                </ChartContainer>
              </div>

              {/* Milestone Progress Chart */}
              <ChartContainer 
                title="Milestone Progress" 
                description="Your journey toward goals"
                className="shadow-md hover:shadow-lg transition-all duration-300"
              >
                <RechartsPrimitive.BarChart data={milestonesBarData} layout="vertical">
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <RechartsPrimitive.XAxis type="number" domain={[0, 100]} />
                  <RechartsPrimitive.YAxis type="category" dataKey="name" width={100} />
                  <RechartsPrimitive.Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                  <RechartsPrimitive.Bar dataKey="value" background={{ fill: '#eee' }} radius={[0, 4, 4, 0]} />
                </RechartsPrimitive.BarChart>
              </ChartContainer>

              {/* Career Milestones */}
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-career-soft/30 to-transparent">
                  <CardTitle className="text-lg font-bold text-career-primary flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Career Milestones
                  </CardTitle>
                  <CardDescription>Your progress toward key career goals</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6 min-h-[260px]">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{milestone.name}</span>
                          <span className="text-career-secondary">{milestone.current} / {milestone.target}</span>
                        </div>
                        <ProgressBar 
                          value={milestone.progress} 
                          className="h-2 bg-career-softGray" 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activities and Badges */}
            <div className="lg:col-span-1 space-y-6">
              {/* This Week's Activity */}
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-career-soft/30 to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-career-primary flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      This Week's Activity
                    </CardTitle>
                    <UIBadge variant="outline" className="bg-career-soft text-career-primary">
                      {weeklyProgress}% Complete
                    </UIBadge>
                  </div>
                  <CardDescription>Track your career progress this week</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <ProgressBar value={weeklyProgress} className="h-2 bg-career-softGray" />
                    
                    <div className="space-y-3 min-h-[260px]">
                      {weeklyGoals.map((goal) => (
                        <div 
                          key={goal.id}
                          className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                            goal.completed 
                              ? 'border-career-primary bg-career-soft/20 shadow-sm' 
                              : 'border-career-softGray hover:border-career-soft'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${
                            goal.completed 
                              ? 'bg-career-primary text-white' 
                              : 'bg-career-softGray text-career-neutralGray'
                          }`}>
                            {goal.completed ? <Check className="w-4 h-4" /> : null}
                          </div>
                          <span className={`${goal.completed ? 'text-career-primary font-medium' : ''}`}>
                            {goal.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges Collection - Enhanced Version */}
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-career-soft/30 to-transparent">
                  <CardTitle className="text-lg font-bold text-career-primary flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Your Achievement Badges
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between mt-1">
                      <span>Career journey achievements</span>
                      <div className="flex items-center">
                        <div className="w-full bg-career-softGray rounded-full h-2.5 inline-block mr-2" style={{ width: '100px' }}>
                          <div className="bg-career-primary h-2.5 rounded-full" style={{ width: `${badgeProgress}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-career-secondary">{unlockedBadges}/{totalBadges}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 max-h-[520px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 gap-4 min-h-[380px]">
                    {badges.map((badge) => (
                      <Card 
                        key={badge.id}
                        className={`border overflow-hidden transition-all duration-200 hover:shadow-md ${
                          badge.unlocked 
                            ? 'border-career-primary bg-gradient-to-r from-career-soft/20 to-white' 
                            : 'border-gray-200 bg-gray-50/80'
                        }`}
                      >
                        <div className="p-4 flex items-center">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 transition-colors ${
                            badge.unlocked 
                              ? 'bg-gradient-to-br from-career-primary to-career-secondary text-white shadow-sm' 
                              : 'bg-career-softGray text-career-neutralGray'
                          }`}>
                            {badge.unlocked ? (
                              <Trophy className="w-6 h-6 drop-shadow-sm" />
                            ) : (
                              <Trophy className="w-6 h-6 opacity-40" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className={`font-medium ${badge.unlocked ? 'text-career-primary' : 'text-career-neutralGray'}`}>
                                {badge.name}
                              </h3>
                              {badge.unlocked && (
                                <UIBadge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                                  <Check className="w-3 h-3 mr-1" /> Earned
                                </UIBadge>
                              )}
                            </div>
                            <p className="text-sm text-career-neutralGray mt-1">
                              {badge.unlocked ? badge.description : badge.unlockCondition}
                            </p>
                            {badge.unlocked && badge.unlockedAt && (
                              <p className="text-xs text-career-secondary mt-2">
                                Earned on {new Date(badge.unlockedAt).toLocaleDateString()}
                              </p>
                            )}
                            {!badge.unlocked && badge.progress !== undefined && (
                              <div className="mt-2 flex items-center">
                                <div className="w-full bg-career-softGray rounded-full h-1.5">
                                  <div className="bg-career-secondary h-1.5 rounded-full" style={{ width: `${badge.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-medium text-career-secondary ml-2">{badge.progress}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-gradient-to-r from-career-soft/10 to-white">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-sm text-career-neutralGray">
                      <span className="font-medium text-career-primary">{unlockedBadges}</span> of <span className="font-medium">{totalBadges}</span> badges unlocked
                    </p>
                    <UIBadge className={`${badgeProgress >= 50 ? 'bg-green-500' : 'bg-career-secondary'}`}>
                      {badgeProgress}% Complete
                    </UIBadge>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Progress; 