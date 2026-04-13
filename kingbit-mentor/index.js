/**
 * Kingbit Mentor - Skill Index
 */

var KingbitMentor = {
  name: 'kingbit-mentor',
  fullName: 'Kingbit Mentor',
  description: 'Wise mentor with time-based and context-aware wisdom',
  version: '1.0.0',
  author: 'Kingbit',
  category: 'lifestyle',
  tags: ['wisdom', 'mentor', 'advice', 'motivation', 'philosophy'],
  
  controller: require('./mentor.js'),
  
  onLoad: function() {
    console.log('🌟 Kingbit Mentor loaded');
    return this.controller.initialize();
  },
  
  onMessage: function(message, context) {
    var parts = message.split(' ');
    var command = parts[0];
    var args = parts.slice(1);
    
    return this.controller.onCommand(command, args);
  },
  
  getInfo: function() {
    return {
      name: this.name,
      version: this.version,
      commands: [
        '/mentor - Get wisdom',
        '/mentor morning - Morning advice',
        '/mentor for work - Context advice',
        '/mentor help - Show help'
      ]
    };
  },
  
  onUnload: function() {
    return { success: true };
  }
};

module.exports = KingbitMentor;