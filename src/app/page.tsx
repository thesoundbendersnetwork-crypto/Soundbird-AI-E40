"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Check,
  Sparkles,
  Database,
  Zap,
  Crown,
  ArrowRight,
  Play,
  Wand2,
  Cloud,
  Download,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isAnnual, setIsAnnual] = useState(false);

  const handleFreeTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    // Redirect to create page for free trial
    window.location.href = `/create?email=${encodeURIComponent(email)}&plan=free`;
  };

  const handleSubscribe = (plan: string) => {
    // Redirect to create page with subscription
    window.location.href = `/create?plan=${plan}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0420] via-[#1A0E2E] to-[#0A0420] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#f5e6d3]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="https://ugc.same-assets.com/zsDFVP_CtAHtwa6jVppixeyYZteue4cK.png"
              alt="Songbird AI Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-semibold text-[#f5e6d3] tracking-tight">
              Songbird AI
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-[#f5e6d3]/80 hover:text-[#f5e6d3] hover:bg-white/5"
              onClick={() => window.location.href = "/create"}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 font-medium px-5"
              onClick={() => window.scrollTo({ top: document.getElementById("pricing")?.offsetTop || 0, behavior: "smooth" })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Music Generation
          </Badge>

          <h1 className="font-serif text-5xl md:text-7xl text-[#f5e6d3] font-light tracking-tight mb-6">
            Create Stunning Music
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
              With Your Own AI Database
            </span>
          </h1>

          <p className="text-xl text-[#f5e6d3]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Upload your audio samples and let our AI learn your unique style. Generate unlimited
            original tracks that sound like you, or explore endless possibilities with text prompts.
          </p>

          {/* Free Trial Form */}
          <form onSubmit={handleFreeTrial} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2a2520] border-[#3a3520] text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 h-12 text-base focus-visible:ring-orange-500"
              />
              <Button
                type="submit"
                className="create-btn-gradient h-12 px-8 gap-2 text-white font-medium whitespace-nowrap"
              >
                Start Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-[#f5e6d3]/50 mt-3">
              Start with 5 free generations per month. No credit card required.
            </p>
          </form>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#f5e6d3]/60">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Upload custom database
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Commercial use allowed
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 border-t border-[#f5e6d3]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5e6d3] text-center mb-16">
            Everything you need to create music
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Custom AI Database
              </h3>
              <p className="text-[#f5e6d3]/70">
                Upload your own audio samples, MIDI files, and training data. The AI learns your unique style and generates music that matches your vision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Text-to-Music Generation
              </h3>
              <p className="text-[#f5e6d3]/70">
                Simply describe the music you want to create. Our AI understands natural language prompts and generates professional-quality tracks instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Cloud & Local Storage
              </h3>
              <p className="text-[#f5e6d3]/70">
                Store your databases locally for instant access or sync to the cloud. Access your custom AI models from anywhere, anytime.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Export & Download
              </h3>
              <p className="text-[#f5e6d3]/70">
                Download your generated tracks in high quality. Export your database metadata and share your custom AI models with others.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Lightning Fast
              </h3>
              <p className="text-[#f5e6d3]/70">
                Generate full songs in seconds. Our advanced AI models work at blazing speeds without compromising on quality or creativity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2a2520]/50 to-[#1a1512]/50 border border-[#3a3520] hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                Commercial Rights
              </h3>
              <p className="text-[#f5e6d3]/70">
                All music you create is yours. Use it for videos, podcasts, games, or release it commercially. Full rights included with subscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 px-6 border-t border-[#f5e6d3]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-[#f5e6d3] mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-[#f5e6d3]/70 mb-8">
              Start free or unlock unlimited potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2a2520] to-[#1a1512] border-2 border-[#3a3520] p-8 hover:border-orange-500/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#f5e6d3]">Free</h3>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Popular
                </Badge>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-[#f5e6d3]">$0</span>
                  <span className="text-[#f5e6d3]/50">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">
                    <strong className="text-[#f5e6d3]">5 generations</strong> per month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Upload custom AI database</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Local storage only</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Standard quality exports</span>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <X className="w-5 h-5 text-[#f5e6d3]/30 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/50">Commercial use</span>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <X className="w-5 h-5 text-[#f5e6d3]/30 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/50">Cloud storage</span>
                </li>
              </ul>

              <form onSubmit={handleFreeTrial}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1a1512] border-[#3a3520] text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 h-11 mb-3"
                />
                <Button
                  type="submit"
                  className="w-full bg-white/10 hover:bg-white/20 text-[#f5e6d3] h-11"
                >
                  Start Free Trial
                </Button>
              </form>
            </div>

            {/* Premium Tier */}
            <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/50 p-8 relative overflow-hidden hover:border-orange-500 transition-all">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-orange-500 to-amber-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                BEST VALUE
              </div>

              <div className="flex items-center justify-between mb-6 mt-2">
                <h3 className="text-2xl font-bold text-[#f5e6d3]">Premium</h3>
                <Crown className="w-6 h-6 text-orange-400" />
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-[#f5e6d3]">
                    ${isAnnual ? "124" : "24"}
                  </span>
                  <span className="text-[#f5e6d3]/50">
                    /{isAnnual ? "6 months" : "month"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="text-sm text-orange-400 hover:text-orange-300 underline"
                >
                  {isAnnual ? "Switch to monthly" : "Save with 6-month plan →"}
                </button>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">
                    <strong className="text-[#f5e6d3]">Unlimited generations</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Upload unlimited databases</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Cloud + local storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">High-quality exports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">
                    <strong className="text-green-400">Full commercial rights</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#f5e6d3]/80">Priority support</span>
                </li>
              </ul>

              <Button
                onClick={() => handleSubscribe(isAnnual ? "premium-6month" : "premium-monthly")}
                className="w-full create-btn-gradient h-11 text-white font-semibold"
              >
                Subscribe Now
              </Button>

              {isAnnual && (
                <p className="text-center text-sm text-green-400 mt-3">
                  Save $20 with 6-month plan!
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#f5e6d3]/10 py-12 px-6 mt-20">
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
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
