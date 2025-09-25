export interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  timestamp: string;
  content_original: string;
  content_english: string;
  language: string;
}

export interface ChatbotLogEntry {
  id: string;
  timestamp: string;
  conversation_id: string;
  chatbot_source: string; // e.g., "Malawi", "Uganda", "Kenya"
  user_query: string;
  user_query_english: string;
  bot_response: string;
  bot_response_english: string;
  original_language: string;
  question_type: string;
  answer_type: string;
  status: 'unreviewed' | 'flagged' | 'approved' | 'needs_review' | 'triaged';
  classification?: string;
  reviewer_id?: string;
  commentary?: string;
  category?: string;
  thumbs_up: boolean;
  thumbs_down: boolean;
  audio_url?: string;
  image_url?: string;
  conversation_history: ConversationMessage[];
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
  date_range?: [Date, Date];
  search?: string;
  category?: string[];
  chatbot_source?: string[];
  reviewer?: string[];
}