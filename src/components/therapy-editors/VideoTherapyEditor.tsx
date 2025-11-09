import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Video, Upload, Save, Edit2, X, Image } from 'lucide-react';
import { VideoContent } from '../../types/therapyContent';
import toast from 'react-hot-toast';

interface VideoTherapyEditorProps {
  data: { videos: VideoContent[] };
  onChange: (data: { videos: VideoContent[] }) => void;
}

export default function VideoTherapyEditor({ data, onChange }: VideoTherapyEditorProps) {
  const [editingVideo, setEditingVideo] = React.useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = React.useState<{ id: string; type: 'video' | 'thumbnail' } | null>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);

  const addVideo = () => {
    const newVideo: VideoContent = {
      id: `video_${Date.now()}`,
      title: '',
      url: '',
      duration: 0,
      description: '',
      thumbnailUrl: ''
    };
    onChange({ ...data, videos: [...data.videos, newVideo] });
    setEditingVideo(newVideo.id);
  };

  const removeVideo = (id: string) => {
    onChange({
      ...data,
      videos: data.videos.filter(v => v.id !== id)
    });
  };

  const updateVideo = (id: string, field: keyof VideoContent, value: any) => {
    const updatedData = {
      ...data,
      videos: data.videos.map(v =>
        v.id === id ? { ...v, [field]: value } : v
      )
    };
    console.log('Updating video:', id, field, value);
    onChange(updatedData);
  };

  const handleFileUpload = async (videoId: string, file: File, type: 'video' | 'thumbnail') => {
    if (type === 'video' && !file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    if (type === 'thumbnail' && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error('File size must be less than 100MB');
      return;
    }

    setUploadingFile({ id: videoId, type });
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        if (type === 'video') {
          updateVideo(videoId, 'url', dataUrl);

          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = () => {
            updateVideo(videoId, 'duration', Math.floor(video.duration));
            window.URL.revokeObjectURL(video.src);
          };
          video.src = dataUrl;

          toast.success('Video file uploaded successfully');
        } else {
          updateVideo(videoId, 'thumbnailUrl', dataUrl);
          toast.success('Thumbnail uploaded successfully');
        }

        setUploadingFile(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error(`Failed to upload ${type}`);
      setUploadingFile(null);
    }
  };

  const saveVideo = (videoId: string) => {
    const video = data.videos.find(v => v.id === videoId);
    if (!video?.title || !video?.url) {
      toast.error('Please fill in title and upload video file');
      return;
    }
    setEditingVideo(null);
    toast.success('Video saved successfully');
  };

  const cancelEdit = (videoId: string) => {
    const video = data.videos.find(v => v.id === videoId);
    if (!video?.title || !video?.url) {
      removeVideo(videoId);
    } else {
      setEditingVideo(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Video Content</span>
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addVideo}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video</span>
          </motion.button>
        </div>

        {data.videos.length === 0 ? (
          <div className="bg-gray-700 rounded-lg p-8 text-center border border-dashed border-gray-600">
            <Video className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No videos added yet</p>
            <p className="text-gray-500 text-sm mt-1">Click "Add Video" to upload video content</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-700 rounded-lg p-5 border border-gray-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>{video.title || 'New Video'}</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    {editingVideo === video.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => saveVideo(video.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => cancelEdit(video.id)}
                          className="p-1.5 text-gray-400 hover:bg-gray-600 rounded"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditingVideo(video.id)}
                          className="p-2 text-blue-400 hover:bg-blue-400 hover:bg-opacity-10 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeVideo(video.id)}
                          className="p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                {editingVideo === video.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Title *</label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter video title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Description</label>
                      <textarea
                        value={video.description}
                        onChange={(e) => updateVideo(video.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a description for this video"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2 font-medium">Video File *</label>
                        <input
                          type="file"
                          ref={videoInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(video.id, file, 'video');
                          }}
                          accept="video/*"
                          className="hidden"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => videoInputRef.current?.click()}
                          disabled={uploadingFile?.id === video.id && uploadingFile?.type === 'video'}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Upload className="w-4 h-4" />
                          <span>
                            {uploadingFile?.id === video.id && uploadingFile?.type === 'video'
                              ? 'Uploading...'
                              : video.url
                              ? 'Change Video'
                              : 'Upload Video'}
                          </span>
                        </motion.button>
                        {video.url && (
                          <div className="mt-2 flex items-center space-x-2 text-sm text-green-400">
                            <Video className="w-4 h-4" />
                            <span>Video uploaded ({formatTime(video.duration)})</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">Supported: MP4, WebM, OGG (Max 100MB)</p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2 font-medium">Thumbnail Image</label>
                        <input
                          type="file"
                          ref={thumbnailInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(video.id, file, 'thumbnail');
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => thumbnailInputRef.current?.click()}
                          disabled={uploadingFile?.id === video.id && uploadingFile?.type === 'thumbnail'}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Image className="w-4 h-4" />
                          <span>
                            {uploadingFile?.id === video.id && uploadingFile?.type === 'thumbnail'
                              ? 'Uploading...'
                              : video.thumbnailUrl
                              ? 'Change Thumbnail'
                              : 'Upload Thumbnail'}
                          </span>
                        </motion.button>
                        {video.thumbnailUrl && (
                          <div className="mt-2">
                            <img
                              src={video.thumbnailUrl}
                              alt="Thumbnail preview"
                              className="w-full h-20 object-cover rounded border border-gray-500"
                            />
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG, GIF (Max 10MB)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Duration (seconds)</label>
                      <input
                        type="number"
                        value={video.duration}
                        onChange={(e) => updateVideo(video.id, 'duration', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Duration in seconds"
                        min="1"
                      />
                      <p className="text-xs text-gray-400 mt-1">Auto-detected from video or enter manually</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    {video.thumbnailUrl && (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded border border-gray-500"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      {video.description && (
                        <p className="text-sm text-gray-300">{video.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white">{formatTime(video.duration)}</span>
                        </div>
                        {video.url && (
                          <div className="flex items-center space-x-2">
                            <Video className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Video uploaded</span>
                          </div>
                        )}
                        {video.thumbnailUrl && (
                          <div className="flex items-center space-x-2">
                            <Image className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400">Thumbnail set</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-200 font-semibold mb-2">Video Upload Guidelines</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Upload video files directly (MP4, WebM, OGG formats supported)</li>
          <li>• Maximum video file size: 100MB per video</li>
          <li>• Add thumbnail images for better visual presentation</li>
          <li>• Duration is automatically detected from uploaded videos</li>
          <li>• Files are stored locally in browser storage</li>
        </ul>
      </div>
    </div>
  );
}
