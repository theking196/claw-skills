/**
 * Kingbit Clone PRO - Skill Index
 */

var KingbitClonePro = {
  name: 'kingbit-cloner-pro',
  fullName: 'Kingbit Clone PRO',
  description: 'Full website cloning - download all CSS, JS, images and bundle into single HTML',
  version: '2.0.0',
  author: 'Kingbit',
  category: 'utilities',
  tags: ['clone', 'scrape', 'web', 'full', 'bundle', 'download'],
  requires: ['http', 'browser'],
  
  controller: require('./clone.js'),
  
  onLoad: function() {
    console.log('🕷️ Kingbit Clone PRO loaded');
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
        '/clone <url> --full - Full clone all assets',
        '/clone bundle - Create zip bundle',
        '/clone deploy - Deploy to web',
        '/clone help - Show help'
      ]
    };
  },
  
  onUnload: function() {
    return { success: true };
  }
};

module.exports = KingbitClonePro;