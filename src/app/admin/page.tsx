
"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Settings, 
  ShieldCheck, 
  LogOut,
  BarChart3,
  MessageSquareHeart,
  Camera,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 selection:bg-primary/30">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-primary w-8 h-8" /> Admin Control Center
            </h1>
            <p className="text-slate-400 mt-1">Managing the magic for Galu, Baby.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Link href="/">
              <Button variant="outline" className="border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl">
                <LogOut className="w-4 h-4 mr-2" /> View Site
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_0_20px_rgba(209,64,180,0.3)]">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Heart className="text-pink-500" />} label="Total Love" value="Infinite" description="Growing every second" delay={0.1} />
          <StatCard icon={<Users className="text-blue-500" />} label="Special Visitors" value="1" description="Only the princess" delay={0.2} />
          <StatCard icon={<Camera className="text-purple-500" />} label="Captured Memories" value="6" description="Stories in frames" delay={0.3} />
          <StatCard icon={<Activity className="text-emerald-500" />} label="Heart Rate" value="Normal" description="Excited for Aug 10th" delay={0.4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="text-primary" /> Love Analytics
                </CardTitle>
                <CardDescription className="text-slate-400">Heartbeat monitoring over the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex flex-col items-center justify-center border-t border-slate-800/50">
                <div className="w-full h-1 bg-slate-800 rounded-full relative overflow-hidden mb-4 max-w-md">
                   <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(209,64,180,1)]" 
                   />
                </div>
                <div className="text-slate-500 italic text-sm text-center">
                  Analytical data is being processed by the heart.<br/>
                  Target milestone: August 10th.
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-primary w-5 h-5" /> Security Logs
                </CardTitle>
                <CardDescription className="text-slate-400">Recent entry attempts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <LogEntry status="Success" time="Just now" user="Galu, Baby" />
                  <LogEntry status="Denied" time="2h ago" user="Unknown Guest" isBlocked />
                  <LogEntry status="Denied" time="5h ago" user="Unknown Guest" isBlocked />
                  <LogEntry status="Denied" time="1d ago" user="Curious Person" isBlocked />
                  <LogEntry status="Success" time="2d ago" user="Galu, Baby" />
                </div>
                <div className="mt-8 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <p className="text-xs font-bold uppercase tracking-tighter text-primary mb-1">Active Protection</p>
                  <p className="text-sm text-slate-300">Angry 😡 Mode is armed and ready for unauthorized guests.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="bg-slate-900/40 border-slate-800 hover:border-primary/30 transition-all group cursor-default">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-300">
              {icon}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LogEntry({ status, time, user, isBlocked }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-200">{user}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{time}</span>
      </div>
      <div className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter ${isBlocked ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
        {status}
      </div>
    </div>
  );
}
