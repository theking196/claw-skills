/**
 * Kingbit Clone - Skill Index
 */

var KingbitClone = {
  name: 'kingbit-cloner',
  fullName: 'Kingbit Clone',
  description: 'Clone websites and create deployable HTML/CSS/JS templates',
  version: '1.0.0',
  author: 'Kingbit',
  category: 'utilities',
  tags: ['clone', 'web', 'template', 'html', 'deploy'],
  requires: ['http'],
  
  controller: require('./clone.js'),
  
  onLoad: function() {
    console.log('🎯 Kingbit Clone loaded');
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
        '/clone <url> - Clone website',
        '/clone create - Create template',
        '/clone deploy - Deploy template',
        '/clone help - Show help'
      ]
    };
  },
  
  onUnload: function() {
    return { success: true };
  }
};

module.exports = KingbitClone;