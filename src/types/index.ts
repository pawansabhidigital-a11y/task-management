export type PriorityLevel = "P0" | "P1" | "P2" | "P3";

export type TaskStatus = 
  | "New" 
  | "In Progress" 
  | "Blocked" 
  | "QA Pending" 
  | "Completed" 
  | "Cancelled";

export type TaskCategory = 
  | "Webinar" 
  | "Replay" 
  | "WhatsApp" 
  | "Automation" 
  | "Silver Offer" 
  | "Diamond Showcase" 
  | "Slides" 
  | "Client Request" 
  | "Reporting" 
  | "Other";

export type ClientStatus = "On Track" | "Attention Required" | "Onboarding" | "Blocked";

export interface TeamMember {
  id: string;
  name: string;
  role: "Manager" | "Team Member" | "Sunday Operator";
  workingDays: string;
  workingHours: string;
  assignedClients: string[];
  mockStats: {
    todayTasks: number;
    p0: number;
    p1: number;
    blocked: number;
    completed: number;
  };
}

export interface ClientSchedule {
  type: "Webinar" | "Replay" | "Session" | "Orientation" | "Message" | "Report";
  time: string;
  days: string;
  mode: "Live" | "Simulive" | "Async";
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  priorityOrder: number;
  primaryOwner: string;
  backupOwner: string;
  status: ClientStatus;
  isOnboarding: boolean;
  notes?: string;
  schedules: ClientSchedule[];
  specialPrograms?: string[];
  operationalRules: string[];
}

export interface Task {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  category: TaskCategory;
  priority: PriorityLevel;
  priorityReason: string;
  owner: string;
  backup: string;
  dueTime: string;
  status: TaskStatus;
  isSimuliveOrLive?: boolean;
}

export interface MonthlyCommitment {
  id: string;
  clientId: string;
  clientName: string;
  requirement: "Silver Offer" | "Diamond Showcase" | "Slide Date Update" | "Month-End Report";
  requiredCount: number;
  plannedCount: number;
  completedCount: number;
  status: "Not Planned" | "Planning Pending" | "Planned" | "Completed";
  executionDate: string;
}

export interface AlertItem {
  id: string;
  type: string;
  level: "critical" | "warning" | "info";
  clientName: string;
  title: string;
  description: string;
  actionRequired: string;
  owner: string;
  createdAt: string;
}
