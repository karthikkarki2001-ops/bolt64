import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Music2, Link as LinkIcon, Upload, Save, Edit2, X } from 'lucide-react';
import { AudioTrack } from '../../types/therapyContent';
import toast from 'react-hot-toast';

interface RelaxationMusicEditorProps {
  data: { audioTracks: AudioTrack[]; categories: string[] };
  onChange: (data: { audioTracks: AudioTrack[]; categories: string[] }) => void;
}

export default function RelaxationMusicEditor({ data, onChange }: RelaxationMusicEditorProps) {
  const [newCategory, setNewCategory] = React.useState('');
  const [editingTrack, setEditingTrack] = React.useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const predefinedCategories = [
    'Nature Sounds',
    'Meditation Music',
    'Sleep Sounds',
    'Focus and Concentration'
  ];

  const addTrack = () => {
    const newTrack: AudioTrack = {
      id: `track_${Date.now()}`,
      title: '',
      url: '',
      duration: 300,
      mood: predefinedCategories[0],
      description: ''
    };
    onChange({ ...data, audioTracks: [...data.audioTracks, newTrack] });
    setEditingTrack(newTrack.id);
  };

  const removeTrack = (id: string) => {
    onChange({
      ...data,
      audioTracks: data.audioTracks.filter(t => t.id !== id)
    });
  };

  const updateTrack = (id: string, field: keyof AudioTrack, value: any) => {
    onChange({
      ...data,
      audioTracks: data.audioTracks.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const handleFileUpload = async (trackId: string, file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast.error('Please upload an audio file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setUploadingFile(trackId);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        updateTrack(trackId, 'url', url);

        const audio = new Audio(url);
        audio.onloadedmetadata = () => {
          updateTrack(trackId, 'duration', Math.floor(audio.duration));
        };

        toast.success('Audio file uploaded successfully');
        setUploadingFile(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload audio file');
      setUploadingFile(null);
    }
  };

  const saveTrack = (trackId: string) => {
    const track = data.audioTracks.find(t => t.id === trackId);
    if (!track?.title || !track?.url) {
      toast.error('Please fill in title and upload audio file');
      return;
    }
    setEditingTrack(null);
    toast.success('Track saved successfully');
  };

  const cancelEdit = (trackId: string) => {
    const track = data.audioTracks.find(t => t.id === trackId);
    if (!track?.title || !track?.url) {
      removeTrack(trackId);
    } else {
      setEditingTrack(null);
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !data.categories.includes(newCategory.trim())) {
      onChange({ ...data, categories: [...data.categories, newCategory.trim()] });
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    onChange({ ...data, categories: data.categories.filter(c => c !== category) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Audio Categories</h3>

        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 mb-4">
          <p className="text-gray-300 text-sm mb-3">Predefined Categories:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-4 py-2 bg-teal-900 text-teal-200 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Music2 className="w-5 h-5" />
            <span>Audio Tracks</span>
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTrack}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Track</span>
          </motion.button>
        </div>

        {data.audioTracks.length === 0 ? (
          <div className="bg-gray-700 rounded-lg p-8 text-center border border-dashed border-gray-600">
            <Music2 className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No audio tracks added yet</p>
            <p className="text-gray-500 text-sm mt-1">Click "Add Track" to upload audio files</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.audioTracks.map((track) => (
              <div
                key={track.id}
                className="bg-gray-700 rounded-lg p-5 border border-gray-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center space-x-2">
                    <Music2 className="w-5 h-5" />
                    <span>{track.title || 'New Track'}</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    {editingTrack === track.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => saveTrack(track.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => cancelEdit(track.id)}
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
                          onClick={() => setEditingTrack(track.id)}
                          className="p-2 text-blue-400 hover:bg-blue-400 hover:bg-opacity-10 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeTrack(track.id)}
                          className="p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                {editingTrack === track.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Title *</label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => updateTrack(track.id, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter track title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Category *</label>
                      <select
                        value={track.mood}
                        onChange={(e) => updateTrack(track.id, 'mood', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {predefinedCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Audio File *</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(track.id, file);
                        }}
                        accept="audio/*"
                        className="hidden"
                      />
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingFile === track.id}
                          className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{uploadingFile === track.id ? 'Uploading...' : 'Upload Audio File'}</span>
                        </motion.button>
                        {track.url && (
                          <span className="text-sm text-green-400 flex items-center space-x-1">
                            <Music2 className="w-4 h-4" />
                            <span>File uploaded</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Supported formats: MP3, WAV, OGG (Max 50MB)</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Description (Optional)</label>
                      <textarea
                        value={track.description}
                        onChange={(e) => updateTrack(track.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a description for this track"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Duration</label>
                      <input
                        type="number"
                        value={track.duration}
                        onChange={(e) => updateTrack(track.id, 'duration', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Duration in seconds"
                        min="1"
                      />
                      <p className="text-xs text-gray-400 mt-1">Automatically detected from uploaded file or enter manually</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Category:</span>
                      <span className="px-2 py-1 bg-teal-900 text-teal-200 rounded text-xs">{track.mood}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                    {track.description && (
                      <div className="text-sm">
                        <span className="text-gray-400">Description:</span>
                        <p className="text-gray-300 mt-1">{track.description}</p>
                      </div>
                    )}
                    {track.url && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Music2 className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Audio file uploaded</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-200 font-semibold mb-2">Audio Upload Guidelines</h4>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Upload audio files directly (MP3, WAV, OGG formats supported)</li>
          <li>• Maximum file size: 50MB per track</li>
          <li>• Files are stored locally in browser storage</li>
          <li>• Duration is automatically detected from uploaded files</li>
          <li>• Use predefined categories for consistent organization</li>
        </ul>
      </div>
    </div>
  );
}
