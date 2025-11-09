import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { Therapy } from '../types/therapy';
import { getAllTherapies, updateTherapy } from '../utils/therapyStorage';
import RelaxationMusicEditor from '../components/therapy-editors/RelaxationMusicEditor';
import VideoTherapyEditor from '../components/therapy-editors/VideoTherapyEditor';
import { getTherapyContent, saveTherapyContent, getDefaultContentForType } from '../utils/therapyContentStorage';


function AdminTherapyContentEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [therapy, setTherapy] = useState<Therapy | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'content'>('general');
  const [contentData, setContentData] = useState<any>(null);

  const [generalSettings, setGeneralSettings] = useState({
    title: '',
    description: '',
    duration: '',
    sessions: 0,
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    category: '',
    icon: 'Brain',
    color: 'from-blue-500 to-cyan-500',
    tags: [] as string[],
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    if (id) {
      const therapies = getAllTherapies();
      const found = therapies.find(t => t.id === id);
      if (found) {
        setTherapy(found);
        setGeneralSettings({
          title: found.title,
          description: found.description,
          duration: found.duration,
          sessions: found.sessions,
          difficulty: found.difficulty,
          category: found.category,
          icon: found.icon,
          color: found.color,
          tags: found.tags,
          status: found.status
        });

        const isRelaxMusic = found.title.toLowerCase().includes('relaxation') ||
                             found.title.toLowerCase().includes('music');
        const isVideoTherapy = found.title.toLowerCase().includes('video');

        let content = getTherapyContent(id);
        let defaultContent;

        if (isRelaxMusic) {
          defaultContent = getDefaultContentForType('relaxation_music');
        } else if (isVideoTherapy) {
          defaultContent = getDefaultContentForType('video_therapy');
        }

        if (!content && defaultContent) {
          content = defaultContent as any;
        } else if (content) {
          content = content.contentData;
        }

        setContentData(content || defaultContent || {});
      }
    }
  }, [id]);

  const handleSaveGeneral = () => {
    if (!id || !therapy) return;

    const updated = updateTherapy(id, generalSettings);
    if (updated) {
      setTherapy(updated);
      toast.success('General settings saved!');
    }
  };

  const handleSaveContent = () => {
    if (!id || !contentData) {
      console.error('Cannot save: missing id or contentData', { id, contentData });
      toast.error('Cannot save: missing data');
      return;
    }

    console.log('Saving content for therapy:', id);
    console.log('Content data:', contentData);

    const isRelaxMusic = therapy?.title.toLowerCase().includes('relaxation') ||
                         therapy?.title.toLowerCase().includes('music');
    const isVideoTherapy = therapy?.title.toLowerCase().includes('video');

    let therapyType: any = 'relaxation_music';
    if (isVideoTherapy) {
      therapyType = 'video_therapy';
    } else if (isRelaxMusic) {
      therapyType = 'relaxation_music';
    }

    const existingContent = getTherapyContent(id);
    const saved = saveTherapyContent(id, therapyType, contentData, existingContent?.id);
    console.log('Saved content:', saved);
    toast.success('Content saved successfully!');
  };

  const isRelaxationMusic = therapy?.title.toLowerCase().includes('relaxation') ||
                             therapy?.title.toLowerCase().includes('music');
  const isVideoTherapy = therapy?.title.toLowerCase().includes('video');

  if (!therapy) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-gray-400">Loading therapy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/admin/therapy-management')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Therapy Management</span>
          </button>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Edit Therapy Settings
            </h1>
            <p className="text-gray-400">{therapy.title}</p>
          </div>
        </motion.div>

        <div className="mb-6 flex space-x-2 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'general'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'content'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Content Editor
          </button>
        </div>

        {activeTab === 'general' && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={generalSettings.title}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={generalSettings.category}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={generalSettings.description}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={generalSettings.duration}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, duration: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 15-30 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sessions <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={generalSettings.sessions}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, sessions: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={generalSettings.difficulty}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, difficulty: e.target.value as any })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveGeneral}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save General Settings</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isRelaxationMusic && contentData ? (
                  <>
                    <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4 mb-6">
                      <p className="text-blue-200 text-sm font-medium">
                        Remember to click "Save Content" button at the bottom after adding or editing tracks
                      </p>
                    </div>
                    <RelaxationMusicEditor
                      data={contentData}
                      onChange={setContentData}
                    />
                    <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveContent}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Content</span>
                      </motion.button>
                    </div>
                  </>
                ) : isVideoTherapy && contentData ? (
                  <>
                    <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4 mb-6">
                      <p className="text-blue-200 text-sm font-medium">
                        Remember to click "Save Content" button at the bottom after adding or editing videos
                      </p>
                    </div>
                    <VideoTherapyEditor
                      data={contentData}
                      onChange={setContentData}
                    />
                    <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveContent}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Content</span>
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">
                      Content editor not available for this therapy type
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Advanced content editing is currently only available for Relaxation Music and Video Therapy
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTherapyContentEditor;
