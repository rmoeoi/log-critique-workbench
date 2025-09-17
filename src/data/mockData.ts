import { ChatbotLogEntry } from '@/types/chatbot';

export const mockChatbotLogs: ChatbotLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    conversation_id: 'conv_001',
    user_query: 'How do I reset my password?',
    bot_response: 'To reset your password, go to the login page and click "Forgot Password". You\'ll receive an email with reset instructions.',
    confidence_score: 0.95,
    status: 'approved',
    category: 'account_support',
    tags: ['password', 'reset', 'authentication'],
    context: {
      user_id: 'user_123',
      session_id: 'sess_001',
      previous_messages: 0
    }
  },
  {
    id: '2',
    timestamp: '2024-01-15T11:45:00Z',
    conversation_id: 'conv_002',
    user_query: 'What are your business hours?',
    bot_response: 'Our business hours are Monday to Friday, 9 AM to 6 PM EST. We\'re closed on weekends and major holidays.',
    confidence_score: 0.88,
    status: 'flagged',
    commentary: 'Response doesn\'t mention 24/7 online support availability',
    category: 'general_info',
    tags: ['hours', 'support', 'availability'],
    context: {
      user_id: 'user_456',
      session_id: 'sess_002',
      previous_messages: 2
    }
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:20:00Z',
    conversation_id: 'conv_003',
    user_query: 'Can I upgrade my subscription plan?',
    bot_response: 'Yes, you can upgrade your subscription at any time. However, I\'m not sure about the specific process or pricing details.',
    confidence_score: 0.65,
    status: 'needs_review',
    commentary: 'Incomplete information provided. Should include clear upgrade steps and pricing.',
    category: 'billing',
    tags: ['subscription', 'upgrade', 'billing'],
    context: {
      user_id: 'user_789',
      session_id: 'sess_003',
      previous_messages: 1
    }
  },
  {
    id: '4',
    timestamp: '2024-01-15T16:10:00Z',
    conversation_id: 'conv_004',
    user_query: 'How do I integrate your API with my application?',
    bot_response: 'To integrate our API, you\'ll need to sign up for a developer account and follow our comprehensive API documentation. Here\'s a quick overview: 1) Get your API key, 2) Make authenticated requests to our endpoints, 3) Handle responses according to our schema.',
    confidence_score: 0.92,
    status: 'approved',
    category: 'technical',
    tags: ['api', 'integration', 'development'],
    context: {
      user_id: 'user_101',
      session_id: 'sess_004',
      previous_messages: 0
    }
  },
  {
    id: '5',
    timestamp: '2024-01-15T17:30:00Z',
    conversation_id: 'conv_005',
    user_query: 'Is my data secure with your service?',
    bot_response: 'We take security seriously and use industry-standard encryption. Your data is safe with us.',
    confidence_score: 0.78,
    status: 'flagged',
    commentary: 'Too vague. Should mention specific security certifications and compliance standards.',
    category: 'security',
    tags: ['security', 'data', 'privacy'],
    context: {
      user_id: 'user_202',
      session_id: 'sess_005',
      previous_messages: 3
    }
  },
  {
    id: '6',
    timestamp: '2024-01-16T09:15:00Z',
    conversation_id: 'conv_006',
    user_query: 'Do you offer refunds?',
    bot_response: 'We offer a 30-day money-back guarantee for all new subscriptions. To request a refund, please contact our support team with your account details.',
    confidence_score: 0.91,
    status: 'unreviewed',
    category: 'billing',
    tags: ['refund', 'billing', 'guarantee'],
    context: {
      user_id: 'user_303',
      session_id: 'sess_006',
      previous_messages: 0
    }
  },
  {
    id: '7',
    timestamp: '2024-01-16T11:20:00Z',
    conversation_id: 'conv_007',
    user_query: 'How many users can I have on my team plan?',
    bot_response: 'Team plans support unlimited users, but you might want to check with billing for specific details.',
    confidence_score: 0.45,
    status: 'flagged',
    commentary: 'Contradictory information. Team plans have user limits. Needs correction.',
    category: 'billing',
    tags: ['team', 'users', 'limits'],
    context: {
      user_id: 'user_404',
      session_id: 'sess_007',
      previous_messages: 1
    }
  },
  {
    id: '8',
    timestamp: '2024-01-16T13:45:00Z',
    conversation_id: 'conv_008',
    user_query: 'Can I export my data?',
    bot_response: 'Yes, you can export your data in multiple formats including CSV, JSON, and XML. Go to Settings > Data Export to access this feature.',
    confidence_score: 0.89,
    status: 'unreviewed',
    category: 'data_management',
    tags: ['export', 'data', 'formats'],
    context: {
      user_id: 'user_505',
      session_id: 'sess_008',
      previous_messages: 0
    }
  }
];