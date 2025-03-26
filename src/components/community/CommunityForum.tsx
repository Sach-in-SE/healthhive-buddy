
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, User, Calendar, Verified, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for community posts
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Living with Chronic Migraines',
    content: 'I\'ve been dealing with chronic migraines for the past 5 years. Has anyone found effective treatments or lifestyle changes that helped reduce frequency?',
    author: 'MigraineWarrior',
    authorType: 'patient',
    date: '2023-05-15',
    likes: 24,
    comments: 8,
    tags: ['Migraines', 'Chronic Pain', 'Treatment']
  },
  {
    id: '2',
    title: 'Tips for Managing Anxiety and Stress',
    content: 'Anxiety and stress can significantly impact your health. Regular exercise, proper sleep, mindfulness meditation, and balanced nutrition can help manage symptoms.',
    author: 'Dr. Sarah Johnson',
    authorType: 'doctor',
    date: '2023-06-02',
    likes: 56,
    comments: 12,
    tags: ['Mental Health', 'Anxiety', 'Stress Management']
  },
  {
    id: '3',
    title: 'Navigating a New Diabetes Diagnosis',
    content: 'I was recently diagnosed with Type 2 Diabetes. Looking for advice on diet, monitoring blood sugar, and lifestyle adjustments. Any tips from those who have been through this?',
    author: 'NewToThis',
    authorType: 'patient',
    date: '2023-06-10',
    likes: 18,
    comments: 15,
    tags: ['Diabetes', 'Nutrition', 'Health Management']
  },
  {
    id: '4',
    title: 'Important Facts About COVID-19 Vaccinations',
    content: 'As a public health official, I want to address common concerns about COVID-19 vaccines. They are safe, effective, and crucial for community protection. Ask questions below.',
    author: 'Dr. Michael Chen',
    authorType: 'doctor',
    date: '2023-06-15',
    likes: 87,
    comments: 32,
    tags: ['COVID-19', 'Vaccination', 'Public Health']
  }
];

// Categories for posts
const CATEGORIES = [
  'All Topics',
  'Chronic Conditions',
  'Mental Health',
  'Nutrition',
  'Fitness',
  'Preventive Care',
  'Medications'
];

const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const { translate, currentLanguage } = useLanguage();

  const handleNewPost = () => {
    toast.info('New post feature coming soon!', {
      description: 'The ability to create new posts will be available in the next update.'
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'All Topics' ||
      post.tags.some(tag => tag.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Community Health Forum</h2>
          <Button className="health-gradient" onClick={handleNewPost}>
            Start a New Discussion
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search discussions..."
              className="w-full"
            />
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue="All Topics" className="w-full">
              <TabsList className="w-full overflow-x-auto flex whitespace-nowrap p-0 h-10">
                {CATEGORIES.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="flex-1"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-health-100 rounded-full flex items-center justify-center text-health-600">
                      <User size={16} />
                    </div>
                    <span className="ml-2 font-medium">{post.author}</span>
                    {post.authorType === 'doctor' && (
                      <span className="ml-1 text-blue-500">
                        <Verified size={16} />
                      </span>
                    )}
                  </div>
                  <span className="ml-auto text-xs text-gray-500 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center pt-2 border-t border-gray-100">
                  <button 
                    className="text-gray-500 flex items-center text-sm hover:text-health-500"
                    onClick={() => toast.success('Feature coming soon!')}
                  >
                    <Heart size={16} className="mr-1" />
                    {post.likes}
                  </button>
                  <button 
                    className="text-gray-500 flex items-center text-sm ml-4 hover:text-health-500"
                    onClick={() => toast.success('Feature coming soon!')}
                  >
                    <MessageCircle size={16} className="mr-1" />
                    {post.comments}
                  </button>
                  
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">
                      View Discussion
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <AlertTriangle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No discussions found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
