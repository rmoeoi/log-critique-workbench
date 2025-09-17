import { ChatbotLogEntry } from '@/types/chatbot';

export const mockChatbotLogs: ChatbotLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    conversation_id: 'conv_001',
    chatbot_source: 'Kenya',
    user_query: 'What is the best time to plant maize in my region?',
    bot_response: 'In Kenya, the best time to plant maize is during the long rainy season from March to May, or the short rainy season from October to December. Make sure the soil is well-prepared and you have quality certified seeds.',
    status: 'approved',
    category: 'crop_management',
    context: {
      user_id: 'farmer_123',
      session_id: 'sess_001',
      previous_messages: 0
    }
  },
  {
    id: '2',
    timestamp: '2024-01-15T11:45:00Z',
    conversation_id: 'conv_002',
    chatbot_source: 'Uganda',
    user_query: 'How do I control coffee berry disease?',
    bot_response: 'Coffee berry disease is common in Uganda. You should spray copper-based fungicides every 2 weeks during wet season. Remove affected berries and ensure good plantation hygiene.',
    status: 'flagged',
    commentary: 'Response should mention specific fungicide brands available in Uganda and dosage recommendations',
    category: 'pest_disease',
    context: {
      user_id: 'farmer_456',
      session_id: 'sess_002',
      previous_messages: 2
    }
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:20:00Z',
    conversation_id: 'conv_003',
    chatbot_source: 'Malawi',
    user_query: 'Where can I sell my tobacco harvest?',
    bot_response: 'In Malawi, you can sell tobacco through auction floors or contract farming. I recommend checking with local tobacco companies.',
    status: 'needs_review',
    commentary: 'Response is too vague. Should provide specific auction floor locations and contact information for tobacco companies in Malawi.',
    category: 'market_access',
    context: {
      user_id: 'farmer_789',
      session_id: 'sess_003',
      previous_messages: 1
    }
  },
  {
    id: '4',
    timestamp: '2024-01-15T16:10:00Z',
    conversation_id: 'conv_004',
    chatbot_source: 'Kenya',
    user_query: 'How much fertilizer should I use for my 2-acre tomato farm?',
    bot_response: 'For 2 acres of tomatoes in Kenya, you typically need about 200kg of NPK fertilizer (23:23:0) at planting, followed by 150kg of CAN fertilizer during growth. Apply in splits and ensure proper soil testing first.',
    status: 'approved',
    category: 'fertilizer_advice',
    context: {
      user_id: 'farmer_101',
      session_id: 'sess_004',
      previous_messages: 0
    }
  },
  {
    id: '5',
    timestamp: '2024-01-15T17:30:00Z',
    conversation_id: 'conv_005',
    chatbot_source: 'Uganda',
    user_query: 'What are the symptoms of banana wilt disease?',
    bot_response: 'Banana wilt shows yellowing leaves that eventually dry up. The plant may also show stunted growth.',
    status: 'flagged',
    commentary: 'Incomplete response. Should mention bacterial vs fungal wilt, prevention methods, and treatment options specific to Uganda varieties.',
    category: 'pest_disease',
    context: {
      user_id: 'farmer_202',
      session_id: 'sess_005',
      previous_messages: 3
    }
  },
  {
    id: '6',
    timestamp: '2024-01-16T09:15:00Z',
    conversation_id: 'conv_006',
    chatbot_source: 'Malawi',
    user_query: 'How do I apply for government agriculture subsidies?',
    bot_response: 'In Malawi, you can apply for the Affordable Inputs Program (AIP) through your local agricultural extension officer. You need to register with your village headman first and provide your national ID.',
    status: 'unreviewed',
    category: 'government_support',
    context: {
      user_id: 'farmer_303',
      session_id: 'sess_006',
      previous_messages: 0
    }
  },
  {
    id: '7',
    timestamp: '2024-01-16T11:20:00Z',
    conversation_id: 'conv_007',
    chatbot_source: 'Kenya',
    user_query: 'What is the current market price for beans?',
    bot_response: 'Current bean prices vary by region, but typically range from 80-120 KES per kg depending on quality and market location.',
    status: 'flagged',
    commentary: 'Price information may be outdated. Should provide real-time pricing sources or disclaimer about price volatility.',
    category: 'market_prices',
    context: {
      user_id: 'farmer_404',
      session_id: 'sess_007',
      previous_messages: 1
    }
  },
  {
    id: '8',
    timestamp: '2024-01-16T13:45:00Z',
    conversation_id: 'conv_008',
    chatbot_source: 'Uganda',
    user_query: 'How do I prepare land for cassava planting?',
    bot_response: 'For cassava in Uganda, prepare ridges or mounds 1 meter apart. Clear weeds, till the soil to 20cm depth, and ensure good drainage. Plant during the beginning of rainy season for best results.',
    status: 'unreviewed',
    category: 'crop_management',
    context: {
      user_id: 'farmer_505',
      session_id: 'sess_008',
      previous_messages: 0
    }
  }
];