import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, RotateCcw, Sparkles, RefreshCw,
  Mic, Square, Hash,
} from "lucide-react";
import type { Slide } from "../data/slides";

/* ─── Gemini helpers (same key + rotation as AIInsightsPanel) ─── */
const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_API_KEY || "") as string;
const GEMINI_MODELS = [
  "gemma-3-4b-it",
  "gemma-3-1b-it",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
];
function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

type SummaryLength = "short" | "medium" | "detailed" | "custom";

const LENGTH_CONFIG: Record<Exclude<SummaryLength, "custom">, { label: string; lines: number; desc: string }> = {
  short:    { label: "Short",    lines: 3,  desc: "3 lines · quick glance"   },
  medium:   { label: "Medium",   lines: 6,  desc: "6 lines · balanced"       },
  detailed: { label: "Detailed", lines: 12, desc: "12 lines · in-depth"      },
};

async function generateSummary(slide: Slide, lines: number): Promise<string> {
  const prompt = `You are ElexicoAI. Write a clear, natural-sounding spoken summary about "${slide.title}" for a learning app.

Rules:
- Write EXACTLY ${lines} sentences (no more, no fewer).
- Each sentence is complete, simple and flows naturally when read aloud.
- Cover: what it is, why it matters, and one real-world connection.
- No bullet points, no markdown, no headers. Plain sentences only.
- Do NOT start with "Here is…" or "Sure,…".

Topic context: ${slide.description}
Key points: ${slide.keyPoints.join("; ")}
Real-world: ${slide.realWorldExample}

Write the ${lines}-sentence spoken summary now:`;

  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(geminiUrl(model), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: lines * 60,
          },
        }),
      });
      const data = await res.json();
      if (res.status === 429 || res.status === 403) continue;
      if (!res.ok) continue;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) return text;
    } catch {
      continue;
    }
  }
  // Fallback — stitch slide content together
  return [slide.description, ...slide.keyPoints.slice(0, Math.min(lines - 1, 4))].join(" ");
}

/* ─── TTS hook ─── */
type PlayerState = "idle" | "loading" | "playing" | "paused" | "done" | "error";

function useTTS(text: string) {
  const [state, setState] = useState<PlayerState>("idle");
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [progress, setProgress] = useState(0); // 0-100

  // Cancel on unmount
  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  // Reset when text changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setState("idle");
    setProgress(0);
    uttRef.current = null;
  }, [text]);

  const play = useCallback(() => {
    if (!text) return;

    // Resume from pause
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }

    // Fresh play
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.pitch = 1.0;
    utt.lang = "en-US";

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Premium"))
    ) ?? voices.find((v) => v.lang.startsWith("en")) ?? null;
    if (preferred) utt.voice = preferred;

    const words = text.split(/\s+/).length;
    let wordIdx = 0;
    utt.onboundary = (e) => {
      if (e.name === "word") {
        wordIdx++;
        setProgress(Math.min(99, Math.round((wordIdx / words) * 100)));
      }
    };
    utt.onend = () => { setState("done"); setProgress(100); };
    utt.onerror = () => setState("error");

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setState("playing");
  }, [text, state]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setState("paused");
  }, []);

  const replay = useCallback(() => {
    window.speechSynthesis.cancel();
    setState("idle");
    setProgress(0);
    uttRef.current = null;
    // tiny delay so browser fully resets
    setTimeout(() => play(), 80);
  }, [play]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState("idle");
    setProgress(0);
    uttRef.current = null;
  }, []);

  return { state, progress, play, pause, replay, stop };
}

/* ─── Main component ─── */
interface Props {
  slide: Slide;
}

export default function AISummaryPlayer({ slide }: Props) {
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [customLines, setCustomLines] = useState(8);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [summaryText, setSummaryText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const tts = useTTS(summaryText ?? "");

  // Reset summary when slide changes
  const prevSlideId = useRef(slide.id);
  useEffect(() => {
    if (prevSlideId.current !== slide.id) {
      prevSlideId.current = slide.id;
      tts.stop();
      setSummaryText(null);
      setGenError(null);
    }
  }, [slide.id, tts.stop]);

  const effectiveLines =
    summaryLength === "custom" ? customLines : LENGTH_CONFIG[summaryLength].lines;

  const handleGenerate = async () => {
    tts.stop();
    setSummaryText(null);
    setGenError(null);
    setIsGenerating(true);
    try {
      const text = await generateSummary(slide, effectiveLines);
      setSummaryText(text);
    } catch {
      setGenError("Couldn't generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentLengthLabel =
    summaryLength === "custom"
      ? `Custom · ${customLines} lines`
      : LENGTH_CONFIG[summaryLength].desc;

  const isPlaying = tts.state === "playing";
  const isPaused  = tts.state === "paused";
  const isDone    = tts.state === "done";
  const hasAudio  = summaryText !== null && !isGenerating;

  return (
    <div className="flex flex-col gap-5 px-5 py-4">

      {/* ── Length selector ── */}
      <div>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.14em] mb-2.5">
          Summary Length
        </p>

        {/* Preset chips */}
        <div className="flex gap-2 mb-2">
          {(Object.keys(LENGTH_CONFIG) as Exclude<SummaryLength, "custom">[]).map((key) => (
            <button
              key={key}
              onClick={() => { setSummaryLength(key); setShowCustomInput(false); }}
              className="flex-1 py-2 rounded-xl text-[11px] font-black transition-all capitalize tracking-wide"
              style={
                summaryLength === key
                  ? { background: "#2563eb1e", color: "#2563eb", border: "1px solid #2563eb35" }
                  : { background: "#f8faff", color: "#94a3b8", border: "1px solid #e2e8f0" }
              }
            >
              {LENGTH_CONFIG[key].label}
            </button>
          ))}
          {/* Custom chip */}
          <button
            onClick={() => { setSummaryLength("custom"); setShowCustomInput(true); }}
            className="flex-1 py-2 rounded-xl text-[11px] font-black transition-all tracking-wide flex items-center justify-center gap-1"
            style={
              summaryLength === "custom"
                ? { background: "#2563eb1e", color: "#2563eb", border: "1px solid #2563eb35" }
                : { background: "#f8faff", color: "#94a3b8", border: "1px solid #e2e8f0" }
            }
          >
            <Hash className="w-3 h-3" /> Custom
          </button>
        </div>

        {/* Custom number input */}
        <AnimatePresence>
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
                style={{ background: "#f8faff", border: "1px solid #e2e8f0" }}>
                <span className="text-[12px] text-gray-500 font-semibold">Lines:</span>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={customLines}
                  onChange={(e) => setCustomLines(Math.min(20, Math.max(2, Number(e.target.value))))}
                  className="w-14 text-center text-[13px] font-black text-blue-600 outline-none rounded-lg px-2 py-1"
                  style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
                />
                <span className="text-[11px] text-gray-400 font-medium">sentences (2–20)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desc hint */}
        <p className="text-[11px] text-gray-400 font-medium mt-1">{currentLengthLabel}</p>
      </div>

      {/* ── Generate button ── */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-3 rounded-2xl text-[13px] font-black flex items-center justify-center gap-2.5 transition-all disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
          color: "#fff",
          boxShadow: "0 4px 16px #2563eb35",
        }}
      >
        {isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            Generating…
          </>
        ) : summaryText ? (
          <>
            <RefreshCw className="w-4 h-4" />
            Regenerate Summary
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate AI Summary
          </>
        )}
      </motion.button>

      {/* ── Error state ── */}
      <AnimatePresence>
        {genError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[12px] text-red-500 font-semibold text-center"
          >
            {genError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Summary card + audio player ── */}
      <AnimatePresence>
        {hasAudio && summaryText && (
          <motion.div
            key={summaryText.slice(0, 20)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {/* Summary text card */}
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "#f8faff", border: "1px solid #e2e8f0" }}
            >
              {/* subtle glow */}
              <div
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #2563eb14 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.14em]">
                  AI Summary · {effectiveLines} sentences
                </span>
              </div>
              <p className="text-[13px] text-gray-700 leading-relaxed relative z-10">
                {summaryText}
              </p>
            </div>

            {/* ── Audio player controls ── */}
            <div
              className="rounded-2xl px-4 py-4"
              style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px #2563eb10" }}
            >
              {/* Progress bar */}
              <div className="mb-4">
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "#e2e8f0" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #2563eb, #3b82f6)" }}
                    animate={{ width: `${tts.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-gray-400 font-semibold capitalize">
                    {tts.state === "loading" ? "Loading…"
                      : tts.state === "idle"    ? "Ready"
                      : tts.state === "playing" ? "Playing…"
                      : tts.state === "paused"  ? "Paused"
                      : tts.state === "done"    ? "Done"
                      : "Error"}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {tts.progress}%
                  </span>
                </div>
              </div>

              {/* Buttons row */}
              <div className="flex items-center justify-center gap-3">

                {/* Replay */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={tts.replay}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                  title="Replay from beginning"
                >
                  <RotateCcw className="w-4 h-4 text-gray-500" />
                </motion.button>

                {/* Play / Pause / Resume — main button */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={isPlaying ? tts.pause : tts.play}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    boxShadow: "0 4px 18px #2563eb40",
                  }}
                  title={isPlaying ? "Pause" : isPaused ? "Resume" : "Play"}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div key="pause"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                        <Pause className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div key="play"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Stop */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={tts.stop}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                  title="Stop"
                >
                  <Square className="w-4 h-4 text-gray-500" />
                </motion.button>
              </div>

              {/* Status hint */}
              <AnimatePresence>
                {(isPlaying || isPaused) && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 mt-3.5"
                  >
                    {isPlaying && (
                      <div className="flex gap-1 items-end h-4">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ["6px", "14px", "6px"] }}
                            transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 rounded-full"
                            style={{ background: "#2563eb", minHeight: "4px" }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-[11px] font-bold text-blue-500">
                      {isPlaying ? "Speaking…" : "Paused — tap ▶ to resume"}
                    </span>
                  </motion.div>
                )}
                {isDone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-[11px] font-bold text-green-500 mt-3"
                  >
                    ✓ Finished — tap ↺ to replay
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state ── */}
      {!isGenerating && !summaryText && !genError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 py-6 opacity-50"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
          >
            <Mic className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[12px] text-gray-500 text-center leading-relaxed">
            Choose a length, then tap<br />
            <span className="font-bold text-gray-600">Generate AI Summary</span>
          </p>
        </motion.div>
      )}

      {/* ── Generating skeleton ── */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-4 space-y-2.5"
          style={{ background: "#f8faff", border: "1px solid #e2e8f0" }}
        >
          {Array.from({ length: effectiveLines > 8 ? 5 : Math.min(effectiveLines, 4) }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.4, delay: i * 0.12, repeat: Infinity }}
              className="h-3 rounded-full"
              style={{
                background: "#e2e8f0",
                width: i === 0 ? "100%" : i % 3 === 0 ? "65%" : i % 2 === 0 ? "85%" : "75%",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
