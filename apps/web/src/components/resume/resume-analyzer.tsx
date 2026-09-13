"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "@/context/auth-context";
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Copy,
  RefreshCw,
  Printer,
  ChevronRight,
  User,
  Search,
  Check,
  Zap,
} from "lucide-react";
import type { ResumeAnalysisResult } from "@/app/api/analyze-resume/route";

const SAMPLE_ENGINEER_RESUME = `Alex Morgan
alex.morgan@example.com | (555) 234-5678 | San Francisco, CA | linkedin.com/in/alexmorgan

SUMMARY
Full-stack software developer with 4 years of experience building web applications using React, JavaScript, and Node.js. Looking for a challenging senior engineering position.

WORK EXPERIENCE
Software Engineer | Apex FinTech Solutions | 2022 - Present
- Responsible for maintaining front-end web components and fixing bugs reported by QA.
- Worked with team members to create new user dashboard features using React.
- Helped with database queries and backend APIs in Node.js and PostgreSQL.
- Assisted with optimizing web application loading times.

Junior Web Developer | Nimbus Cloud Apps | 2020 - 2022
- Built landing pages using HTML, CSS, JavaScript, and Tailwind.
- Handled customer tickets and resolved minor styling issues across mobile views.
- Participated in weekly standups and agile sprint reviews.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2020

SKILLS
JavaScript, TypeScript, React, HTML/CSS, Git, Node.js, Express, SQL`;

const SAMPLE_FINTECH_RESUME = `Jordan Vance
jordan.vance@fintech-exec.io | (415) 890-1234 | New York, NY

PROFESSIONAL SUMMARY
Results-driven Financial Analyst and Fintech Solutions Architect with 6+ years of experience leading cross-border treasury management, financial modeling, and automated ledger operations.

EXPERIENCE
Senior Financial Analyst | GlobalPay Capital | 2022 - Present
- Spearheaded treasury automation initiative, reducing daily reconciliation latency by 68% across 14 multi-currency banking rails.
- Managed $45M portfolio liquidity risk, optimizing overnight yield returns by 1.8% ($810K annualized profit).
- Designed interactive executive BI dashboards in SQL and Python, adopted by C-suite for quarterly earnings forecasts.

Fintech Operations Analyst | NovaBank International | 2019 - 2022
- Automated KYC/AML verification pipeline, decreasing customer onboarding turnaround time from 72 hours to 8 minutes.
- Audited 10,000+ high-volume transactions monthly with 99.98% accuracy, identifying and mitigating $1.2M in fraudulent chargebacks.

EDUCATION & CERTIFICATIONS
B.S. in Finance & Quantitative Economics | NYU Stern School of Business | 2019
CFA Charterholder (Level III Passed)

CORE COMPETENCIES
Financial Modeling, DCF Valuation, Treasury Operations, SQL, Python, Bloomberg Terminal, Risk Mitigation, AML/KYC Compliance`;

export function ResumeAnalyzer() {
  const { user, isAuthenticated } = useAuth();
  const [activeInputTab, setActiveInputTab] = useState<"upload" | "paste">("upload");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Result view state
  const [activeResultTab, setActiveResultTab] = useState<
    "flaws" | "improvements" | "keywords" | "breakdown" | "profile"
  >("flaws");
  const [flawFilter, setFlawFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setFileSizeStr((file.size / 1024).toFixed(1) + " KB");
    setError(null);

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const mime = isPdf ? "application/pdf" : file.type || "text/plain";
    setFileMimeType(mime);

    // Read as Data URL for Gemini API transmission
    const base64Reader = new FileReader();
    base64Reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setFileBase64(dataUrl);
      }
    };
    base64Reader.readAsDataURL(file);

    // For plain text files, read text
    if (!isPdf && (file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".md") || file.name.endsWith(".rtf"))) {
      const textReader = new FileReader();
      textReader.onload = (e) => {
        const content = e.target?.result as string;
        setResumeText(content || "");
      };
      textReader.readAsText(file);
    } else {
      // For PDF / other binary formats, extract readable text snippets as fallback
      const textReader = new FileReader();
      textReader.onload = (e) => {
        const raw = e.target?.result as string;
        if (raw) {
          const asciiMatches = raw.match(/[a-zA-Z0-9\s.,;:()\-/@%]{4,}/g);
          if (asciiMatches && asciiMatches.length > 10) {
            setResumeText(asciiMatches.join(" ").slice(0, 8000));
          } else {
            setResumeText(`[Document File: ${file.name}]`);
          }
        }
      };
      textReader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset value so user can re-upload same file if desired
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const loadSample = (type: "engineer" | "fintech") => {
    const sample = type === "engineer" ? SAMPLE_ENGINEER_RESUME : SAMPLE_FINTECH_RESUME;
    setResumeText(sample);
    setFileBase64(null);
    setFileMimeType("text/plain");
    setFileSizeStr("2.4 KB");
    setFileName(type === "engineer" ? "sample_software_engineer_resume.txt" : "sample_fintech_analyst_resume.txt");
    setTargetRole(type === "engineer" ? "Senior Full-Stack Software Engineer" : "Senior Financial Analyst");
  };

  const runAnalysis = async () => {
    if (!resumeText.trim() && !fileBase64) {
      setError("Please upload a resume file or paste resume text first.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Simulate animated step progression while API executes
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeText.trim() || undefined,
          fileBase64: fileBase64 || undefined,
          fileMimeType: fileMimeType || undefined,
          fileName: fileName || undefined,
          targetRole: targetRole.trim() || undefined,
          jobDescription: jobDescription.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please check your resume text and try again.");
      }

      const data: ResumeAnalysisResult = await response.json();
      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to analyze resume.");
    } finally {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
    }
  };

  const handleCopyRewrite = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setResult(null);
    setResumeText("");
    setFileName(null);
    setFileBase64(null);
    setFileMimeType(null);
    setFileSizeStr(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const filteredFlaws =
    result?.flaws.filter((f) => (flawFilter === "all" ? true : f.severity === flawFilter)) || [];

  return (
    <section id="analyzer" className="py-16 md:py-24 border-t border-black/[0.06] bg-[#f8faf7]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-semibold text-[#1e3d2c] mb-3">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
              <Sparkles className="size-2 stroke-[3]" />
            </span>
            <span>AI-Powered ATS Score & Flaw Audit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e2118] tracking-tight leading-tight mb-3">
            Analyze & Optimize Your Resume with AI
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
            Upload your resume to receive instantaneous ATS compatibility scoring,
            automated flaw audits, high-impact bullet point rewrites, and keyword gap analysis.
          </p>

          {/* User state badge */}
          {isAuthenticated && user && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs text-zinc-600 shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Analyzing as <strong>{user.name}</strong> ({user.role})</span>
            </div>
          )}
        </div>

        {/* MAIN WORKSPACE */}
        {!result ? (
          <div className="max-w-3xl mx-auto">
            {/* Input Container */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-black/[0.06] shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
              {/* Tab Selector & Quick Load Sample */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
                <div className="inline-flex items-center bg-black/[0.04] p-1 rounded-full border border-black/[0.06]">
                  <button
                    type="button"
                    onClick={() => setActiveInputTab("upload")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeInputTab === "upload"
                        ? "bg-[#0e2118] text-white shadow-xs"
                        : "text-zinc-600 hover:text-black"
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInputTab("paste")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeInputTab === "paste"
                        ? "bg-[#0e2118] text-white shadow-xs"
                        : "text-zinc-600 hover:text-black"
                    }`}
                  >
                    Paste Text
                  </button>
                </div>

                {/* Sample Resumes */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">Quick Test:</span>
                  <button
                    type="button"
                    onClick={() => loadSample("engineer")}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#f2fbe8] text-[#1e3d2c] border border-[#bef264] hover:bg-[#e2f7ca] transition cursor-pointer"
                  >
                    Tech Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample("fintech")}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition cursor-pointer"
                  >
                    Finance Resume
                  </button>
                </div>
              </div>

              {/* Upload Dropzone */}
              {activeInputTab === "upload" ? (
                <div className="relative">
                  <input
                    id="resume-file-input"
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.md,.pdf,.docx,.doc,application/pdf,text/plain"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />

                  {fileName ? (
                    <div className="border-2 border-[#bef264] bg-[#f2fbe8]/60 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-3 shadow-xs">
                      <div className="size-14 rounded-2xl bg-[#bef264] text-[#0e2118] flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="size-7" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0e2118] flex flex-wrap items-center justify-center gap-2">
                          <span>{fileName}</span>
                          {fileSizeStr && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white text-zinc-600 border border-black/[0.08] font-normal">
                              {fileSizeStr}
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-zinc-600 mt-1">
                          File loaded successfully • Ready for comprehensive ATS scoring & flaw detection
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        <label
                          htmlFor="resume-file-input"
                          className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-black/[0.1] text-[#0e2118] hover:border-[#0e2118] hover:bg-zinc-50 transition shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Upload className="size-3.5" />
                          <span>Change File</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 transition cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="resume-file-input"
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={handleDrop}
                      className="group block border-2 border-dashed border-black/[0.12] hover:border-[#0e2118] bg-black/[0.01] hover:bg-black/[0.02] rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all"
                    >
                      <div className="flex flex-col items-center gap-2.5">
                        <div className="size-12 rounded-2xl bg-black/[0.04] group-hover:bg-[#bef264] text-[#0e2118] flex items-center justify-center transition-colors shadow-2xs">
                          <Upload className="size-5" />
                        </div>
                        <h4 className="text-sm font-bold text-[#0e2118]">
                          Drag and drop your resume file here
                        </h4>
                        <p className="text-xs text-zinc-500 max-w-sm">
                          Supports PDF, DOCX, TXT, or Markdown documents (up to 10MB)
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0e2118] text-white group-hover:bg-[#163628] shadow-sm transition">
                          <Upload className="size-3" />
                          <span>Browse Files</span>
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  <textarea
                    rows={8}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste the full text of your resume here (Summary, Work Experience, Skills, Education)..."
                    className="w-full p-4 rounded-2xl border border-black/[0.1] text-xs font-mono leading-relaxed bg-white text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118] focus:ring-1 focus:ring-[#0e2118]"
                  />
                  <div className="flex items-center justify-between text-xs text-zinc-400 mt-1.5 px-1">
                    <span>{resumeText.length} characters</span>
                    {resumeText && (
                      <button
                        type="button"
                        onClick={() => setResumeText("")}
                        className="text-zinc-500 hover:text-black"
                      >
                        Clear text
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Optional Target Job Settings Accordion */}
              <div className="mt-5 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowJobDetails(!showJobDetails)}
                  className="flex items-center gap-2 text-xs font-semibold text-[#0e2118] hover:text-emerald-800 transition cursor-pointer"
                >
                  <ChevronRight
                    className={`size-3.5 transition-transform ${
                      showJobDetails ? "rotate-90" : ""
                    }`}
                  />
                  <span>Target Role & Job Description (Recommended for precision scoring)</span>
                </button>

                {showJobDetails && (
                  <div className="mt-3 space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 mb-1">
                        Target Job Title
                      </label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Senior Full-Stack Engineer or Fintech Analyst"
                        className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 mb-1">
                        Target Job Description / Key Requirements (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste requirements, responsibilities, or must-have skills from job post..."
                        className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Callout */}
              {error && (
                <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={runAnalysis}
                  disabled={isAnalyzing || (!resumeText.trim() && !fileBase64)}
                  className="w-full py-3.5 px-6 rounded-full text-sm font-semibold bg-[#0e2118] text-white hover:bg-[#163628] disabled:opacity-50 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="size-4 animate-spin text-[#bef264]" />
                      <span>Analyzing Resume with AI Engine...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 text-[#bef264]" />
                      <span>Analyze Resume & Calculate ATS Score</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Progress Steps during Analysis */}
              {isAnalyzing && (
                <div className="mt-6 p-4 rounded-2xl bg-[#0e2118]/[0.03] border border-black/[0.06] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0e2118]">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>AI Parsing Pipeline Active</span>
                  </div>
                  {[
                    "Extracting document syntax and structural sections",
                    "Evaluating ATS parseability and keyword density",
                    "Auditing passive phrasing and missing quantitative metrics",
                    "Synthesizing high-impact rewrites and ATS score tier",
                  ].map((stepText, idx) => (
                    <div
                      key={stepText}
                      className={`flex items-center gap-2 text-xs ${
                        analysisStep > idx
                          ? "text-emerald-700 font-semibold"
                          : analysisStep === idx + 1
                          ? "text-[#0e2118] font-medium"
                          : "text-zinc-400"
                      }`}
                    >
                      <span className="flex size-4 items-center justify-center rounded-full bg-black/[0.06] text-[10px]">
                        {analysisStep > idx ? "✓" : idx + 1}
                      </span>
                      <span>{stepText}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* SHOWCASE OF RESULTS */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Score Banner Card */}
            <div className="rounded-3xl bg-white border border-black/[0.06] p-6 sm:p-8 shadow-[0_16px_50px_rgb(0,0,0,0.06)] relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Score Gauge */}
                <div className="flex items-center gap-6">
                  <div className="relative size-32 sm:size-36 flex items-center justify-center shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke={
                          result.atsScore >= 80
                            ? "#84cc16"
                            : result.atsScore >= 65
                            ? "#eab308"
                            : "#f43f5e"
                        }
                        strokeWidth="12"
                        strokeDasharray={326.7}
                        strokeDashoffset={326.7 - (326.7 * result.atsScore) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-3xl sm:text-4xl font-black text-[#0e2118]">
                        {result.atsScore}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        ATS Score
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-bold text-[#1e3d2c] mb-2">
                      <Zap className="size-3 fill-current" />
                      <span>{result.tier} Tier</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e2118] tracking-tight">
                      {result.parsedData.candidateName || "Candidate Profile"}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">
                      Target Role: <strong>{result.parsedData.detectedRole}</strong> • {result.parsedData.yearsExperience}
                    </p>
                  </div>
                </div>

                {/* Summary & Actions */}
                <div className="lg:max-w-md flex-1">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                    {result.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-black/[0.1] text-[#0e2118] hover:bg-zinc-50 transition cursor-pointer"
                    >
                      <Printer className="size-3.5" />
                      <span>Print Report</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] transition cursor-pointer"
                    >
                      <RefreshCw className="size-3.5" />
                      <span>Analyze Another Resume</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-100">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 font-medium">Critical Flaws</span>
                  <span className="text-xl font-bold text-rose-600">
                    {result.flaws.length} detected
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 font-medium">Quantified Rewrites</span>
                  <span className="text-xl font-bold text-[#0e2118]">
                    {result.improvements.length} ready
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 font-medium">Matched Keywords</span>
                  <span className="text-xl font-bold text-emerald-700">
                    {result.atsKeywords.matched.length} verified
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 font-medium">Missing Keywords</span>
                  <span className="text-xl font-bold text-amber-600">
                    {result.atsKeywords.missing.length} suggested
                  </span>
                </div>
              </div>
            </div>

            {/* SHOWCASE TABS */}
            <div className="rounded-3xl bg-white border border-black/[0.06] shadow-[0_12px_40px_rgb(0,0,0,0.04)] overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex items-center overflow-x-auto border-b border-black/[0.06] bg-black/[0.01] p-2 gap-1">
                {[
                  { id: "flaws", label: `Flaws & Issues (${result.flaws.length})`, icon: AlertTriangle },
                  { id: "improvements", label: `Rewrites & Fixes (${result.improvements.length})`, icon: Sparkles },
                  { id: "keywords", label: "ATS Keyword Matcher", icon: Search },
                  { id: "breakdown", label: "Category Scoring", icon: CheckCircle2 },
                  { id: "profile", label: "Parsed Resume Data", icon: User },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeResultTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveResultTab(tab.id as typeof activeResultTab)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#0e2118] text-white shadow-xs"
                          : "text-zinc-600 hover:text-black hover:bg-black/[0.03]"
                      }`}
                    >
                      <Icon className={`size-3.5 ${isActive ? "text-[#bef264]" : ""}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Area */}
              <div className="p-6 sm:p-8">
                {/* TAB 1: FLAWS */}
                {activeResultTab === "flaws" && (
                  <div className="space-y-6">
                    {/* Severity Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-zinc-500">Filter by severity:</span>
                      {(["all", "high", "medium", "low"] as const).map((sev) => (
                        <button
                          key={sev}
                          type="button"
                          onClick={() => setFlawFilter(sev)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition ${
                            flawFilter === sev
                              ? "bg-[#0e2118] text-white"
                              : "bg-black/[0.04] text-zinc-600 hover:bg-black/[0.08]"
                          }`}
                        >
                          {sev}
                        </button>
                      ))}
                    </div>

                    {/* Flaws List */}
                    <div className="grid grid-cols-1 gap-4">
                      {filteredFlaws.map((flaw) => (
                        <div
                          key={flaw.id}
                          className="rounded-2xl border border-black/[0.06] p-5 bg-white shadow-2xs space-y-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                  flaw.severity === "high"
                                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                                    : flaw.severity === "medium"
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                }`}
                              >
                                {flaw.severity} severity
                              </span>
                              <span className="text-xs font-mono text-zinc-400">
                                {flaw.location}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-base font-bold text-[#0e2118]">{flaw.title}</h4>
                          <p className="text-xs text-zinc-600 leading-relaxed">{flaw.issue}</p>

                          <div className="rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-3 text-xs text-amber-900">
                            <strong>Why recruiters & ATS flag this: </strong>
                            {flaw.whyItMatters}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: IMPROVEMENTS & REWRITES */}
                {activeResultTab === "improvements" && (
                  <div className="space-y-6">
                    <div className="text-xs text-zinc-500">
                      These bullet points were transformed using the Google XYZ formula and
                      quantified action verbs to maximize interview callbacks.
                    </div>

                    <div className="space-y-5">
                      {result.improvements.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-black/[0.06] p-5 sm:p-6 bg-white shadow-2xs space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-[#0e2118]">{item.title}</h4>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#bef264] text-[#0e2118]">
                              {item.impact} impact
                            </span>
                          </div>

                          <p className="text-xs text-zinc-600">{item.recommendation}</p>

                          {/* Before & After Comparison */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Before */}
                            <div className="rounded-xl bg-rose-50/70 border border-rose-200 p-4 space-y-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                                ❌ Original Weak Excerpt
                              </span>
                              <p className="text-xs text-zinc-700 italic font-mono">
                                &ldquo;{item.beforeExcerpt}&rdquo;
                              </p>
                            </div>

                            {/* After */}
                            <div className="rounded-xl bg-[#f2fbe8] border border-[#bef264] p-4 space-y-2 relative">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                                  ✅ High-Impact ATS Rewrite
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyRewrite(item.id, item.afterExample)}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0e2118] hover:text-emerald-800 transition cursor-pointer"
                                >
                                  {copiedId === item.id ? (
                                    <>
                                      <Check className="size-3 text-emerald-700" />
                                      <span className="text-emerald-700">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="size-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="text-xs font-semibold text-[#0e2118] leading-relaxed">
                                &ldquo;{item.afterExample}&rdquo;
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: KEYWORDS */}
                {activeResultTab === "keywords" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-[#0e2118] mb-1">
                        ATS Keyword Density & Gap Analysis
                      </h4>
                      <p className="text-xs text-zinc-500">
                        {result.atsKeywords.recommendedAction}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Matched */}
                      <div className="rounded-2xl border border-black/[0.06] p-5 bg-white shadow-2xs space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-emerald-600" />
                          <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                            Verified Keywords ({result.atsKeywords.matched.length})
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {result.atsKeywords.matched.map((kw) => (
                            <span
                              key={kw}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-[#f2fbe8] border border-[#bef264] text-[#1e3d2c]"
                            >
                              {kw} ✓
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing */}
                      <div className="rounded-2xl border border-black/[0.06] p-5 bg-white shadow-2xs space-y-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="size-4 text-amber-500" />
                          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                            Missing Role Keywords ({result.atsKeywords.missing.length})
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {result.atsKeywords.missing.map((kw) => (
                            <span
                              key={kw}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 border border-dashed border-amber-300 text-amber-900"
                            >
                              + Add {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: CATEGORY BREAKDOWN */}
                {activeResultTab === "breakdown" && (
                  <div className="space-y-5">
                    {Object.entries(result.categoryScores).map(([key, cat]) => {
                      const labels: Record<string, string> = {
                        keywordMatch: "Keyword Match & Density",
                        formattingAndATS: "Formatting & Structure Compatibility",
                        impactAndMetrics: "Quantified Metrics & Business Impact",
                        experienceRelevance: "Work History & Career Narrative",
                        skillsDistribution: "Technical & Core Competency Hierarchy",
                      };

                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-black/[0.06] p-5 bg-white shadow-2xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#0e2118]">
                              {labels[key] || key}
                            </span>
                            <span className="text-sm font-extrabold text-[#0e2118]">
                              {cat.score} / 100
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                cat.score >= 80
                                  ? "bg-[#84cc16]"
                                  : cat.score >= 65
                                  ? "bg-amber-400"
                                  : "bg-rose-500"
                              }`}
                              style={{ width: `${cat.score}%` }}
                            />
                          </div>

                          <p className="text-xs text-zinc-500">{cat.feedback}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TAB 5: PARSED RESUME PROFILE */}
                {activeResultTab === "profile" && (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-black/[0.06] p-6 bg-white shadow-2xs space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            Candidate Name
                          </span>
                          <span className="text-sm font-bold text-[#0e2118]">
                            {result.parsedData.candidateName || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            Contact Email
                          </span>
                          <span className="text-sm font-mono text-[#0e2118]">
                            {result.parsedData.email || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            Phone Number
                          </span>
                          <span className="text-sm font-mono text-[#0e2118]">
                            {result.parsedData.phone || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            Primary Profession
                          </span>
                          <span className="text-sm font-bold text-emerald-800">
                            {result.parsedData.detectedRole}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            Experience Tenure
                          </span>
                          <span className="text-sm font-semibold text-[#0e2118]">
                            {result.parsedData.yearsExperience}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-100">
                        <span className="text-xs font-bold text-[#0e2118] block mb-2">
                          Extracted Core Proficiencies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {result.parsedData.topSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-black/[0.04] text-[#0e2118]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
