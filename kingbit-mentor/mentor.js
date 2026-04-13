/**
 * Kingbit Mentor - OpenClaw Skill
 * Wise mentor with context-aware wisdom
 */

var KingbitMentor = {
  name: 'kingbit-mentor',
  version: '1.0.0',
  
  /**
   * Initialize
   */
  initialize: function() {
    console.log('🌟 Kingbit Mentor initialized');
    return {
      success: true,
      message: 'Your wise mentor is ready. Ask for guidance!'
    };
  },
  
  /**
   * Get wisdom based on context
   */
  getWisdom: function(type, context) {
    var wisdom = this.wisdoms[type] || this.wisdoms.general;
    
    // Get time-based wisdom
    var hour = new Date().getHours();
    var timeType = this.getTimeType(hour);
    
    // Context-based selection
    if (context) {
      return this.getContextWisdom(context, wisdom);
    }
    
    return wisdom[Math.floor(Math.random() * wisdom.length)];
  },
  
  /**
   * Get time of day type
   */
  getTimeType: function(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  },
  
  /**
   * Get context-specific wisdom
   */
  getContextWisdom: function(context, defaultWisdom) {
    var lower = context.toLowerCase();
    
    if (lower.includes('sad') || lower.includes('down') || lower.includes('cry')) {
      return this.wisdoms.comfort[Math.floor(Math.random() * this.wisdoms.comfort.length)];
    }
    if (lower.includes('confused') || lower.includes('lost') || lower.includes('stuck')) {
      return this.wisdoms.clarity[Math.floor(Math.random() * this.wisdoms.clarity.length)];
    }
    if (lower.includes('fail') || lower.includes('wrong') || lower.includes('mistake')) {
      return this.wisdoms.resilience[Math.floor(Math.random() * this.wisdoms.resilience.length)];
    }
    if (lower.includes('success') || lower.includes('win') || lower.includes('achieved')) {
      return this.wisdoms.humbling[Math.floor(Math.random() * this.wisdoms.humbling.length)];
    }
    if (lower.includes('stress') || lower.includes('anxious') || lower.includes('worry')) {
      return this.wisdoms.peace[Math.floor(Math.random() * this.wisdoms.peace.length)];
    }
    if (lower.includes('love') || lower.includes('relationship') || lower.includes('heart')) {
      return this.wisdoms.love[Math.floor(Math.random() * this.wisdoms.love.length)];
    }
    if (lower.includes('work') || lower.includes('career') || lower.includes('job')) {
      return this.wisdoms.work[Math.floor(Math.random() * this.wisdoms.work.length)];
    }
    if (lower.includes('code') || lower.includes('programming') || lower.includes('bug')) {
      return this.wisdoms.coding[Math.floor(Math.random() * this.wisdoms.coding.length)];
    }
    
    return defaultWisdom;
  },
  
  /**
   * Wisdom database
   */
  wisdoms: {
    // General wisdom
    general: [
      "The bamboo that bends survives the storm that breaks the oak.",
      "Patience is not waiting. It's keeping a good attitude while working hard.",
      "The master knows more about what he doesn't know than the student knows about what he does.",
      "A journey of a thousand miles begins with a single step.",
      "When you tone down your ego, your vibration goes up.",
      "The wise man knows he knows nothing. The fool thinks he knows everything.",
      "What you think, you become. What you feel, you attract.",
      "The obstacle is the path.",
      "Nature does not hurry, yet everything is accomplished."
    ],
    
    // Morning wisdom
    morning: [
      "Each morning brings new potential, but if you dwell on the misfortunes of the day before, you tend to overlook tremendous opportunities.",
      "The way you start your day sets the tone for the entire journey.",
      "Morning is the face of productivity. What will you build today?",
      "The sun does not shine for a few trees and flowers, but for the wide world's joy.",
      "Early to bed and early to rise makes a man healthy, wealthy, and wise.",
      "Today is a new page. Write a beautiful story."
    ],
    
    // Evening wisdom
    evening: [
      "Reflect on your day. What did you learn? What can you improve?",
      "The evening concludes what the morning began.",
      "Rest is not idleness. It is the key to renewal.",
      "Tomorrow's success is built on tonight's reflection.",
      "Let go of today's troubles and prepare for tomorrow's opportunities.",
      "In the silence of evening, wisdom speaks."
    ],
    
    // Comfort (when sad)
    comfort: [
      "This too shall pass. The darkest night gives way to dawn.",
      "Your pain is a teacher you didn't ask for, but one you needed.",
      "The broken vessel holds more light than the whole one. Your cracks let wisdom in.",
      "Even the mighty oak was once a small acorn that endured the storm.",
      "Crying is not weakness. It's the rain that clears the sky for sunshine.",
      "You are stronger than you think. You've already survived 100% of your worst days."
    ],
    
    // Clarity (when confused)
    clarity: [
      "When you don't know where to go, sit still. The answer comes to those who wait.",
      "The fog cannot last forever. The sun always breaks through.",
      "Sometimes you need to lose your way to find yourself.",
      "Clarity comes from action, not thinking. Take one step and the next will appear.",
      "The迷路 (lost) path is not wrong. It's just longer.",
      "In the middle of difficulty lies opportunity."
    ],
    
    // Resilience (when failed)
    resilience: [
      "Failure is not falling. It's staying down that you refuse.",
      "The difference between try and triumph is a little umph.",
      "Winners are not those who never fail, but those who never quit.",
      "Every master was once a disaster. Every expert was once a beginner.",
      "Your setback is just a setup for a comeback.",
      "The phoenix rises from its own ashes. So will you."
    ],
    
    // Humbling (when successful)
    humbling: [
      "Success is temporary. Your character is permanent.",
      "The higher you climb, the more you should remember those who lifted you.",
      "Pride goes before the fall. Stay humble.",
      "What you have others need. What you know others don't. Share.",
      "The greatest victories come after the hardest battles.",
      "A truly wise man makes his own decisions but stands on the shoulders of giants."
    ],
    
    // Peace (when stressed)
    peace: [
      "Breathe. It sounds simple, but it's the foundation of everything.",
      "You cannot control the wind, but you can adjust your sails.",
      "Let go of what you cannot change. Focus on what you can.",
      "Still waters run deep. In silence, find your strength.",
      "Worry is a misuse of imagination.",
      "The present moment is all you have. Be here now."
    ],
    
    // Love
    love: [
      "Love is not possession. It is appreciation.",
      "The best relationships are between two people who are alone together.",
      "To be loved, be lovable. To be valued, be valuable.",
      "Love is not about how many days, but how many moments.",
      "The heart sees what is invisible to the eye.",
      "True love is not about perfection. It's about seeing past the flaws."
    ],
    
    // Work
    work: [
      "The master carpenter doesn't blame his tools. He sharpens them.",
      "Work is worship. Do it with all your heart.",
      "Skill is what you do when you can't blame anyone else.",
      "Success is the residue of planning.",
      "The only way to do great work is to love what you do.",
      "Your network is your net worth. Build both."
    ],
    
    // Coding
    coding: [
      "The best code is no code at all. Complexity is the enemy.",
      "Debug like a detective. Code like a poet.",
      "First make it work. Then make it pretty. Then make it fast.",
      "Comments explain why, not what. The what is in the code.",
      "A junior developer writes code for the machine. A senior developer writes for humans.",
      "The bug you can't find is the one that seems correct."
    ],
    
    // Philosophy
    philosophy: [
      "I think, therefore I am. But I am more than what I think.",
      "The unexamined life is not worth living.",
      "Be the change you wish to see in the world.",
      "We are what we repeatedly do. Excellence is a habit.",
      "The journey matters more than the destination.",
      "Know thyself. The greatest wisdom begins there."
    ],
    
    // Quick quotes
    quote: [
      "Be the light.",
      "Flow like water.",
      "One step at a time.",
      "Trust the process.",
      "Stay humble.",
      "Never stop learning.",
      "Dream big.",
      "Start now."
    ]
  },
  
  /**
   * Command handler
   */
  onCommand: function(cmd, args) {
    var allArgs = args.join(' ');
    var type = 'general';
    var context = null;
    
    switch(cmd) {
      case 'morning':
        type = 'morning';
        break;
      case 'evening':
        type = 'evening';
        break;
      case 'philosophy':
      case 'quote':
        type = 'quote';
        break;
      case 'advice':
        type = 'general';
        break;
      case 'for':
        // Context like /mentor for work
        type = 'general';
        context = args.slice(1).join(' ');
        break;
      default:
        // Check if it's a situation like "I'm sad"
        if (allArgs.includes("I'm ") || allArgs.includes('i ') || allArgs.includes('feeling')) {
          context = allArgs;
        }
    }
    
    var wisdom = this.getWisdom(type, context);
    
    return {
      success: true,
      wisdom: wisdom,
      type: type,
      context: context,
      time: new Date().toLocaleTimeString()
    };
  },
  
  /**
   * Get help
   */
  getHelp: function() {
    return `
🌟 Kingbit Mentor Commands:

/mentor                  Random wisdom
/mentor morning         Morning motivation
/mentor evening         Evening reflection
/mentor philosophy      Deep thoughts
/mentor quote           Quick quote
/mentor for work        Career advice
/mentor for life        Life guidance
/mentor for coding     Developer wisdom
/mentor for love        Relationship advice
/mentor I'm sad        Comforting words
/mentor I'm confused   Clarity advice
`;
  }
};

module.exports = KingbitMentor;