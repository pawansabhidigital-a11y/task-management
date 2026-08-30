-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('manager', 'team_member', 'sunday_operator');
CREATE TYPE task_priority AS ENUM ('P0', 'P1', 'P2', 'P3');
CREATE TYPE task_status AS ENUM ('new', 'in_progress', 'blocked', 'qa_pending', 'completed', 'cancelled');
CREATE TYPE task_category AS ENUM (
  'webinar', 'replay', 'whatsapp_broadcast', 'funnel_automation', 
  'silver_offer', 'diamond_showcase', 'slide_update', 'client_request', 'reporting', 'other'
);
CREATE TYPE recurrence_interval AS ENUM ('daily', 'weekly', 'monthly', 'custom_days');
CREATE TYPE escalation_level AS ENUM ('level_1_primary', 'level_2_backup', 'level_3_manager');

-- 3. PROFILES TABLE (Mirrors Supabase Auth)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'team_member',
    working_days TEXT[] DEFAULT ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    working_hours_start TIME DEFAULT '09:30:00',
    working_hours_end TIME DEFAULT '18:00:00',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CLIENTS TABLE
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    priority_order INT NOT NULL, -- 1=Ritu, 2=Shruti, etc.
    is_active BOOLEAN NOT NULL DEFAULT true,
    onboarding_phase BOOLEAN NOT NULL DEFAULT false, -- True for Amit currently
    special_instructions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CLIENT OWNERSHIP (Primary & Backup)
CREATE TABLE client_ownership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    primary_owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    backup_owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    effective_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. RECURRING RULES ENGINE
CREATE TABLE recurring_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category task_category NOT NULL,
    interval_type recurrence_interval NOT NULL,
    scheduled_time TIME NOT NULL,
    days_of_week INT[], -- 1=Monday ... 7=Sunday (e.g. {1,3,4,6} for Jaya)
    day_of_month INT[], -- e.g. {1, 15} for monthly Silver Offers
    target_count_per_month INT DEFAULT 0, -- e.g. 2 for Silver Offers
    lead_time_days INT NOT NULL DEFAULT 3, -- Alert X days before execution
    default_priority task_priority NOT NULL DEFAULT 'P2',
    checklist_template JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TASKS TABLE
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    category task_category NOT NULL,
    priority task_priority NOT NULL DEFAULT 'P2',
    priority_reason TEXT NOT NULL,
    status task_status NOT NULL DEFAULT 'new',
    assigned_to UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    backup_user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    due_datetime TIMESTAMPTZ NOT NULL,
    is_recurring_instance BOOLEAN NOT NULL DEFAULT false,
    recurring_rule_id UUID REFERENCES recurring_rules(id) ON DELETE SET NULL,
    source_type TEXT NOT NULL DEFAULT 'manual', -- manual, natural_language, recurring_engine, csv_import, client_message
    is_escalated BOOLEAN NOT NULL DEFAULT false,
    escalation_level escalation_level DEFAULT 'level_1_primary',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TASK CHECKLISTS (Definition of Done)
CREATE TABLE task_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    item_title TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ
);

-- 9. 15-MINUTE STUCK & HELP REQUESTS
CREATE TABLE help_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    assigned_helper_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    problem_statement TEXT NOT NULL,
    what_was_checked TEXT NOT NULL,
    what_was_tried TEXT NOT NULL,
    what_is_needed TEXT NOT NULL,
    escalation_level escalation_level NOT NULL DEFAULT 'level_2_backup',
    status TEXT NOT NULL DEFAULT 'open', -- open, in_progress, resolved
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 10. PROBLEM -> SOLUTION KNOWLEDGE BASE
CREATE TABLE problem_solutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_title TEXT NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    category task_category NOT NULL,
    tool_system TEXT NOT NULL, -- e.g. 'Pabbly + Tagmango'
    root_cause TEXT NOT NULL,
    steps_taken TEXT NOT NULL,
    final_solution TEXT NOT NULL,
    solved_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    embedding vector(1536), -- Semantic vector representation
    verification_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. TEAM SKILLS & EXPERTISE MATRIX
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE user_skills (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    manual_proficiency INT DEFAULT 3, -- 1 to 5 scale
    solved_problems_count INT DEFAULT 0,
    PRIMARY KEY (user_id, skill_id)
);

-- 12. SYSTEM ALERTS & NOTIFICATIONS
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    alert_type TEXT NOT NULL, -- 'webinar_imminent', 'offer_unplanned', 'stuck_task', 'p0_emergency'
    is_dismissed BOOLEAN NOT NULL DEFAULT false,
    target_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. AUDIT & ACTIVITY LOG
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. PERFORMANCE INDEXES
CREATE INDEX idx_tasks_due_status ON tasks(due_datetime, status);
CREATE INDEX idx_tasks_assigned_priority ON tasks(assigned_to, priority);
CREATE INDEX idx_recurring_rules_active ON recurring_rules(is_active);
CREATE INDEX idx_problem_solutions_vector ON problem_solutions USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_problem_solutions_text ON problem_solutions USING gin (problem_title gin_trgm_ops, root_cause gin_trgm_ops);