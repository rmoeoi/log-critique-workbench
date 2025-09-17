export interface ChatbotLogEntry {
  id: string;
  timestamp: string;
  conversation_id: string;
  user_query: string;
  bot_response: string;
  confidence_score: number;
  status: 'unreviewed' | 'flagged' | 'approved' | 'needs_review';
  reviewer_id?: string;
  commentary?: string;
  category?: string;
  tags?: string[];
  context?: {
    user_id?: string;
    session_id?: string;
    previous_messages?: number;
  };
}

export interface ReviewComment {
  id: string;
  log_entry_id: string;
  reviewer_id: string;
  comment: string;
  timestamp: string;
  category: 'issue' | 'suggestion' | 'note';
}

export interface FilterOptions {
  status?: string[];
  confidence_range?: [number, number];
  date_range?: [Date, Date];
  search?: string;
  category?: string[];
  reviewer?: string[];
}