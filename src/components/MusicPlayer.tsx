"use client";

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface MusicPlayerProps {
  track: {
    title: string;
    artist: string;
    image: string;
    audioSrc: string;
  } | null;
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1512]/80 backdrop-blur-lg border-t border-[#2a2520]">
        <audio ref={audioRef} />
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-4 w-1/3">
                    <img src={track.image} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                        <p className="font-medium text-[#f5e6d3] truncate">{track.title}</p>
                        <p className="text-xs text-[#f5e6d3]/50">{track.artist}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-white/10 text-[#f5e6d3]/70">
                            <SkipBack className="w-5 h-5" />
                        </Button>
                        <Button onClick={togglePlay} variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-white/10 text-[#f5e6d3]/70">
                            <SkipForward className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="w-full max-w-sm flex items-center gap-2">
                        <span className="text-xs text-[#f5e6d3]/50">{audioRef.current ? new Date(audioRef.current.currentTime * 1000).toISOString().substr(14, 5) : '00:00'}</span>
                        <Progress value={progress} className="h-1 bg-[#2a2520]" />
                        <span className="text-xs text-[#f5e6d3]/50">{audioRef.current ? new Date(audioRef.current.duration * 1000).toISOString().substr(14, 5) : '00:00'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-1/3 justify-end">
                    <Button onClick={toggleMute} variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-white/10 text-[#f5e6d3]/70">
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-[#2a2520] rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
