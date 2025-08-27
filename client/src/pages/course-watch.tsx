import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseByIdQuery, useGetCourseVideosQuery } from '../app/api/coursesApiSlice';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ArrowLeft, 
  RotateCcw, 
  RotateCw
} from 'lucide-react';

interface CourseDetail {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CourseWatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get user info using the auth hook with localStorage
  const { isAuthenticated } = useAuth();

  const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetCourseByIdQuery(id!);
  const { data: videosData, isLoading: isVideosLoading, error: videosError, refetch } = useGetCourseVideosQuery(id!, {
    skip: !isAuthenticated, // Skip if user is not logged in
    refetchOnMountOrArgChange: 300, // Only refetch if data is older than 5 minutes
    refetchOnFocus: false, // Don't refetch when window gains focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });

  const course: CourseDetail | undefined = courseData?.data;
  const videoData = videosData?.data;
  const signedVideoUrl = videoData?.videoUrl;

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video || !signedVideoUrl) return;
    
    const handleTimeUpdate = () => {
      if (video) {
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (video) {
        setDuration(video.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [signedVideoUrl]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keys if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Prevent default behavior for video control keys
      const videoControlKeys = [' ', 'f', 'F', 'm', 'M', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'k', 'K', '?', 'Escape'];
      if (videoControlKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key.toLowerCase()) {
        case '?': // Question mark - Show keyboard shortcuts
        case '/': // Forward slash - Show keyboard shortcuts (alternative)
          setShowKeyboardHelp(!showKeyboardHelp);
          break;
        
        case 'escape': // Escape - Close keyboard help or exit fullscreen
          if (showKeyboardHelp) {
            setShowKeyboardHelp(false);
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        case ' ': // Spacebar - Play/Pause
        case 'k': // K key - Play/Pause (YouTube style)
          togglePlay();
          break;
        
        case 'f': // F key - Fullscreen
          toggleFullscreen();
          break;
        
        case 'm': // M key - Mute/Unmute
          toggleMute();
          break;
        
        case 'arrowleft': // Left arrow - Skip back 10 seconds
          skipTime(-10);
          break;
        
        case 'arrowright': // Right arrow - Skip forward 10 seconds
          skipTime(10);
          break;
        
        case 'arrowup': // Up arrow - Increase volume
          if (videoRef.current) {
            const newVolume = Math.min(1, volume + 0.1);
            setVolume(newVolume);
            videoRef.current.volume = newVolume;
            setIsMuted(false);
            videoRef.current.muted = false;
          }
          break;
        
        case 'arrowdown': // Down arrow - Decrease volume
          if (videoRef.current) {
            const newVolume = Math.max(0, volume - 0.1);
            setVolume(newVolume);
            videoRef.current.volume = newVolume;
            if (newVolume === 0) {
              setIsMuted(true);
              videoRef.current.muted = true;
            }
          }
          break;
        
        case 'j': // J key - Skip back 10 seconds (YouTube style)
          skipTime(-10);
          break;
        
        case 'l': // L key - Skip forward 10 seconds (YouTube style)
          skipTime(10);
          break;
        
        case ',': // Comma - Previous frame (when paused)
          if (videoRef.current && !isPlaying) {
            videoRef.current.currentTime = Math.max(0, currentTime - 1/30); // Move back 1 frame (assuming 30fps)
          }
          break;
        
        case '.': // Period - Next frame (when paused)
          if (videoRef.current && !isPlaying) {
            videoRef.current.currentTime = Math.min(duration, currentTime + 1/30); // Move forward 1 frame
          }
          break;
        
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          // Number keys - Jump to percentage of video
          const percentage = parseInt(e.key) / 10;
          if (videoRef.current && duration) {
            const newTime = duration * percentage;
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }
          break;
        
        case 'home': // Home key - Go to beginning
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setCurrentTime(0);
          }
          break;
        
        case 'end': // End key - Go to end
          if (videoRef.current && duration) {
            videoRef.current.currentTime = duration;
            setCurrentTime(duration);
          }
          break;
      }
    };

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted, volume, currentTime, duration, showKeyboardHelp]);

  // Show keyboard shortcuts hint on first load
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('valorem-keyboard-hint-seen');
    if (!hasSeenHint && signedVideoUrl) {
      const timer = setTimeout(() => {
        localStorage.setItem('valorem-keyboard-hint-seen', 'true');
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [signedVideoUrl]);

  // Video player functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (hasEnded) {
        // إذا انتهى الفيديو، أعد تشغيله من البداية
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
        setHasEnded(false);
      } else if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      // شغل الفيديو تلقائياً عند التحرك في أي موضع
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
      setHasEnded(false);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
      // شغل الفيديو تلقائياً عند استخدام التقديم/الإرجاع
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
      setHasEnded(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  console.log('🎬 Videos Data:', videosData);
  console.log('🎬 Videos Error:', videosError);
  console.log('🎬 Videos Loading:', isVideosLoading);
  console.log('🎬 Signed Video URL:', signedVideoUrl);

  // Early returns after all hooks are called
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isCourseLoading || isVideosLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-8"></div>
            <div className="absolute inset-0 animate-ping w-20 h-20 border-4 border-blue-400/20 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Course Content</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we prepare your learning experience...</p>
        </div>
      </div>
    );
  }

  // Handle access denied (user doesn't own the course)
  if (videosError && 'status' in videosError && videosError.status === 403) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-red-200/50 dark:border-red-700/50 rounded-2xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">🔒</span>
              </div>
              <h1 className="text-3xl font-bold text-red-800 dark:text-red-400 mb-4">Access Denied</h1>
              <p className="text-red-600 dark:text-red-300 mb-8 text-lg leading-relaxed">
                You don't have access to this course. Please purchase it first to watch the content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate(`/courses/${id}`)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  View Course Details
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/courses')}
                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Browse All Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (courseError || videosError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl text-white">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error Loading Course</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Something went wrong while loading the course content.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl text-white">📚</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 pl-5 pr-4 py-5">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
            >
              Valorem
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="group flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-medium">Back to Courses</span>
            </button>
          </div>
          <div className="text-right">
            <div className="px-4 lg:px-32 xl:px-64 text-right">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {course?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course?.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Video Player */}
            <div className="lg:col-span-3">
              <div 
                ref={containerRef}
                className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                onMouseMove={handleMouseMove}
              >
                <div className="aspect-video relative">
                  {signedVideoUrl ? (
                    <video
                      ref={videoRef}
                      src={signedVideoUrl}
                      className="w-full h-full object-contain"
                      controlsList="nodownload"
                      onClick={togglePlay}
                      onError={(e) => {
                        console.error('🎬 Video Error:', e);
                        // Don't auto-refetch to prevent infinite loops
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative">
                          <div className="animate-spin w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"></div>
                          <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-blue-400/20 rounded-full mx-auto"></div>
                        </div>
                        <p className="text-white/90 text-lg font-medium mb-6">Loading secure video...</p>
                        <Button 
                          onClick={() => refetch()} 
                          variant="outline" 
                          className="text-white border-white/30 hover:border-white hover:bg-white/10 transition-all duration-200"
                        >
                          Retry Loading
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Video Controls Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* Center Play Button (when paused) */}
                    {(!isPlaying || hasEnded) && signedVideoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={togglePlay}
                          className="group bg-white/10 backdrop-blur-md rounded-full p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
                        >
                          {hasEnded ? (
                            <RotateCcw className="h-16 w-16 text-white group-hover:text-blue-200 transition-colors" />
                          ) : (
                            <Play className="h-16 w-16 text-white ml-2 group-hover:text-blue-200 transition-colors" />
                          )}
                        </button>
                        {hasEnded && (
                          <div className="absolute -bottom-20 text-center animate-fade-in">
                            <p className="text-white text-lg font-semibold mb-2">Video Completed</p>
                            <p className="text-white/80 text-sm">Click to replay</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <input
                          type="range"
                          min={0}
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider hover:h-3 transition-all"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-white/80 mt-2 font-mono">
                          <span className="bg-black/30 px-2 py-1 rounded">{formatTime(currentTime)}</span>
                          <span className="bg-black/30 px-2 py-1 rounded">{formatTime(duration)}</span>
                        </div>
                      </div>
                      
                      {/* Control Buttons */}
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={togglePlay}
                            className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                            title={`${hasEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play'} (Space or K)`}
                          >
                            {hasEnded ? (
                              <RotateCcw className="h-6 w-6" />
                            ) : isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => skipTime(-10)}
                            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                            title="Skip back 10s (← or J)"
                          >
                            <RotateCcw className="h-5 w-5" />
                          </button>
                          
                          <button
                            onClick={() => skipTime(10)}
                            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                            title="Skip forward 10s (→ or L)"
                          >
                            <RotateCw className="h-5 w-5" />
                          </button>

                          <div className="flex items-center space-x-2 bg-black/20 rounded-full px-3 py-2">
                            <button
                              onClick={toggleMute}
                              className="p-1 hover:bg-white/20 rounded-full transition-all duration-200"
                              title={`${isMuted ? 'Unmute' : 'Mute'} (M)`}
                            >
                              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                            </button>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.1}
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer hover:h-2 transition-all"
                              title="Volume (↑ ↓ arrows)"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowKeyboardHelp(true)}
                            className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                            title="Keyboard shortcuts (?)"
                          >
                            <span className="text-white text-lg font-bold">⌨</span>
                          </button>

                          <button
                            onClick={toggleFullscreen}
                            className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                            title="Fullscreen (F)"
                          >
                            <Maximize className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Course Information Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sticky top-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Details</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="group">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {course?.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span>Next Lessons</span>
                      </h4>
                      
                      <div className="space-y-3">
                        {/* Placeholder for next lessons */}
                        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                Advanced React Concepts
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">12:45 duration</p>
                            </div>
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                State Management Patterns
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">18:20 duration</p>
                            </div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">4</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                Performance Optimization
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">15:30 duration</p>
                            </div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-gray-600 dark:text-gray-300"
                        disabled
                      >
                        <div className="flex items-center space-x-2">
                          <span>📚</span>
                          <span>View All Lessons</span>
                        </div>
                      </Button>
                    </div>
                  </div>
{/* 
                  <div className="pt-4 border-t border-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                      <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Category</span>
                      </span>
                      <span className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-full font-medium shadow-lg">
                        {course?.category}
                      </span>
                    </div>
                  </div> */}

                  {/* <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Video Access</span>
                        </span>
                        <span className="text-sm text-green-700 dark:text-green-400 font-semibold flex items-center space-x-1">
                          <span>✓</span>
                          <span>Granted</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Security</span>
                        </span>
                        <span className="text-sm text-purple-700 dark:text-purple-400 font-semibold flex items-center space-x-1">
                          <span>🔒</span>
                          <span>Encrypted</span>
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Button 
                      onClick={() => refetch()} 
                      variant="outline" 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] py-3"
                      disabled={isVideosLoading}
                    >
                      {isVideosLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                          <span>Refreshing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <RotateCcw className="h-4 w-4" />
                          <span>Refresh Video Access</span>
                        </div>
                      )}
                    </Button>
                  </div> */}

                  {/* Progress Indicator */}
                  <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {duration ? `${Math.round((currentTime / duration) * 100)}%` : '0%'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>⌨️</span>
                  <span>Keyboard Shortcuts</span>
                </h2>
                <button
                  onClick={() => setShowKeyboardHelp(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <span className="text-xl text-gray-500 dark:text-gray-400">✕</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Playback Controls */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Playback Controls
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Play/Pause</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">Space</kbd>
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">K</kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Fullscreen</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">F</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Mute/Unmute</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">M</kbd>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Navigation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Skip back 10s</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">←</kbd>
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">J</kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Skip forward 10s</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">→</kbd>
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">L</kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Go to beginning</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">Home</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Go to end</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">End</kbd>
                    </div>
                  </div>
                </div>

                {/* Volume Controls */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Volume Controls
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Volume up</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">↑</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Volume down</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">↓</kbd>
                    </div>
                  </div>
                </div>

                {/* Advanced Controls */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Advanced
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Jump to %</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">0-9</kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Frame back/forward</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">,</kbd>
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">.</kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Close help/Exit fullscreen</span>
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">Esc</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Show this help</span>
                      <div className="flex space-x-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">?</kbd>
                        <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border">/</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                  <span className="font-semibold">💡 Tip:</span> These shortcuts work when the video player is focused and you're not typing in an input field.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseWatchPage;