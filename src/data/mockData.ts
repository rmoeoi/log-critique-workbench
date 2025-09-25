import { ChatbotLogEntry, ConversationMessage } from '@/types/chatbot';

const generateConversationHistory = (mainQuery: string, mainResponse: string, userLang: string = 'en'): ConversationMessage[] => [
  {
    id: 'msg-1',
    type: 'user',
    timestamp: '2024-01-15T08:25:00Z',
    content_original: userLang === 'sw' ? 'Habari, ningependa ushauri kuhusu kilimo' : 'Hello, I would like advice about farming',
    content_english: 'Hello, I would like advice about farming',
    language: userLang
  },
  {
    id: 'msg-2',
    type: 'assistant', 
    timestamp: '2024-01-15T08:25:30Z',
    content_original: userLang === 'sw' ? 'Habari! Karibu. Nina furaha kukusaidia na masuala ya kilimo. Ni nini unachotaka kujua?' : 'Hello! Welcome. I\'m happy to help you with farming matters. What would you like to know?',
    content_english: 'Hello! Welcome. I\'m happy to help you with farming matters. What would you like to know?',
    language: userLang
  },
  {
    id: 'msg-3',
    type: 'user',
    timestamp: '2024-01-15T08:30:00Z',
    content_original: mainQuery,
    content_english: mainQuery,
    language: 'en'
  },
  {
    id: 'msg-4',
    type: 'assistant',
    timestamp: '2024-01-15T08:30:45Z', 
    content_original: mainResponse,
    content_english: mainResponse,
    language: 'en'
  }
];

export const mockChatbotLogs: ChatbotLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T08:30:00Z',
    conversation_id: 'conv-001',
    chatbot_source: 'Kenya',
    user_query: 'Mbolea gani bora kwa mahindi yaliyopandwa katika udongo wa tope wakati wa mvua?',
    user_query_english: 'What is the best fertilizer for maize grown in clay soil during the rainy season?',
    bot_response: 'Kwa mahindi yaliyopandwa katika udongo wa tope wakati wa mvua, ninapendekeza kutumia mbolea ya NPK yenye uwiano sawa kama 20-20-20 au 17-17-17. Udongo wa tope huhifadhi virutubisho vizuri, kwa hivyo unaweza kutumia hizi kwa kiwango cha kilo 50-75 kwa hektare.',
    bot_response_english: 'For maize grown in clay soil during the rainy season, I recommend using a balanced NPK fertilizer such as 20-20-20 or 17-17-17. Clay soil retains nutrients well, so you can use these at a rate of 50-75 kg per hectare. Additionally, consider adding organic matter like compost to improve soil structure and drainage, which is crucial during the rainy season.',
    original_language: 'sw',
    question_type: 'Fertilizer Advice',
    answer_type: 'Direct Cited',
    status: 'unreviewed',
    classification: 'Technical Query',
    category: 'fertilizer_advice',
    thumbs_up: false,
    thumbs_down: false,
    conversation_history: generateConversationHistory(
      'Mbolea gani bora kwa mahindi yaliyopandwa katika udongo wa tope wakati wa mvua?',
      'Kwa mahindi yaliyopandwa katika udongo wa tope...',
      'sw'
    ),
    context: {
      user_id: 'user-123',
      session_id: 'session-456',
      previous_messages: 2
    }
  },
  {
    id: '2',
    timestamp: '2024-01-15T09:15:00Z',
    conversation_id: 'conv-002', 
    chatbot_source: 'Uganda',
    user_query: 'My coffee plants have yellow leaves and are dropping. What could be the problem?',
    user_query_english: 'My coffee plants have yellow leaves and are dropping. What could be the problem?',
    bot_response: 'Yellow leaves on coffee plants that are dropping can indicate several issues: 1) Overwatering - check if soil drainage is adequate, 2) Nutrient deficiency, particularly nitrogen or iron, 3) Coffee leaf rust disease - look for orange spots on undersides of leaves, 4) Root rot from poor drainage.',
    bot_response_english: 'Yellow leaves on coffee plants that are dropping can indicate several issues: 1) Overwatering - check if soil drainage is adequate, 2) Nutrient deficiency, particularly nitrogen or iron, 3) Coffee leaf rust disease - look for orange spots on undersides of leaves, 4) Root rot from poor drainage. I recommend checking soil moisture, improving drainage if needed, and applying a balanced fertilizer. If you see orange spots, treat with copper-based fungicide.',
    original_language: 'en',
    question_type: 'Problem Diagnosis',
    answer_type: 'Direct Cited',
    status: 'flagged',
    classification: 'Disease Identification',
    category: 'pest_disease',
    thumbs_up: false,
    thumbs_down: true,
    commentary: 'Good comprehensive response covering multiple potential causes. Accurate diagnosis steps provided.',
    image_url: 'https://example.com/coffee-leaves.jpg',
    conversation_history: generateConversationHistory(
      'My coffee plants have yellow leaves and are dropping. What could be the problem?',
      'Yellow leaves on coffee plants that are dropping can indicate several issues...'
    ),
    context: {
      user_id: 'user-789',
      session_id: 'session-012',
      previous_messages: 0
    }
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:45:00Z',
    conversation_id: 'conv-003',
    chatbot_source: 'Malawi',
    user_query: 'Ndalama zingati za thumba la NPK fertilizer la 50kg ku msika wa Lilongwe?',
    user_query_english: 'How much does a 50kg bag of NPK fertilizer cost in Lilongwe market?',
    bot_response: 'Malinga ndi data ya msika yamakono, thumba la NPK fertilizer (23-21-0+4S) la 50kg ku Lilongwe limawoneka MWK 45,000 - 50,000 kwa ogulitsa akuluakulu a ulimi.',
    bot_response_english: 'Based on current market data, a 50kg bag of NPK fertilizer (23-21-0+4S) in Lilongwe costs approximately MWK 45,000 - 50,000 at major agricultural suppliers. Prices may vary slightly between different suppliers. For the best deals, I recommend checking with: 1) ADMARC depots, 2) Farmers World, 3) Local agro-dealers. Consider buying in bulk during off-season for better prices.',
    original_language: 'ny',
    question_type: 'Market Price',
    answer_type: 'Direct Cited', 
    status: 'needs_review',
    classification: 'Price Inquiry',
    category: 'market_prices',
    thumbs_up: true,
    thumbs_down: false,
    audio_url: 'https://example.com/audio/question-3.mp3',
    conversation_history: generateConversationHistory(
      'Ndalama zingati za thumba la NPK fertilizer la 50kg ku msika wa Lilongwe?',
      'Malinga ndi data ya msika yamakono...',
      'ny'
    ),
    context: {
      user_id: 'user-456',
      session_id: 'session-789',
      previous_messages: 1
    }
  },
  {
    id: '4',
    timestamp: '2024-01-15T11:20:00Z',
    conversation_id: 'conv-004',
    chatbot_source: 'Kenya', 
    user_query: 'What government subsidies are available for small-scale farmers in Kenya?',
    user_query_english: 'What government subsidies are available for small-scale farmers in Kenya?',
    bot_response: 'The Kenya government offers several subsidies for small-scale farmers through various programs: 1) Fertilizer Subsidy Program - up to 40% discount on certified fertilizers, 2) Seed Subsidy - subsidized certified seeds for major crops, 3) Agricultural Mechanization Program.',
    bot_response_english: 'The Kenya government offers several subsidies for small-scale farmers through various programs: 1) Fertilizer Subsidy Program - up to 40% discount on certified fertilizers, 2) Seed Subsidy - subsidized certified seeds for major crops, 3) Agricultural Mechanization Program - subsidized access to tractors and equipment, 4) Irrigation Development - support for drip irrigation systems, 5) Livestock restocking programs. To access these, register with your local agricultural office and join a farmer group or cooperative.',
    original_language: 'en',
    question_type: 'Support Inquiry',
    answer_type: 'Direct Cited',
    status: 'approved',
    classification: 'Government Program',
    category: 'government_support',
    thumbs_up: true,
    thumbs_down: false,
    commentary: 'Comprehensive and accurate information about available government programs.',
    conversation_history: generateConversationHistory(
      'What government subsidies are available for small-scale farmers in Kenya?',
      'The Kenya government offers several subsidies...'
    ),
    context: {
      user_id: 'user-321',
      session_id: 'session-654',
      previous_messages: 3
    }
  },
  {
    id: '5',
    timestamp: '2024-01-15T14:30:00Z',
    conversation_id: 'conv-005',
    chatbot_source: 'Uganda',
    user_query: 'Ebiseera ki ebirungi okusimba groundnuts mu Uganda munkiiko?',
    user_query_english: 'When is the best time to plant groundnuts in central Uganda?',
    bot_response: 'Mu Uganda munkiiko, ebiseera ebirungi okusimba groundnuts biri mu biseera by\'enkuba ebbiri: 1) Ekiseera ekysooka: Mach okutuuka May - simba wakati wa Mach n\'okutandika April.',
    bot_response_english: 'In central Uganda, the best time to plant groundnuts is during the two rainy seasons: 1) First season: March to May - plant between mid-March to early April, 2) Second season: September to December - plant in September to early October. Choose well-drained soils and ensure adequate spacing (30cm between rows, 15cm between plants). Popular varieties include Serenut series and local varieties. Groundnuts grow well in Uganda\'s climate with proper timing.',
    original_language: 'lg',
    question_type: 'Timing Advice',
    answer_type: 'Direct Cited',
    status: 'triaged',
    classification: 'Planting Schedule',
    category: 'crop_management',
    thumbs_up: false,
    thumbs_down: false,
    conversation_history: generateConversationHistory(
      'Ebiseera ki ebirungi okusimba groundnuts mu Uganda munkiiko?',
      'Mu Uganda munkiiko, ebiseera ebirungi okusimba groundnuts...',
      'lg'
    ),
    context: {
      user_id: 'user-567',
      session_id: 'session-890',
      previous_messages: 0
    }
  },
  {
    id: '6',
    timestamp: '2024-01-16T09:15:00Z',
    conversation_id: 'conv-006',
    chatbot_source: 'Malawi',
    user_query: 'Kodi ndingapeze kuti bwanji chithandizo cha boma pa ulimi?',
    user_query_english: 'How can I access government support for agriculture?',
    bot_response: 'Ku Malawi, mutha kupeza chithandizo cha boma kudzera mu pulogalamu ya Affordable Inputs Program (AIP). Muyenera kudzilemba ndi mkuluakulu waulimi wa m\'dera lanu.',
    bot_response_english: 'In Malawi, you can access government support through the Affordable Inputs Program (AIP). You need to register with your local agricultural extension officer. You also need to register with your village headman first and provide your national ID. The program provides subsidized fertilizer and seeds to smallholder farmers.',
    original_language: 'ny',
    question_type: 'Support Inquiry',
    answer_type: 'Direct Cited',
    status: 'approved',
    classification: 'Government Program',
    category: 'government_support',
    thumbs_up: true,
    thumbs_down: false,
    conversation_history: generateConversationHistory(
      'Kodi ndingapeze kuti bwanji chithandizo cha boma pa ulimi?',
      'Ku Malawi, mutha kupeza chithandizo cha boma...',
      'ny'
    ),
    context: {
      user_id: 'user-303',
      session_id: 'session-606',
      previous_messages: 1
    }
  },
  {
    id: '7',
    timestamp: '2024-01-16T11:20:00Z',
    conversation_id: 'conv-007',
    chatbot_source: 'Kenya',
    user_query: 'What is the current market price for beans in Nairobi?',
    user_query_english: 'What is the current market price for beans in Nairobi?',
    bot_response: 'Current bean prices in Nairobi vary by quality and variety. Red kidney beans are selling at 120-150 KES per kg, while local varieties range from 80-110 KES per kg at Wakulima Market.',
    bot_response_english: 'Current bean prices in Nairobi vary by quality and variety. Red kidney beans are selling at 120-150 KES per kg, while local varieties range from 80-110 KES per kg at Wakulima Market. Prices fluctuate based on season and supply. For the most current prices, check with local markets or online platforms like eSoko Kenya.',
    original_language: 'en',
    question_type: 'Market Price',
    answer_type: 'Direct Cited',
    status: 'flagged',
    classification: 'Price Inquiry',
    category: 'market_prices',
    thumbs_up: false,
    thumbs_down: true,
    commentary: 'Price information may be outdated. Should provide real-time pricing sources or disclaimer about price volatility.',
    conversation_history: generateConversationHistory(
      'What is the current market price for beans in Nairobi?',
      'Current bean prices in Nairobi vary by quality and variety...'
    ),
    context: {
      user_id: 'user-404',
      session_id: 'session-707',
      previous_messages: 1
    }
  },
  {
    id: '8',
    timestamp: '2024-01-16T13:45:00Z',
    conversation_id: 'conv-008',
    chatbot_source: 'Uganda',
    user_query: 'How do I prepare land for cassava planting?',
    user_query_english: 'How do I prepare land for cassava planting?',
    bot_response: 'For cassava in Uganda, prepare ridges or mounds 1 meter apart. Clear weeds, till the soil to 20cm depth, and ensure good drainage. Plant during the beginning of rainy season for best results.',
    bot_response_english: 'For cassava in Uganda, prepare ridges or mounds 1 meter apart. Clear weeds, till the soil to 20cm depth, and ensure good drainage. Plant during the beginning of rainy season for best results. Use healthy stem cuttings 20-25cm long from disease-free plants. Space cuttings 1m x 1m for optimal yield.',
    original_language: 'en',
    question_type: 'Land Preparation',
    answer_type: 'Direct Cited',
    status: 'unreviewed',
    classification: 'Technical Query',
    category: 'crop_management',
    thumbs_up: false,
    thumbs_down: false,
    audio_url: 'https://example.com/audio/question-8.mp3',
    image_url: 'https://example.com/images/cassava-planting.jpg',
    conversation_history: generateConversationHistory(
      'How do I prepare land for cassava planting?',
      'For cassava in Uganda, prepare ridges or mounds...'
    ),
    context: {
      user_id: 'user-505',
      session_id: 'session-808',
      previous_messages: 0
    }
  }
];