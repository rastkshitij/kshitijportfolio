import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Flame, Target, TrendingUp, ExternalLink, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface LeetCodeBadge {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
}

interface LeetCodeStats {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: Record<string, number>;
    badges: LeetCodeBadge[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const USERNAME = 'rastkshitij';
const COMBINED_URL = `https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`;
const CALENDAR_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`;
const BADGES_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/badges`;
const CACHE_KEY = `lc_stats_${USERNAME}`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour


const DIFFICULTY_CONFIG = [
    {
        label: 'Easy',
        solvedKey: 'easySolved' as keyof LeetCodeStats,
        totalKey: 'totalEasy' as keyof LeetCodeStats,
        color: '#22c55e',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        trackRing: '#22c55e20',
    },
    {
        label: 'Medium',
        solvedKey: 'mediumSolved' as keyof LeetCodeStats,
        totalKey: 'totalMedium' as keyof LeetCodeStats,
        color: '#f59e0b',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        trackRing: '#f59e0b20',
    },
    {
        label: 'Hard',
        solvedKey: 'hardSolved' as keyof LeetCodeStats,
        totalKey: 'totalHard' as keyof LeetCodeStats,
        color: '#ef4444',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        trackRing: '#ef444420',
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCalendarGrid(calendar: Record<string, number>) {
    const today = new Date();
    const weeks: { date: Date; count: number }[][] = [];
    const start = new Date(today);
    start.setDate(start.getDate() - 52 * 7 + 1);

    const current = new Date(start);
    current.setDate(current.getDate() - current.getDay());

    while (current <= today) {
        const week: { date: Date; count: number }[] = [];
        for (let d = 0; d < 7; d++) {
            const dateObj = new Date(current);
            const startOfDay = Math.floor(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime() / 1000);
            const endOfDay = startOfDay + 86400;
            let count = 0;
            for (const [ts, val] of Object.entries(calendar)) {
                const tsNum = Number(ts);
                if (tsNum >= startOfDay && tsNum < endOfDay) {
                    count += val;
                }
            }
            week.push({ date: dateObj, count });
            current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
    }
    return weeks;
}

function heatColor(count: number): string {
    if (count === 0) return 'rgba(255,255,255,0.05)';
    if (count <= 2) return 'rgba(0, 255, 94, 0.25)';
    if (count <= 5) return 'rgba(0, 255, 94, 0.50)';
    if (count <= 10) return 'rgba(0, 255, 94, 0.75)';
    return 'rgba(0, 255, 94, 1)';
}

function getCurrentStreak(calendar: Record<string, number>): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    const d = new Date(today);

    while (true) {
        const startOfDay = Math.floor(d.getTime() / 1000);
        const endOfDay = startOfDay + 86400;
        const found = Object.keys(calendar).some((ts) => {
            const tsNum = Number(ts);
            return tsNum >= startOfDay && tsNum < endOfDay;
        });
        if (!found) break;
        streak++;
        d.setDate(d.getDate() - 1);
    }
    return streak;
}

// ─── Circular Progress ────────────────────────────────────────────────────────
interface CircularProgressProps {
    solved: number;
    total: number;
    color: string;
    track: string;
    size?: number;
    strokeWidth?: number;
}

function CircularProgress({ solved, total, color, track, size = 80, strokeWidth = 7 }: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = total > 0 ? solved / total : 0;
    const offset = circumference * (1 - pct);

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={strokeWidth} />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: offset }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            />
        </svg>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Leetcode() {
    const [stats, setStats] = useState<LeetCodeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [calendarData, setCalendarData] = useState<Record<string, number>>({});
    const fetchedRef = useRef(false);

    // ── Cache helpers ────────────────────────────────────────────────────────────
    const readCache = (): { stats: LeetCodeStats; cal: Record<string, number> } | null => {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const { data, ts } = JSON.parse(raw);
            if (Date.now() - ts > CACHE_TTL_MS) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            if (!data || !data.stats || !data.stats.badges) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            return data;
        } catch {
            return null;
        }
    };

    const writeCache = (data: { stats: LeetCodeStats; cal: Record<string, number> }) => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        } catch { /* quota exceeded – ignore */ }
    };

    // ── Fetch with sequential requests + delay to avoid 429 ─────────────────────
    const fetchWithRetry = async (url: string, retries = 3, delayMs = 1500): Promise<Response> => {
        for (let attempt = 0; attempt < retries; attempt++) {
            const res = await fetch(url);
            if (res.status !== 429) return res;
            if (attempt < retries - 1) {
                await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
            }
        }
        throw new Error('Rate limited (429). Please try again later.');
    };

    const fetchStats = async (forceRefresh = false) => {
        if (!forceRefresh) {
            const cached = readCache();
            if (cached) {
                setStats(cached.stats);
                setCalendarData(cached.cal);
                setLoading(false);
                return;
            }
        }

        setLoading(true);
        setError(null);

        try {
            const profileRes = await fetchWithRetry(COMBINED_URL);
            if (!profileRes.ok) throw new Error(`Profile fetch failed (${profileRes.status})`);
            const profileData = await profileRes.json();

            await new Promise((r) => setTimeout(r, 600));

            const calRes = await fetchWithRetry(CALENDAR_URL);
            if (!calRes.ok) throw new Error(`Calendar fetch failed (${calRes.status})`);
            const calData = await calRes.json();

            await new Promise((r) => setTimeout(r, 600));

            const badgesRes = await fetchWithRetry(BADGES_URL);
            if (!badgesRes.ok) throw new Error(`Badges fetch failed (${badgesRes.status})`);
            const badgesData = await badgesRes.json();

            const cal: Record<string, number> = calData.submissionCalendar
                ? typeof calData.submissionCalendar === 'string'
                    ? JSON.parse(calData.submissionCalendar)
                    : calData.submissionCalendar
                : {};

            const built: LeetCodeStats = {
                username: profileData.username ?? USERNAME,
                name: profileData.name ?? USERNAME,
                avatar: profileData.avatar ?? '',
                ranking: profileData.ranking ?? 0,
                totalSolved: profileData.totalSolved ?? 0,
                totalQuestions: profileData.totalQuestions ?? 0,
                easySolved: profileData.easySolved ?? 0,
                totalEasy: profileData.totalEasy ?? 0,
                mediumSolved: profileData.mediumSolved ?? 0,
                totalMedium: profileData.totalMedium ?? 0,
                hardSolved: profileData.hardSolved ?? 0,
                totalHard: profileData.totalHard ?? 0,
                acceptanceRate: profileData.acceptanceRate ?? 0,
                contributionPoints: profileData.contributionPoints ?? 0,
                reputation: profileData.reputation ?? 0,
                submissionCalendar: cal,
                badges: badgesData.badges ?? [],
            };

            writeCache({ stats: built, cal });
            setCalendarData(cal);
            setStats(built);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load LeetCode data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        fetchStats();
    }, []);


    const weeks = calendarData ? getCalendarGrid(calendarData).slice(-10) : [];
    const streak = calendarData ? getCurrentStreak(calendarData) : 0;
    const activeDays = calendarData ? Object.values(calendarData).filter((v) => v > 0).length : 0;

    const SkeletonBlock = ({ className }: { className: string }) => (
        <div className={`animate-pulse rounded-2xl bg-primary/5 ${className}`} />
    );

    return (
        <section id="leetcode" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* ── Heading ── */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">
                        LeetCode Profile
                    </h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-primary to-emerald-400 mx-auto rounded-full" />
                    <p className="text-muted-foreground mt-4 text-lg font-medium">
                        Daily coding progress &amp; problem-solving stats
                    </p>
                </motion.div>

                {/* ── Error State ── */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto mb-10 glass p-6 rounded-3xl border border-red-500/30 flex flex-col items-center gap-4 text-center"
                    >
                        <AlertCircle className="text-red-400" size={36} />
                        <p className="text-foreground font-semibold">{error}</p>
                        <button
                            onClick={() => { fetchedRef.current = false; fetchStats(true); }}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/80 transition-all"
                        >
                            <RefreshCw size={16} /> Retry
                        </button>
                    </motion.div>
                )}

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* ── Row 1: Profile + Total Ring + Activity ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            className="glass p-8 rounded-[3rem] border border-border bg-card/80 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 text-primary">
                                <Code2 size={160} />
                            </div>

                            {loading ? (
                                <div className="space-y-4 relative z-10">
                                    <SkeletonBlock className="w-20 h-20 rounded-full" />
                                    <SkeletonBlock className="h-6 w-3/4" />
                                    <SkeletonBlock className="h-4 w-1/2" />
                                    <SkeletonBlock className="h-12 w-full" />
                                </div>
                            ) : stats ? (
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        {stats.avatar ? (
                                            <img
                                                src={stats.avatar}
                                                alt={stats.name}
                                                className="w-16 h-16 rounded-full border-2 border-primary shadow-lg shadow-primary/30 object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary flex-shrink-0">
                                                <Code2 size={28} className="text-primary" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-xl font-black text-foreground">{stats.name || stats.username}</h3>
                                            <p className="text-muted-foreground text-sm font-mono">@{stats.username}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-5 relative z-10">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-2">
                                            Badges ({stats.badges ? stats.badges.length : 0})
                                        </span>
                                        <div className="flex flex-wrap gap-3">
                                            {stats.badges && stats.badges.length > 0 ? (
                                                stats.badges.map((badge) => (
                                                    <div
                                                        key={badge.id}
                                                        className="group relative flex items-center justify-center"
                                                        title={badge.displayName}
                                                    >
                                                        <img
                                                            src={badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`}
                                                            alt={badge.displayName}
                                                            className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(0,255,94,0.3)] hover:scale-110 transition-transform cursor-pointer"
                                                        />
                                                        <div className="pointer-events-none absolute bottom-full mb-2 hidden group-hover:block bg-popover/90 text-popover-foreground text-[10px] font-bold px-2.5 py-1 rounded-lg border border-border shadow-xl whitespace-nowrap z-50">
                                                            {badge.displayName}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-sm font-semibold text-muted-foreground">No badges earned yet</span>
                                            )}
                                        </div>
                                    </div>

                                    <a
                                        href={`https://leetcode.com/u/${stats.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 text-sm"
                                    >
                                        <ExternalLink size={15} /> View Profile
                                    </a>
                                </div>
                            ) : null}
                        </motion.div>

                        {/* Total Solved Ring */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}
                            className="glass p-8 rounded-[3rem] border border-border bg-card/80 shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 text-primary">
                                <Target size={160} />
                            </div>

                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground z-10">Problems Solved</h4>

                            {loading ? (
                                <SkeletonBlock className="w-40 h-40 rounded-full" />
                            ) : stats ? (
                                <div className="relative z-10 flex items-center justify-center" style={{ width: 160, height: 160 }}>
                                    <svg width={160} height={160} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                                        <circle cx={80} cy={80} r={70} fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth={10} />
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="-0%" stopColor="green" />
                                                <stop offset="60%" stopColor="yellow" />
                                                <stop offset="90%" stopColor="red" />
                                            </linearGradient>
                                        </defs>

                                        <motion.circle
                                            cx={80}
                                            cy={80}
                                            r={70}
                                            fill="none"
                                            stroke="url(#progressGradient)"
                                            strokeWidth={10}
                                            strokeLinecap="round"
                                            strokeDasharray={2 * Math.PI * 70}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                            whileInView={{
                                                strokeDashoffset:
                                                    2 * Math.PI * 70 *
                                                    (1 - stats.totalSolved / (stats.totalQuestions || 1))
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1.6,
                                                ease: "easeOut",
                                                delay: 0.3
                                            }}
                                        />
                                    </svg>
                                    <div className="text-center relative z-10">
                                        <span className="text-4xl font-black text-foreground block">{stats.totalSolved}</span>
                                        <span className="text-xs text-muted-foreground font-semibold">of {stats.totalQuestions}</span>
                                    </div>
                                </div>
                            ) : null}

                            {!loading && stats && (
                                <div className="flex gap-4 z-10">
                                    {DIFFICULTY_CONFIG.map((d) => (
                                        <div key={d.label} className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                            <span className="text-xs font-semibold text-muted-foreground">{d.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Activity: Streak + Submissions */}
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
                            className="glass p-8 rounded-[3rem] border border-border bg-card/80 shadow-2xl flex flex-col gap-5 relative overflow-hidden md:col-span-2 xl:col-span-1"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 text-primary">
                                <TrendingUp size={160} />
                            </div>

                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground z-10">Activity</h4>

                            {loading ? (
                                <div className="space-y-4">
                                    <SkeletonBlock className="h-20 w-full" />
                                    <SkeletonBlock className="h-20 w-full" />
                                </div>
                            ) : (
                                <div className="space-y-4 z-10">
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                        className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                            <Flame size={24} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-foreground">
                                                {streak}{' '}
                                                <span className="text-base font-semibold text-amber-400">
                                                    day{streak !== 1 ? 's' : ''}
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Current Streak</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.45 }}
                                        className="p-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Calendar size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-foreground">{activeDays}</p>
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Active Days</p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* ── Row 2: Difficulty Breakdown ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, type: 'spring', delay: 0.1 }}
                        className="glass p-8 md:p-10 rounded-[3rem] border border-border bg-card/80 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
                            <Code2 size={200} />
                        </div>

                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8 z-10 relative">
                            Difficulty Breakdown
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                            {DIFFICULTY_CONFIG.map((d, i) => {
                                const solved = stats ? (stats[d.solvedKey] as number) : 0;
                                const total = stats ? (stats[d.totalKey] as number) : 0;
                                const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

                                return (
                                    <motion.div
                                        key={d.label}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15 * i }}
                                        className={`p-6 rounded-3xl ${d.bg} border ${d.border} flex flex-col items-center gap-4`}
                                    >
                                        {loading ? (
                                            <>
                                                <SkeletonBlock className="w-20 h-20 rounded-full" />
                                                <SkeletonBlock className="h-5 w-20" />
                                                <SkeletonBlock className="h-3 w-full" />
                                            </>
                                        ) : (
                                            <>
                                                {/* <div className="relative" style={{ width: 80, height: 80 }}>
                                                    <CircularProgress
                                                        solved={solved}
                                                        total={total}
                                                        color={d.color}
                                                        track={d.trackRing}
                                                        size={80}
                                                        strokeWidth={7}
                                                    />
                                                    <span
                                                        className="absolute inset-0 flex items-center justify-center text-sm font-black"
                                                        style={{ color: d.color }}
                                                    >
                                                        {pct}%
                                                    </span>
                                                </div> */}

                                                <div className="text-center">
                                                    <p className={`text-2xl font-black ${d.text}`}>{solved}</p>
                                                    <p className="text-xs text-muted-foreground font-semibold">of {total}</p>
                                                </div>

                                                <span
                                                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${d.text} border ${d.border} ${d.bg}`}
                                                >
                                                    {d.label}
                                                </span>

                                                <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
                                                    <motion.div
                                                        className="h-full rounded-full"
                                                        style={{ background: d.color }}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${pct}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + i * 0.15 }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ── Row 3: Submission Calendar Heatmap ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, type: 'spring', delay: 0.15 }}
                        className="glass p-8 md:p-10 rounded-[3rem] border border-border bg-card/80 shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
                            <Flame size={200} />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                Submission Activity — Last 10 Weeks
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 flex items-center justify-center">
                                <span>Less</span>
                                {[
                                    'rgba(255,255,255,0.05)',
                                    'rgba(0, 255, 94, 0.25)',
                                    'rgba(0, 255, 94, 0.50)',
                                    'rgba(0, 255, 94, 0.75)',
                                    'rgba(0, 255, 94, 1)',
                                ].map((c, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: c,
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            width: 18,
                                            height: 18,
                                            borderRadius: 4,
                                            display: 'inline-block',
                                            flexShrink: 0,
                                        }}
                                    />
                                ))}
                                <span>More</span>
                            </div>
                        </div>

                        {loading ? (
                            <SkeletonBlock className="h-28 w-full" />
                        ) : (
                            <div className="relative z-10 overflow-x-auto pb-2 flex items-center justify-center">
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {/* Day labels */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginRight: 6, paddingTop: 0 }}>
                                        {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    fontSize: 15,
                                                    color: 'var(--muted-foreground)',
                                                    height: 18,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    minWidth: 28,
                                                    fontFamily: 'monospace',
                                                }}
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Week columns */}
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: 4, minWidth: weeks.length * 22 }}>
                                            {weeks.map((week, wi) => (
                                                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                    {week.map(({ date, count }, di) => (
                                                        <motion.div
                                                            key={di}
                                                            initial={{ opacity: 0, scale: 0.3 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: wi * 0.008 + di * 0.003, duration: 0.25 }}
                                                            title={`${date.toDateString()}: ${count} submission${count !== 1 ? 's' : ''}`}
                                                            style={{
                                                                background: heatColor(count),
                                                                width: 18,
                                                                height: 18,
                                                                borderRadius: 4,
                                                                cursor: 'default',
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Month labels */}
                                        <div style={{ display: 'flex', gap: 4, minWidth: weeks.length * 22, marginTop: 8 }}>
                                            {(() => {
                                                const labels: React.ReactNode[] = [];
                                                let lastMonth = -1;
                                                weeks.forEach((week, wi) => {
                                                    const m = week[0].date.getMonth();
                                                    if (m !== lastMonth) {
                                                        lastMonth = m;
                                                        labels.push(
                                                            <span
                                                                key={wi}
                                                                style={{
                                                                    fontSize: 11,
                                                                    color: 'var(--muted-foreground)',
                                                                    width: 18,
                                                                    minWidth: 18,
                                                                    maxWidth: 18,
                                                                    fontFamily: 'monospace',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'visible',
                                                                }}
                                                            >
                                                                {week[0].date.toLocaleString('default', { month: 'short' })}
                                                            </span>
                                                        );
                                                    } else {
                                                        labels.push(
                                                            <span
                                                                key={wi}
                                                                style={{
                                                                    width: 18,
                                                                    minWidth: 18,
                                                                    maxWidth: 18,
                                                                    display: 'inline-block',
                                                                }}
                                                            />
                                                        );
                                                    }
                                                });
                                                return labels;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
