"use client";

import { useState, useEffect, useRef } from "react";
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Plus,
  Settings2,
  Sparkles,
  Music,
  Database,
  Upload,
  FileAudio,
  Trash2,
  CheckCircle2,
  Play,
  X,
  Loader2,
  CloudUpload,
  Folder,
  FileMusic,
  HardDrive,
  Cloud,
  Download,
  Link2,
  Save,
  ExternalLink,
  Dices,
  Mic,
  Users,
  Wand2,
  Volume2,
  FileText,
  Mic2,
  Shuffle,
} from "lucide-react";
import {
  saveFileToLocal,
  deleteFileFromLocal,
  downloadToComputer,
  exportDatabaseMetadata,
  uploadToCloud,
  getStorageUsage,
  formatBytes,
  initDB,
  type AudioDatabase,
  type StorageLocation,
} from "@/lib/storage";

// Random generation data
const genres = [
  "house", "techno", "trance", "dubstep", "drum and bass", "EDM",
  "hip-hop", "trap", "lo-fi", "boom bap", "jazz rap",
  "rock", "indie rock", "punk rock", "metal", "alternative rock",
  "jazz", "smooth jazz", "bebop", "fusion", "swing",
  "pop", "synth-pop", "indie pop", "electropop", "dream pop",
  "R&B", "soul", "funk", "disco", "neo-soul",
  "ambient", "chillwave", "downtempo", "vaporwave", "synthwave",
  "reggae", "dancehall", "ska", "dub",
  "country", "bluegrass", "folk", "acoustic",
  "classical", "orchestral", "cinematic", "epic",
  "latin", "reggaeton", "salsa", "bossa nova", "samba",
  "afrobeat", "afro-house", "amapiano", "grime", "UK garage"
];

const bpmRanges = [
  { min: 60, max: 80, name: "slow" },
  { min: 80, max: 100, name: "moderate" },
  { min: 100, max: 120, name: "upbeat" },
  { min: 120, max: 140, name: "energetic" },
  { min: 140, max: 160, name: "fast" },
  { min: 160, max: 180, name: "intense" }
];

const styles = [
  "energetic and uplifting",
  "dark and mysterious",
  "melancholic and emotional",
  "aggressive and powerful",
  "smooth and groovy",
  "atmospheric and dreamy",
  "minimal and hypnotic",
  "epic and cinematic",
  "raw and gritty",
  "lush and vibrant",
  "nostalgic and warm",
  "futuristic and experimental",
  "romantic and intimate",
  "rebellious and edgy",
  "peaceful and meditative",
  "playful and fun",
  "sophisticated and elegant",
  "psychedelic and trippy",
  "vintage and retro",
  "modern and polished"
];

const themes = [
  "summer nights", "city lights", "heartbreak", "celebration", "memories",
  "adventure", "lost love", "freedom", "dreams", "midnight drives",
  "ocean waves", "neon lights", "friendship", "nostalgia", "hope",
  "rebellion", "reflection", "romance", "victory", "the journey",
  "inner peace", "chaos", "transformation", "escape", "connection"
];

//Voice model data
const voiceModels = [
  { id: "noah", name: "Noah", gender: "Male", style: "Pop, RnB", range: "Tenor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "hailey", name: "Hailey", gender: "Female", style: "Dance, Pop, Belting", range: "Soprano", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  { id: "josh", name: "Josh", gender: "Male", style: "Country, Rock", range: "Baritone", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  { id: "blake", name: "Blake", gender: "Male", style: "Rock, Gritty, Power", range: "Tenor", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
  { id: "nicole", name: "Nicole", gender: "Female", style: "Dance, Pop, RnB", range: "Alto", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  { id: "mark", name: "Mark", gender: "Male", style: "Pop, Dance, Airy", range: "Tenor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { id: "amina", name: "Amina", gender: "Female", style: "Jazz, RnB, Ethereal", range: "Mezzo-Soprano", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop" },
  { id: "ava", name: "Ava", gender: "Female", style: "Indie, Folk, Ethereal", range: "Soprano", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop" },
];

// Animated headline phrases
const headlinePhrases = [
  "a house song about",
  "an epic anthem about",
  "a jazz ballad about",
  "a lo-fi beat about",
  "a rock song about",
  "a synthwave track about",
];

// Song card data
const songCards = [
  {
    id: 1,
    title: "A.M. Love",
    artist: "Loraem",
    image: "https://69bfa22c10e539a9070ae09d.imgix.net/robert-nas-mitchell-4keBOKrs6c0-unsplash.jpg?w=2500&h=2500",
    position: "left-top",
  },
  {
    id: 2,
    title: "Muévelo Lento",
    artist: "NÁLVO",
    image: "https://69bfa22c10e539a9070ae09d.imgix.net/Screenshot%202026-03-22%20024438.jpg?w=2500&h=2500&ar=1%3A1&fit=crop&upscale=true&auto=enhance%2Ccompress%2Cformat",
    position: "right-top",
  },
  {
    id: 3,
    title: "Floor To The Bed",
    artist: "Angel Leigh",
    image: "https://69bfa22c10e539a9070ae09d.imgix.net/The%20Sound%20Benders%20-%20Floor%20To%20The%20Bed%20(R&B,%20Trap).jpg?w=2500&h=2500",
    position: "left-bottom",
  },
  {
    id: 4,
    title: "Is There Someone for Me",
    artist: "AÉON",
    image: "https://69bfa22c10e539a9070ae09d.imgix.net/Screenshot%202026-03-22%20024552.jpg?w=2500&h=2500&ar=1%3A1&fit=crop",
    position: "right-bottom",
  },
];

// Press logos
const pressLogos = [
  { name: "Billboard", src: "https://ext.same-assets.com/195461215/1099911289.svg" },
  { name: "Complex", src: "https://ext.same-assets.com/195461215/727291186.svg" },
  { name: "Forbes", src: "https://ext.same-assets.com/195461215/53744739.svg" },
  { name: "Rolling Stone", src: "https://ext.same-assets.com/195461215/4051459706.svg" },
  { name: "Variety", src: "https://ext.same-assets.com/195461215/3893919270.svg" },
  { name: "Wired", src: "https://ext.same-assets.com/195461215/3170023879.svg" },
];

interface DatabaseFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "ready" | "error";
  progress: number;
  storageLocation: StorageLocation;
  cloudUrl?: string;
  file?: File;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [databaseFiles, setDatabaseFiles] = useState<DatabaseFile[]>([]);
  const [activeDatabase, setActiveDatabase] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [storageLocation, setStorageLocation] = useState<StorageLocation>(null);
  const [showStorageSelector, setShowStorageSelector] = useState(false);
  const [cloudUploadProgress, setCloudUploadProgress] = useState(0);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice model state
  const [isVoiceModelsOpen, setIsVoiceModelsOpen] = useState(false);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<string | null>(null);
  const [blendVoices, setBlendVoices] = useState<string[]>([]);
  const [voiceBlendStrength, setVoiceBlendStrength] = useState(50);

  // Lyrics generator state
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [lyricTheme, setLyricTheme] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false);

  // Advanced settings state
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedBPM, setSelectedBPM] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [surpriseMe, setSurpriseMe] = useState(false);

  // Music player state
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    image: string;
    audioSrc: string;
  } | null>(null);

  const handlePlayTrack = (track: {
    title: string;
    artist: string;
    image: string;
    audioSrc: string;
  }) => {
    setCurrentTrack(track);
  };

  // Initialize IndexedDB on mount
  useEffect(() => {
    initDB().then(() => {
      getStorageUsage().then(setStorageUsage);
    });
  }, []);

  const handleCreate = () => {
    if (!prompt.trim() && !activeDatabase) {
      alert("Please enter a prompt or select a database to create music!");
      return;
    }
    setIsCreating(true);
    // Simulate creation
    setTimeout(() => {
      setIsCreating(false);
      alert(`Creating music ${activeDatabase ? 'with custom database' : 'from prompt'}: "${prompt || 'New Song'}"`);
    }, 1500);
  };

  const handleRandomGeneration = () => {
    // Turn off surprise me if it's on
    if (surpriseMe) {
      setSurpriseMe(false);
    }

    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomBPM = bpmRanges[Math.floor(Math.random() * bpmRanges.length)];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomVoice = voiceModels[Math.floor(Math.random() * voiceModels.length)];

    setSelectedGenre(randomGenre);
    setSelectedBPM(randomBPM.name);
    setSelectedStyle(randomStyle);
    setSelectedVoiceModel(randomVoice.id);

    setPrompt(`A ${randomGenre} track in a ${randomStyle} style at a ${randomBPM.name} tempo (${randomBPM.min}-${randomBPM.max} BPM), with a ${randomVoice.gender} vocalist (${randomVoice.name})`);
  };

  // Voice-to-text handler
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setLyricTheme((prev) => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    // Auto-stop after 30 seconds
    setTimeout(() => {
      recognition.stop();
    }, 30000);
  };

  // AI Lyrics Generation
  const generateLyrics = () => {
    if (!lyricTheme.trim()) {
      alert("Please enter a theme or topic for your lyrics!");
      return;
    }

    setIsGeneratingLyrics(true);

    // Simulate AI lyric generation
    setTimeout(() => {
      const generatedLyrics = `[Verse 1]
${lyricTheme}, a story untold
Feelings emerging, breaking the mold
In the rhythm of life, we find our way
Through the night and into the day

[Chorus]
This is our moment, this is our time
Rising together, in perfect rhyme
${lyricTheme}, echoing through the air
A melody of hope, beyond compare

[Verse 2]
Chasing dreams that never fade
Building bridges we have made
In every heartbeat, in every sound
The music lifts us off the ground

[Chorus]
This is our moment, this is our time
Rising together, in perfect rhyme
${lyricTheme}, echoing through the air
A melody of hope, beyond compare

[Bridge]
When the world feels heavy
And the road seems long
We find strength in the music
We find where we belong

[Final Chorus]
This is our moment, this is our time
Rising together, in perfect rhyme
${lyricTheme}, echoing through the air
A melody of hope, we'll always share`;

      setLyrics(generatedLyrics);
      setIsGeneratingLyrics(false);
    }, 2000);
  };

  // Surprise Me effect
  useEffect(() => {
    if (surpriseMe) {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const randomBPM = bpmRanges[Math.floor(Math.random() * bpmRanges.length)].name;
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      setSelectedGenre(randomGenre);
      setSelectedBPM(randomBPM);
      setSelectedStyle(randomStyle);
    }
  }, [surpriseMe]);

  // Animated headline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % headlinePhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle file upload with storage location
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    // Show storage selector if not already chosen
    if (!storageLocation) {
      const fileArray = Array.from(files);
      setShowStorageSelector(true);

      // Store files temporarily
      const tempFiles: DatabaseFile[] = fileArray.map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || "audio/database",
        status: "uploading" as const,
        progress: 0,
        storageLocation: null,
        file,
      }));

      setDatabaseFiles((prev) => [...prev, ...tempFiles]);
      return;
    }

    processFileUpload(Array.from(files), storageLocation);
  };

  const processFileUpload = async (files: File[], location: StorageLocation) => {
    const newFiles: DatabaseFile[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || "audio/database",
      status: "uploading" as const,
      progress: 0,
      storageLocation: location,
      file,
    }));

    setDatabaseFiles((prev) => [...prev, ...newFiles]);

    // Process each file based on storage location
    for (const newFile of newFiles) {
      if (location === "local" && newFile.file) {
        await saveToLocal(newFile.id, newFile.file);
      } else if (location === "cloud" && newFile.file) {
        await saveToCloud(newFile.id, newFile.file);
      }
      simulateUpload(newFile.id);
    }
  };

  const saveToLocal = async (fileId: string, file: File) => {
    try {
      await saveFileToLocal(fileId, file);
      getStorageUsage().then(setStorageUsage);
    } catch (error) {
      console.error("Error saving to local storage:", error);
      setDatabaseFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "error" as const } : f))
      );
    }
  };

  const saveToCloud = async (fileId: string, file: File) => {
    try {
      const cloudUrl = await uploadToCloud([file], (progress) => {
        setCloudUploadProgress(progress);
      });

      setDatabaseFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, cloudUrl } : f))
      );
    } catch (error) {
      console.error("Error saving to cloud:", error);
      setDatabaseFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "error" as const } : f))
      );
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDatabaseFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: 100, status: "processing" }
              : f
          )
        );
        // Simulate processing
        setTimeout(() => {
          setDatabaseFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "ready" } : f
            )
          );
        }, 2000);
      } else {
        setDatabaseFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f
          )
        );
      }
    }, 200);
  };

  const formatFileSize = (bytes: number): string => {
    return formatBytes(bytes);
  };

  const removeFile = async (fileId: string) => {
    const file = databaseFiles.find((f) => f.id === fileId);

    if (file?.storageLocation === "local") {
      await deleteFileFromLocal(fileId);
      getStorageUsage().then(setStorageUsage);
    }

    setDatabaseFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (activeDatabase === fileId) {
      setActiveDatabase(null);
    }
  };

  const handleDownloadDatabase = () => {
    const readyFiles = databaseFiles.filter((f) => f.status === "ready" && f.storageLocation === "local");
    if (readyFiles.length === 0) {
      alert("No files available to download!");
      return;
    }

    downloadToComputer(
      readyFiles.map((f) => ({
        id: f.id,
        name: f.name,
        size: Number.parseInt(f.size),
        type: f.type,
      })),
      "SongbirdAI_Database"
    );
  };

  const handleExportMetadata = () => {
    const database: AudioDatabase = {
      id: Math.random().toString(36).substring(7),
      name: "SongbirdAI_Database",
      files: databaseFiles
        .filter((f) => f.status === "ready")
        .map((f) => ({
          id: f.id,
          name: f.name,
          size: Number.parseInt(f.size.split(" ")[0]),
          type: f.type,
          cloudUrl: f.cloudUrl,
        })),
      storageLocation,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      totalSize: databaseFiles.reduce(
        (acc, f) => acc + (f.status === "ready" ? Number.parseInt(f.size.split(" ")[0]) : 0),
        0
      ),
    };

    exportDatabaseMetadata(database);
  };

  const connectToCloud = async () => {
    // Simulate cloud connection (in production, this would use OAuth)
    setIsCloudConnected(true);
    alert("Connected to Cloud Storage! You can now upload your databases to the cloud.");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Background aura */}
      <div className="absolute inset-0 gradient-aura" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(https://ext.same-assets.com/195461215/3190337137.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) saturate(1.8) hue-rotate(280deg)",
        }}
      />
      {/* Additional vibrant gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(255, 27, 141, 0.3) 0%, rgba(156, 39, 176, 0.25) 30%, rgba(0, 217, 255, 0.15) 60%, transparent 80%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="https://ugc.same-assets.com/j_xe6mnYWaOgZ6mdTauS_QHxFWyD7KaW.png"
            alt="Songbird AI Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-xl font-semibold text-[#f5e6d3] tracking-tight">
            Songbird AI
          </span>
        </Link>
        <div className="flex items-center gap-3 text-sm text-[#f5e6d3]/70">
          <span className="hidden sm:block">Create your music with AI</span>
        </div>
      </header>

      {/* Floating Song Cards - Left */}
      <div className="hidden lg:block absolute left-2 lg:left-4 xl:left-12 top-1/2 -translate-y-1/2 z-10 space-y-6">
        {songCards
          .filter((card) => card.position.includes("left"))
          .map((card, index) => (
            <div
              key={card.id}
              className={`song-card w-36 lg:w-40 xl:w-44 rounded-2xl overflow-hidden shadow-2xl bg-[#1a1512] ${
                index === 0 ? "float-animation" : "float-animation-reverse"
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="relative overflow-hidden h-36 lg:h-40 xl:h-44">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                                <button type="button" onClick={() => handlePlayTrack({ ...card, audioSrc: 'https://p.scdn.co/mp3-preview/3d1762c45387438515594685350980598150491b?cid=d8a5ed958d274c2599c279434adae641' })} className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </button>
              </div>
              <div className="p-3 bg-[#1a1512]/90 backdrop-blur">
                <p className="text-sm font-medium text-[#f5e6d3] truncate">
                  {card.title}
                </p>
                <p className="text-xs text-[#f5e6d3]/50">{card.artist}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Floating Song Cards - Right */}
      <div className="hidden lg:block absolute right-2 lg:right-4 xl:right-12 top-1/2 -translate-y-1/2 z-10 space-y-6">
        {songCards
          .filter((card) => card.position.includes("right"))
          .map((card, index) => (
            <div
              key={card.id}
              className={`song-card w-44 rounded-2xl overflow-hidden shadow-2xl ${
                index === 0 ? "float-animation-slow" : "float-animation"
              }`}
              style={{ animationDelay: `${index * 0.7}s` }}
            >
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-44 object-cover"
                />
                                <button type="button" onClick={() => handlePlayTrack({ ...card, audioSrc: 'https://p.scdn.co/mp3-preview/3d1762c45387438515594685350980598150491b?cid=d8a5ed958d274c2599c279434adae641' })} className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </button>
              </div>
              <div className="p-3 bg-[#1a1512]/90 backdrop-blur">
                <p className="text-sm font-medium text-[#f5e6d3] truncate">
                  {card.title}
                </p>
                <p className="text-xs text-[#f5e6d3]/50">{card.artist}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Headline */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#f5e6d3] font-light tracking-tight mb-6">
            Make{" "}
            <span className="animated-gradient-text">
              {headlinePhrases[currentPhraseIndex]}
            </span>
          </h1>
          <p className="text-[#f5e6d3]/60 text-lg md:text-xl max-w-xl mx-auto">
            Start with a simple prompt or dive into our pro editing tools, your
            next track is just a step away.
          </p>
        </div>

        {/* Create Input Area */}
        <div className="w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="glass-input p-4 md:p-6 shadow-2xl relative rounded-[25px]">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isCreating) {
                  handleCreate();
                }
              }}
              placeholder="Chat to make music"
              className="bg-transparent border-none text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 text-lg h-12 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
            />
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#f5e6d3]/70 transition-all hover:scale-110 flex-shrink-0 relative overflow-hidden hover-glow-sm"
                  onClick={() => {
                    alert("Add attachments, images, or audio references!");
                  }}
                  title="Add attachments"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="h-9 rounded-full bg-white/5 text-[#f5e6d3]/70 gap-2 px-3 transition-all hover:bg-white/15 flex-shrink-0 relative overflow-hidden hover-glow-md"
                  onClick={() => {
                    setIsAdvancedSettingsOpen(true);
                  }}
                >
                  <Settings2 className="w-4 h-4" />
                  <span className="text-sm">Advanced</span>
                </Button>

                {/* Advanced Settings Dialog */}
                <Dialog open={isAdvancedSettingsOpen} onOpenChange={setIsAdvancedSettingsOpen}>
                  <DialogContent className="sm:max-w-2xl bg-[#1a1512] border-[#2a2520] text-[#f5e6d3]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl font-serif">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <Settings2 className="w-5 h-5 text-white" />
                        </div>
                        Advanced Settings
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-6 space-y-6">
                      {/* Genre Selection */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#f5e6d3]">Genre</label>
                        <div className="flex flex-wrap gap-2">
                          {genres.slice(0, 12).map((genre) => (
                            <Button
                              key={genre}
                              variant={selectedGenre === genre ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedGenre(genre)}
                              className={`transition-all ${selectedGenre === genre ? 'bg-cyan-500/80 border-cyan-500' : 'border-[#3a3520] hover:bg-cyan-500/10'}`}
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* BPM Selection */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#f5e6d3]">BPM</label>
                        <div className="flex flex-wrap gap-2">
                          {bpmRanges.map((range) => (
                            <Button
                              key={range.name}
                              variant={selectedBPM === range.name ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedBPM(range.name)}
                              className={`transition-all ${selectedBPM === range.name ? 'bg-cyan-500/80 border-cyan-500' : 'border-[#3a3520] hover:bg-cyan-500/10'}`}
                            >
                              {range.name} ({range.min}-{range.max})
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Style Selection */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#f5e6d3]">Style</label>
                        <div className="flex flex-wrap gap-2">
                          {styles.slice(0, 12).map((style) => (
                            <Button
                              key={style}
                              variant={selectedStyle === style ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStyle(style)}
                              className={`transition-all ${selectedStyle === style ? 'bg-cyan-500/80 border-cyan-500' : 'border-[#3a3520] hover:bg-cyan-500/10'}`}
                            >
                              {style}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Surprise Me Toggle */}
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#2a2520]">
                        <div className="flex items-center gap-3">
                           <Shuffle className="w-5 h-5 text-cyan-400" />
                          <label htmlFor="surprise-me" className="text-sm font-medium text-[#f5e6d3]">
                            Surprise Me!
                          </label>
                        </div>
                        <button
                          role="switch"
                          aria-checked={surpriseMe}
                          onClick={() => setSurpriseMe(!surpriseMe)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            surpriseMe ? 'bg-cyan-500' : 'bg-[#3a3520]'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              surpriseMe ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Database Upload Button */}
                <Dialog open={isDatabaseOpen} onOpenChange={setIsDatabaseOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 text-[#f5e6d3] gap-2 px-3 border border-orange-500/30 pulse-glow flex-shrink-0 relative overflow-hidden hover-glow-md"
                    >
                      <Database className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Database</span>
                      <span className="text-sm font-medium sm:hidden">DB</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-[#1a1512] border-[#2a2520] text-[#f5e6d3]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between text-2xl font-serif">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://i.imgur.com/9QX8Z5H.png"
                            alt="Songbird AI Logo"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          Database Upload
                        </div>
                        <div className="flex items-center gap-2">
                          {databaseFiles.filter((f) => f.status === "ready").length > 0 && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-[#2a2520] hover:bg-orange-500/10"
                                onClick={handleDownloadDatabase}
                                title="Download database to computer"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-[#2a2520] hover:bg-orange-500/10"
                                onClick={handleExportMetadata}
                                title="Export database metadata"
                              >
                                <Save className="w-3 h-3 mr-1" />
                                Export
                              </Button>
                            </>
                          )}
                        </div>
                      </DialogTitle>

                      {/* Storage Usage */}
                      {storageUsage.total > 0 && (
                        <div className="mt-3 p-3 bg-[#2a2520] rounded-lg">
                          <div className="flex items-center justify-between text-xs text-[#f5e6d3]/70 mb-1">
                            <span>Local Storage Usage</span>
                            <span>
                              {formatBytes(storageUsage.used)} / {formatBytes(storageUsage.total)}
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#1a1512] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                              style={{
                                width: `${(storageUsage.used / storageUsage.total) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </DialogHeader>

                    {/* Storage Location Selector */}
                    <div className="mt-6 p-4 bg-[#2a2520] rounded-xl">
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-orange-400" />
                        Storage Location
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setStorageLocation("local");
                            setShowStorageSelector(false);
                          }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            storageLocation === "local"
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-[#3a3520] hover:border-orange-500/50 bg-[#1a1512]"
                          }`}
                        >
                          <HardDrive className={`w-8 h-8 mx-auto mb-2 ${
                            storageLocation === "local" ? "text-orange-400" : "text-[#f5e6d3]/50"
                          }`} />
                          <div className="text-sm font-medium text-[#f5e6d3]">Local Storage</div>
                          <div className="text-xs text-[#f5e6d3]/50 mt-1">
                            Store on this device
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!isCloudConnected) {
                              connectToCloud();
                            }
                            setStorageLocation("cloud");
                            setShowStorageSelector(false);
                          }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            storageLocation === "cloud"
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-[#3a3520] hover:border-orange-500/50 bg-[#1a1512]"
                          }`}
                        >
                          <Cloud className={`w-8 h-8 mx-auto mb-2 ${
                            storageLocation === "cloud" ? "text-orange-400" : "text-[#f5e6d3]/50"
                          }`} />
                          <div className="text-sm font-medium text-[#f5e6d3] flex items-center justify-center gap-1">
                            Cloud Storage
                            {isCloudConnected && (
                              <CheckCircle2 className="w-3 h-3 text-green-400" />
                            )}
                          </div>
                          <div className="text-xs text-[#f5e6d3]/50 mt-1">
                            {isCloudConnected ? "Connected" : "Connect to cloud"}
                          </div>
                        </button>
                      </div>

                      {storageLocation === "cloud" && isCloudConnected && (
                        <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-xs text-green-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Cloud storage connected and ready</span>
                          <ExternalLink className="w-3 h-3 ml-auto" />
                        </div>
                      )}
                    </div>

                    <Tabs defaultValue="upload" className="mt-4">
                      <TabsList className="bg-[#2a2520] border-none w-full">
                        <TabsTrigger
                          value="upload"
                          className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 flex-1"
                        >
                          <CloudUpload className="w-4 h-4 mr-2" />
                          Upload Files
                        </TabsTrigger>
                        <TabsTrigger
                          value="manage"
                          className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 flex-1"
                        >
                          <Folder className="w-4 h-4 mr-2" />
                          My Databases
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="upload" className="mt-6">
                        <div
                          role="button"
                          tabIndex={0}
                          className={`upload-zone rounded-2xl p-8 text-center cursor-pointer transition-all ${
                            isDragOver ? "dragover scale-[1.02]" : ""
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }
                          }}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".mp3,.wav,.flac,.aiff,.midi,.mid,.json,.zip"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files)}
                          />
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-orange-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">
                            Drop your AI database files here
                          </h3>
                          <p className="text-[#f5e6d3]/50 text-sm mb-4">
                            Upload audio samples, MIDI files, or pre-trained model
                            data to create your custom AI music database
                          </p>
                          {!storageLocation && (
                            <p className="text-amber-400 text-xs mb-3 flex items-center justify-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                              Please select a storage location above before uploading
                            </p>
                          )}
                          <div className="flex flex-wrap justify-center gap-2">
                            <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                              .mp3
                            </Badge>
                            <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                              .wav
                            </Badge>
                            <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                              .midi
                            </Badge>
                            <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                              .json
                            </Badge>
                            <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                              .zip
                            </Badge>
                          </div>
                        </div>

                        {databaseFiles.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-[#f5e6d3]/70 mb-3">
                              Uploading Files
                            </h4>
                            <ScrollArea className="h-48">
                              <div className="space-y-3">
                                {databaseFiles
                                  .filter((f) => f.status !== "ready")
                                  .map((file) => (
                                    <div
                                      key={file.id}
                                      className="db-file-item rounded-xl p-4"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center relative">
                                          <FileMusic className="w-5 h-5 text-orange-400" />
                                          {file.storageLocation && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1a1512] flex items-center justify-center">
                                              {file.storageLocation === "local" ? (
                                                <HardDrive className="w-2.5 h-2.5 text-blue-400" />
                                              ) : (
                                                <Cloud className="w-2.5 h-2.5 text-green-400" />
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium truncate">
                                            {file.name}
                                          </p>
                                          <div className="flex items-center gap-2 text-xs text-[#f5e6d3]/50">
                                            <span>{file.size}</span>
                                            {file.storageLocation && (
                                              <>
                                                <span>•</span>
                                                <span className="capitalize">{file.storageLocation}</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        {file.status === "uploading" && (
                                          <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                                        )}
                                        {file.status === "processing" && (
                                          <Badge className="bg-amber-500/20 text-amber-400 border-none">
                                            Processing
                                          </Badge>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => removeFile(file.id)}
                                          className="p-1 hover:bg-white/10 rounded"
                                        >
                                          <X className="w-4 h-4 text-[#f5e6d3]/50" />
                                        </button>
                                      </div>
                                      {file.status === "uploading" && (
                                        <Progress
                                          value={file.progress}
                                          className="mt-3 h-1 bg-[#2a2520]"
                                        />
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </ScrollArea>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="manage" className="mt-6">
                        {databaseFiles.filter((f) => f.status === "ready")
                          .length === 0 ? (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2a2520] flex items-center justify-center">
                              <Folder className="w-8 h-8 text-[#f5e6d3]/30" />
                            </div>
                            <p className="text-[#f5e6d3]/50">
                              No databases uploaded yet
                            </p>
                            <p className="text-[#f5e6d3]/30 text-sm mt-1">
                              Upload files to create your custom AI database
                            </p>
                          </div>
                        ) : (
                          <ScrollArea className="h-64">
                            <div className="space-y-3">
                              {databaseFiles
                                .filter((f) => f.status === "ready")
                                .map((file) => (
                                  <div
                                    key={file.id}
                                    className={`db-file-item rounded-xl p-4 transition-all ${
                                      activeDatabase === file.id
                                        ? "border-orange-500/50 bg-orange-500/10 shadow-lg"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center relative">
                                        <FileAudio className="w-5 h-5 text-green-400" />
                                        {file.storageLocation && (
                                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1a1512] flex items-center justify-center">
                                            {file.storageLocation === "local" ? (
                                              <HardDrive className="w-2.5 h-2.5 text-blue-400" />
                                            ) : (
                                              <Cloud className="w-2.5 h-2.5 text-green-400" />
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div
                                        className="flex-1 min-w-0 cursor-pointer"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                          setActiveDatabase(
                                            activeDatabase === file.id
                                              ? null
                                              : file.id
                                          )
                                        }
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setActiveDatabase(
                                              activeDatabase === file.id
                                                ? null
                                                : file.id
                                            );
                                          }
                                        }}
                                      >
                                        <p className="text-sm font-medium truncate">
                                          {file.name}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-[#f5e6d3]/50">
                                          <span>{file.size}</span>
                                          <span>•</span>
                                          <span className="capitalize flex items-center gap-1">
                                            {file.storageLocation === "local" ? (
                                              <>
                                                <HardDrive className="w-3 h-3" />
                                                Local
                                              </>
                                            ) : (
                                              <>
                                                <Cloud className="w-3 h-3" />
                                                Cloud
                                              </>
                                            )}
                                          </span>
                                          {file.cloudUrl && (
                                            <>
                                              <span>•</span>
                                              <a
                                                href={file.cloudUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                Link <ExternalLink className="w-2.5 h-2.5" />
                                              </a>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        {activeDatabase === file.id && (
                                          <Badge className="bg-green-500/20 text-green-400 border-none">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Active
                                          </Badge>
                                        )}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file.id);
                                          }}
                                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                          title="Delete file"
                                        >
                                          <Trash2 className="w-4 h-4 text-red-400" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </ScrollArea>
                        )}
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 pt-4 border-t border-[#2a2520] space-y-3">
                      <p className="text-sm text-[#f5e6d3]/50">
                        <Sparkles className="w-4 h-4 inline mr-1 text-orange-400" />
                        Your custom database will influence the AI to generate
                        songs matching your unique style and samples.
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                            <HardDrive className="w-3.5 h-3.5" />
                            Local Storage
                          </div>
                          <p className="text-[#f5e6d3]/50">
                            Files stored directly on your device for instant access
                          </p>
                        </div>

                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center gap-2 text-green-400 font-medium mb-1">
                            <Cloud className="w-3.5 h-3.5" />
                            Cloud Storage
                          </div>
                          <p className="text-[#f5e6d3]/50">
                            Access your databases from anywhere, anytime
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {activeDatabase && (
                  <Badge className="bg-green-500/20 text-green-400 border-none h-9 px-3 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Custom DB Active</span>
                    <span className="sm:hidden">DB Active</span>
                  </Badge>
                )}

                {/* Lyrics Generator Button */}
                <Dialog open={isLyricsOpen} onOpenChange={setIsLyricsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-[#f5e6d3] gap-2 px-3 border border-blue-500/30 flex-shrink-0 relative overflow-hidden hover-glow-md"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Lyrics</span>
                      <span className="text-sm font-medium sm:hidden">Lyrics</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl bg-[#1a1512] border-[#2a2520] text-[#f5e6d3]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl font-serif">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        AI Lyrics Generator
                      </DialogTitle>
                    </DialogHeader>

                    <div className="mt-6 space-y-6">
                      {/* Theme Input with Voice-to-Text */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#f5e6d3] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          What's your song about?
                        </label>
                        <div className="relative">
                          <Input
                            value={lyricTheme}
                            onChange={(e) => setLyricTheme(e.target.value)}
                            placeholder="e.g., summer love, overcoming challenges, chasing dreams..."
                            className="bg-[#2a2520] border-[#3a3520] text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 h-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (isListening) {
                                setIsListening(false);
                              } else {
                                startVoiceRecognition();
                              }
                            }}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                              isListening
                                ? "bg-red-500/20 text-red-400 animate-pulse"
                                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                            }`}
                            title={isListening ? "Stop recording" : "Start voice input"}
                          >
                            <Mic2 className="w-4 h-4" />
                          </button>
                        </div>
                        {isListening && (
                          <p className="text-xs text-blue-400 flex items-center gap-2 animate-pulse">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                            Listening... Speak your song theme
                          </p>
                        )}
                      </div>

                      {/* Generate Button */}
                      <Button
                        onClick={generateLyrics}
                        disabled={isGeneratingLyrics || !lyricTheme.trim()}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white h-11 font-medium"
                      >
                        {isGeneratingLyrics ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating Lyrics...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Lyrics
                          </>
                        )}
                      </Button>

                      {/* Generated Lyrics Display */}
                      {lyrics && (
                        <div className="mt-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#f5e6d3]">
                              Generated Lyrics
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs border-[#3a3520] hover:bg-blue-500/10"
                              onClick={() => {
                                navigator.clipboard.writeText(lyrics);
                                alert("Lyrics copied to clipboard!");
                              }}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <ScrollArea className="h-96">
                            <div className="p-4 bg-[#2a2520] rounded-lg border border-[#3a3520]">
                              <pre className="text-sm text-[#f5e6d3] whitespace-pre-wrap font-mono leading-relaxed">
                                {lyrics}
                              </pre>
                            </div>
                          </ScrollArea>
                          <Button
                            onClick={() => {
                              setPrompt(prev => prev + "\n\nLyrics:\n" + lyrics);
                              setIsLyricsOpen(false);
                            }}
                            className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Use These Lyrics
                          </Button>
                        </div>
                      )}

                      {/* Quick Tips */}
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-xs text-[#f5e6d3]/70">
                          <Sparkles className="w-3 h-3 inline mr-1 text-blue-400" />
                          <strong>Tip:</strong> The AI will create complete song lyrics with verses, chorus, and bridge.
                          You can edit the generated lyrics or use them as inspiration!
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Voice Models Button */}
                <Dialog open={isVoiceModelsOpen} onOpenChange={setIsVoiceModelsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-[#f5e6d3] gap-2 px-3 border border-purple-500/30 flex-shrink-0 relative overflow-hidden hover-glow-md"
                    >
                      <Mic className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Voice</span>
                      <span className="text-sm font-medium sm:hidden">Voice</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl bg-[#1a1512] border-[#2a2520] text-[#f5e6d3]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl font-serif">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                          <Mic className="w-5 h-5 text-white" />
                        </div>
                        Voice Model Collection
                      </DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="select" className="mt-4">
                      <TabsList className="bg-[#2a2520] border-none w-full">
                        <TabsTrigger
                          value="select"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex-1"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Select Voice
                        </TabsTrigger>
                        <TabsTrigger
                          value="blend"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex-1"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Blend Voices
                        </TabsTrigger>
                        <TabsTrigger
                          value="clone"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex-1"
                        >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Clone Voice
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="select" className="mt-6">
                        <ScrollArea className="h-96">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {voiceModels.map((voice) => (
                              <div
                                key={voice.id}
                                onClick={() => setSelectedVoiceModel(voice.id)}
                                className={`cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-105 ${
                                  selectedVoiceModel === voice.id
                                    ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/50"
                                    : "border border-[#3a3520]"
                                }`}
                              >
                                <div className="relative h-40">
                                  <img
                                    src={voice.image}
                                    alt={voice.name}
                                    className="w-full h-full object-cover"
                                  />
                                  {selectedVoiceModel === voice.id && (
                                    <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                      <CheckCircle2 className="w-8 h-8 text-purple-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 bg-[#2a2520]">
                                  <h4 className="font-medium text-[#f5e6d3]">{voice.name}</h4>
                                  <p className="text-xs text-[#f5e6d3]/50">{voice.gender} • {voice.range}</p>
                                  <p className="text-xs text-[#f5e6d3]/70 mt-1">{voice.style}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="blend" className="mt-6">
                        <div className="space-y-4">
                          <p className="text-sm text-[#f5e6d3]/70">
                            Select multiple voices to blend them together and create a unique hybrid voice
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {voiceModels.map((voice) => (
                              <div
                                key={voice.id}
                                onClick={() => {
                                  if (blendVoices.includes(voice.id)) {
                                    setBlendVoices(blendVoices.filter(v => v !== voice.id));
                                  } else {
                                    if (blendVoices.length < 3) {
                                      setBlendVoices([...blendVoices, voice.id]);
                                    }
                                  }
                                }}
                                className={`cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-105 ${
                                  blendVoices.includes(voice.id)
                                    ? "ring-2 ring-pink-500 shadow-lg shadow-pink-500/50"
                                    : "border border-[#3a3520]"
                                }`}
                              >
                                <div className="relative h-32">
                                  <img
                                    src={voice.image}
                                    alt={voice.name}
                                    className="w-full h-full object-cover"
                                  />
                                  {blendVoices.includes(voice.id) && (
                                    <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                                      <CheckCircle2 className="w-6 h-6 text-pink-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-2 bg-[#2a2520]">
                                  <h4 className="font-medium text-sm text-[#f5e6d3]">{voice.name}</h4>
                                  <p className="text-xs text-[#f5e6d3]/50">{voice.gender}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {blendVoices.length > 0 && (
                            <div className="mt-6 p-4 bg-[#2a2520] rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[#f5e6d3]">
                                  Selected: {blendVoices.length} voices
                                </span>
                                <span className="text-xs text-[#f5e6d3]/50">
                                  (Max: 3)
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {blendVoices.map(voiceId => {
                                  const voice = voiceModels.find(v => v.id === voiceId);
                                  return voice ? (
                                    <Badge key={voiceId} className="bg-pink-500/20 text-pink-400 border-none">
                                      {voice.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="clone" className="mt-6">
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Wand2 className="w-8 h-8 text-purple-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Clone Your Voice</h3>
                          <p className="text-[#f5e6d3]/50 text-sm mb-6 max-w-md mx-auto">
                            Upload 5-10 minutes of clean vocal recordings to train a custom AI voice model
                          </p>
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Voice Samples
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#f5e6d3]/70 transition-all hover:scale-110 hover:rotate-12 flex-shrink-0 relative overflow-hidden hover-glow-sm"
                    onClick={() => {
                      const randomPrompts = [
                        "a synthwave journey through neon cities",
                        "an acoustic ballad about coffee and rain",
                        "upbeat funk with brass sections",
                        "ambient meditation music with nature sounds",
                        "hard rock anthem about breaking free"
                      ];
                      setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
                    }}
                    title="Random inspiration"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>

                  {/* Random Generation with Database Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-9 h-9 rounded-full transition-all hover:scale-110 flex-shrink-0 relative overflow-hidden hover-glow-sm bg-white/5 hover:bg-white/10 text-[#f5e6d3]/70`}
                    onClick={handleRandomGeneration}
                  >
                    <Dices className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  className="create-btn-gradient h-10 px-6 gap-2 text-white font-medium disabled:opacity-50 rounded-full flex-shrink-0 relative overflow-hidden hover-glow-lg"
                  onClick={handleCreate}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Creating...</span>
                    </>
                  ) : (
                    <>
                      <Music className="w-4 h-4" />
                      <span>Create</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Voice Model Selector */}
          {(selectedVoiceModel || blendVoices.length > 0) && (
            <div className="mt-6 p-4 rounded-xl bg-[#2a2520]/60 backdrop-blur-lg border border-purple-500/30 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#f5e6d3] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  AI Singing Voice
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVoiceModel(null);
                    setBlendVoices([]);
                  }}
                  className="text-[#f5e6d3]/50 hover:text-[#f5e6d3] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedVoiceModel && (
                <div className="flex items-center gap-3 p-3 bg-[#1a1512] rounded-lg">
                  <img
                    src={voiceModels.find(v => v.id === selectedVoiceModel)?.image}
                    alt={voiceModels.find(v => v.id === selectedVoiceModel)?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-[#f5e6d3]">
                      {voiceModels.find(v => v.id === selectedVoiceModel)?.name}
                    </h4>
                    <p className="text-xs text-[#f5e6d3]/50">
                      {voiceModels.find(v => v.id === selectedVoiceModel)?.style}
                    </p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-none">
                    Active
                  </Badge>
                </div>
              )}

              {blendVoices.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-400" />
                    <span className="text-sm font-medium text-[#f5e6d3]">
                      Voice Blend ({blendVoices.length} voices)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {blendVoices.map((voiceId, index) => {
                      const voice = voiceModels.find(v => v.id === voiceId);
                      return voice ? (
                        <div key={voiceId} className="flex items-center gap-2 p-2 bg-[#1a1512] rounded-lg flex-1">
                          <img
                            src={voice.image}
                            alt={voice.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm text-[#f5e6d3] truncate">
                              {voice.name}
                            </h5>
                            <p className="text-xs text-[#f5e6d3]/50 truncate">
                              {voice.gender}
                            </p>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="p-3 bg-[#1a1512] rounded-lg">
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-[#f5e6d3]/70">Blend Strength</span>
                      <span className="text-[#f5e6d3]">{voiceBlendStrength}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={voiceBlendStrength}
                      onChange={(e) => setVoiceBlendStrength(Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-[#2a2520] rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                  </div>
                </div>
              )}

              <p className="text-xs text-[#f5e6d3]/50 mt-3">
                <Sparkles className="w-3 h-3 inline mr-1 text-purple-400" />
                Your music will be sung by the selected AI voice model
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Press Logos Marquee */}
      <div className="relative z-10 mt-16 py-8 border-t border-[#f5e6d3]/10">
        <div className="overflow-hidden">
          <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
            {[...pressLogos, ...pressLogos].map((logo, index) => (
              <img
                key={`${logo.name}-${index}`}
                src={logo.src}
                alt={logo.name}
                className="h-6 opacity-40 hover:opacity-70 transition-opacity grayscale"
                onError={(e) => {
                  // Hide broken images
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#f5e6d3]/10 py-12 px-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <img
              src="https://i.imgur.com/9QX8Z5H.png"
              alt="Songbird AI Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-lg font-semibold text-[#f5e6d3]">
              Songbird AI
            </span>
          </Link>
          <div className="text-[#f5e6d3]/50 text-sm">
            <p>© 2026 Songbird AI. All rights reserved.</p>
            <p className="mt-2">Create music with the power of AI and your unique style.</p>
          </div>
        </div>
      </footer>

      <MusicPlayer track={currentTrack} />
    </div>
  );
}
