// In-memory persistent server-side store for authentication and user resumes
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  tier: "Free" | "Pro" | "Enterprise";
  avatar: string;
  createdAt: string;
}

export interface UserSession {
  token: string;
  userId: string;
  createdAt: number;
}

export interface SavedResume {
  id: string;
  userId: string;
  fileName: string;
  targetRole?: string;
  atsScore: number;
  tier: string;
  summary: string;
  createdAt: string;
  analysis: any;
}

// Global state cache to survive HMR in dev environment
const globalStore = global as unknown as {
  __FINOVIA_USERS__?: Map<string, StoredUser>;
  __FINOVIA_SESSIONS__?: Map<string, UserSession>;
  __FINOVIA_RESUMES__?: Map<string, SavedResume[]>;
};

if (!globalStore.__FINOVIA_USERS__) {
  globalStore.__FINOVIA_USERS__ = new Map<string, StoredUser>();
  // Seed demo accounts
  globalStore.__FINOVIA_USERS__.set("alex.morgan@fintech.dev", {
    id: "usr_alex_morgan",
    name: "Alex Morgan",
    email: "alex.morgan@fintech.dev",
    passwordHash: "password123", // In a production app, use bcrypt/argon2
    role: "Senior Software Engineer",
    tier: "Pro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  });

  globalStore.__FINOVIA_USERS__.set("sarah.lin@finovia.io", {
    id: "usr_sarah_lin",
    name: "Sarah Lin",
    email: "sarah.lin@finovia.io",
    passwordHash: "password123",
    role: "Talent Acquisition Partner",
    tier: "Enterprise",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  });
}

if (!globalStore.__FINOVIA_SESSIONS__) {
  globalStore.__FINOVIA_SESSIONS__ = new Map<string, UserSession>();
}

if (!globalStore.__FINOVIA_RESUMES__) {
  globalStore.__FINOVIA_RESUMES__ = new Map<string, SavedResume[]>();
}

const users = globalStore.__FINOVIA_USERS__!;
const sessions = globalStore.__FINOVIA_SESSIONS__!;
const userResumes = globalStore.__FINOVIA_RESUMES__!;

export function getUserByEmail(email: string): StoredUser | undefined {
  return users.get(email.toLowerCase().trim());
}

export function getUserById(id: string): StoredUser | undefined {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return undefined;
}

export function registerUser(params: {
  name: string;
  email: string;
  password?: string;
  role?: string;
}): StoredUser {
  const emailKey = params.email.toLowerCase().trim();
  if (users.has(emailKey)) {
    throw new Error("An account with this email address already exists.");
  }

  const newUser: StoredUser = {
    id: "usr_" + Math.random().toString(36).substring(2, 11),
    name: params.name.trim() || params.email.split("@")[0],
    email: emailKey,
    passwordHash: params.password || "password123",
    role: params.role || "Candidate",
    tier: "Pro",
    avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 100)}?w=120&auto=format&fit=crop&q=80`,
    createdAt: new Date().toISOString(),
  };

  users.set(emailKey, newUser);
  return newUser;
}

export function createSession(userId: string): string {
  const token = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  sessions.set(token, {
    token,
    userId,
    createdAt: Date.now(),
  });
  return token;
}

export function getSessionUser(token: string): StoredUser | null {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;

  // Session valid for 30 days
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  if (Date.now() - session.createdAt > thirtyDays) {
    sessions.delete(token);
    return null;
  }

  return getUserById(session.userId) || null;
}

export function deleteSession(token: string): void {
  if (token) {
    sessions.delete(token);
  }
}

export function sanitizeUser(user: StoredUser) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export function saveResumeForUser(
  userId: string,
  resumeData: {
    fileName: string;
    targetRole?: string;
    atsScore: number;
    tier: string;
    summary: string;
    analysis: any;
  }
): SavedResume {
  const list = userResumes.get(userId) || [];
  const newResume: SavedResume = {
    id: "res_" + Math.random().toString(36).substring(2, 10),
    userId,
    fileName: resumeData.fileName || "Resume.pdf",
    targetRole: resumeData.targetRole,
    atsScore: resumeData.atsScore,
    tier: resumeData.tier,
    summary: resumeData.summary,
    createdAt: new Date().toISOString(),
    analysis: resumeData.analysis,
  };

  list.unshift(newResume);
  userResumes.set(userId, list);
  return newResume;
}

export function getUserResumes(userId: string): SavedResume[] {
  return userResumes.get(userId) || [];
}

export function deleteUserResume(userId: string, resumeId: string): boolean {
  const list = userResumes.get(userId) || [];
  const updated = list.filter((r) => r.id !== resumeId);
  userResumes.set(userId, updated);
  return updated.length < list.length;
}
