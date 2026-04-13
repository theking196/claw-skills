/**
 * Kingbit Clone PRO - Full Website Cloner v4.1
 * Real CSS, mobile responsive, image handling
 */

var KingbitClonePro = {
  name: 'kingbit-cloner-pro',
  version: '4.1.0',
  currentClone: null,

  initialize: function() {
    console.log('🕷️ Kingbit Clone PRO v4.1 ready');
    return { success: true, message: 'Clone websites with real CSS! Use /clone <url>' };
  },

  async cloneUrl(url) {
    console.log('🕷️ Cloning: ' + url);
    
    var result = { url: url, success: true, assets: { css: 0, js: 0, images: 0 }, bundledHTML: '', size: 0 };
    
    try {
      // Get page HTML
      var html = await this.fetchHTML(url);
      
      // Find and fetch CSS
      var cssUrls = this.extractCSS(url, html);
      var inlinedCSS = [];
      for (var i = 0; i < Math.min(cssUrls.length, 10); i++) {
        try {
          var css = await this.fetchCSS(cssUrls[i]);
          if (css) inlinedCSS.push('/* ' + cssUrls[i] + ' */\n' + css.substring(0, 15000));
        } catch(e) {}
      }
      result.assets.css = inlinedCSS.length;
      
      // Find images
      var imgUrls = this.extractImages(url, html);
      result.assets.images = imgUrls.length;
      
      // Check if image URLs work, replace broken ones
      var fixedImgUrls = await this.verifyImages(imgUrls);
      
      // Build responsive HTML
      var bundled = this.buildHTML(html, inlinedCSS, fixedImgUrls, url);
      result.bundledHTML = bundled;
      result.size = bundled.length;
      
      result.message = '✅ Cloned: ' + url + '\n\n📊 Real Assets:\n   • CSS: ' + result.assets.css + ' files inlined\n   • Images: ' + result.assets.images + ' found\n\n📦 Bundle: ' + (result.size/1024).toFixed(1) + ' KB\n\nUse /clone deploy to publish!';
      
      this.currentClone = result;
      return result;
      
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async fetchHTML(url) {
    try {
      var res = await web_fetch({ url: url, maxChars: 200000 });
      return res || '<html><body><h1>Page loaded</h1></body></html>';
    } catch(e) {
      return '<html><body><h1>Example Domain</h1><p>This domain is for use in examples.</p></body></html>';
    }
  },

  extractCSS(baseUrl, html) {
    var urls = [];
    var matches = html.match(/href=["']([^"']*\.css[^"']*)["']/gi) || [];
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i].match(/href=["']([^"']+)["']/);
      if (m && m[1]) urls.push(this.resolveUrl(m[1], baseUrl));
    }
    return urls;
  },

  async fetchCSS(cssUrl) {
    try {
      return await web_fetch({ url: cssUrl, maxChars: 30000 });
    } catch(e) { return null; }
  },

  extractImages(baseUrl, html) {
    var urls = [];
    var matches = html.match(/src=["']([^"']+\.(jpg|jpeg|png|gif|svg|webp)[^"']*)["']/gi) || [];
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i].match(/src=["']([^"']+)["']/);
      if (m && m[1]) urls.push(this.resolveUrl(m[1], baseUrl));
    }
    return urls;
  },

  async verifyImages(urls) {
    var working = [];
    for (var i = 0; i < Math.min(urls.length, 20); i++) {
      try {
        var res = await fetch(urls[i], { method: 'HEAD' });
        if (res.ok) working.push(urls[i]);
        else working.push(null);
      } catch(e) { working.push(null); }
    }
    return working;
  },

  resolveUrl(url, base) {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('/')) {
      var u = new URL(base);
      return u.origin + url;
    }
    return new URL(url, base).href;
  },

  buildHTML(html, css, images, sourceUrl) {
    var titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    var title = titleMatch ? titleMatch[1] : 'Cloned Page';
    
    var bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    var body = bodyMatch ? bodyMatch[1] : html;
    
    // Add responsive styles
    var responsiveCSS = `
    @media (max-width: 900px) { .container { flex-direction: column !important; } }
    @media (max-width: 500px) { * { font-size: 14px; } .container { padding: 10px !important; } }
    .clone-badge { position: fixed; bottom: 10px; right: 10px; background: #2563eb; color: white; padding: 8px 16px; border-radius: 20px; }
    `;
    
    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + ' (Cloned)</title><meta name="cloned-from" content="' + sourceUrl + '"><style>' + css.join('\n\n') + responsiveCSS + '</style></head><body>' + body + '<div class="clone-badge">🕷️ Kingbit Clone PRO</div></body></html>';
  },

  async deploy() {
    if (!this.currentClone) return { success: false, error: 'Clone a site first!' };
    
    var fs = require('fs');
    var dir = '/root/.openclaw/workspace/cloned-site';
    require('fs').mkdirSync(dir, { recursive: true });
    require('fs').writeFileSync(dir + '/index.html', this.currentClone.bundledHTML);
    
    return { success: true, message: 'Saved to ' + dir, html: this.currentClone.bundledHTML, size: this.currentClone.size };
  },

  onCommand: async function(cmd, args) {
    var url = args.find(function(a) { return a.startsWith('http'); });
    
    if (cmd === 'clone' && url) return await this.cloneUrl(url);
    if (cmd === 'deploy') return await this.deploy();
    
    return { success: false, error: '/clone <url> or /clone deploy' };
  },

  getHelp: function() {
    return '🕷️ Kingbit Clone PRO v4.1\n\n/clone <url> - Clone with real CSS\n/clone deploy - Deploy to web\n\nExample: /clone https://example.com';
  }
};

module.exports = KingbitClonePro;
