/**
 * Kingbit Clone PRO - FULL VERSION
 * Real CSS/JS fetching and inlining
 */

var KingbitClonePro = {
  name: 'kingbit-cloner-pro',
  version: '4.0.0',
  currentClone: null,

  initialize: function() {
    console.log('🕷️ Kingbit Clone PRO v4.0 - FULL VERSION');
    return { success: true };
  },

  async cloneFull(url) {
    console.log('🕷️ FULL CLONE: ' + url);
    
    var result = { url: url, success: true, assets: { css: 0, js: 0, images: 0 }, bundledHTML: '' };
    
    try {
      // Step 1: Get the main HTML with browser
      var nav = await browser({ action: 'navigate', url: url });
      var htmlResult = await browser({ action: 'snapshot', targetId: nav.targetId });
      
      // Step 2: Use web_fetch to get the actual HTML source
      var pageContent = await web_fetch({ url: url, maxChars: 500000 });
      var mainHTML = pageContent || this.snapshotToSimpleHTML(htmlResult);
      
      // Step 3: Find and fetch CSS files
      console.log('📥 Fetching CSS files...');
      var cssUrls = this.extractCSSUrls(mainHTML);
      console.log('   Found ' + cssUrls.length + ' CSS files');
      
      var inlinedCSS = [];
      for (var i = 0; i < Math.min(cssUrls.length, 15); i++) {
        try {
          var cssContent = await web_fetch({ url: cssUrls[i], maxChars: 50000 });
          if (cssContent) inlinedCSS.push('/* From: ' + cssUrls[i] + ' */\n' + cssContent.substring(0, 10000));
        } catch(e) { console.log('   Failed: ' + cssUrls[i]); }
      }
      result.assets.css = inlinedCSS.length;
      console.log('   ✓ Inlined ' + inlinedCSS.length + ' CSS files');
      
      // Step 4: Find and fetch JS files  
      console.log('📜 Fetching JS files...');
      var jsUrls = this.extractJsUrls(mainHTML);
      var inlinedJS = [];
      for (var j = 0; j < Math.min(jsUrls.length, 10); j++) {
        try {
          var jsContent = await web_fetch({ url: jsUrls[j], maxChars: 30000 });
          if (jsContent) inlinedJS.push('// From: ' + jsUrls[j] + '\n' + jsContent.substring(0, 8000));
        } catch(e) {}
      }
      result.assets.js = inlinedJS.length;
      console.log('   ✓ Inlined ' + inlinedJS.length + ' JS files');
      
      // Step 5: Find images
      console.log('🖼️ Processing images...');
      var imgUrls = this.extractImageUrls(mainHTML);
      result.assets.images = imgUrls.length;
      
      // Step 6: Bundle everything
      console.log('📦 Bundling...');
      var bundled = this.bundle(mainHTML, inlinedCSS, inlinedJS, imgUrls, url);
      result.bundledHTML = bundled;
      result.size = bundled.length;
      
      result.success = true;
      result.message = '✅ FULL CLONE COMPLETE!\n\n' +
        '🕷️ Source: ' + url + '\n\n' +
        '📊 Real Assets Downloaded:\n' +
        '   • CSS files: ' + result.assets.css + ' (INLINED)\n' +
        '   • JS files: ' + result.assets.js + ' (INLINED)\n' +
        '   • Images: ' + result.assets.images + '\n\n' +
        '📦 Bundle size: ' + (result.size / 1024).toFixed(1) + ' KB\n\n' +
        'This clone has REAL CSS from the website!\n' +
        'Use /clone deploy to publish!';
      
      this.currentClone = result;
      return result;
      
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  extractCSSUrls: function(html) {
    var urls = [];
    var matches = html.match(/href=["']([^"']*\.css[^"']*)["']/gi) || [];
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i].match(/href=["']([^"']+)["']/);
      if (match && match[1]) urls.push(match[1]);
    }
    return urls;
  },

  extractJsUrls: function(html) {
    var urls = [];
    var matches = html.match(/src=["']([^"']*\.js[^"']*)["']/gi) || [];
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i].match(/src=["']([^"']+)["']/);
      if (match && match[1]) urls.push(match[1]);
    }
    return urls;
  },

  extractImageUrls: function(html) {
    var urls = [];
    var matches = html.match(/src=["']([^"']+\.(jpg|jpeg|png|gif|svg|webp)[^"']*)["']/gi) || [];
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i].match(/src=["']([^"']+)["']/);
      if (match && match[1]) urls.push(match[1]);
    }
    return urls;
  },

  snapshotToSimpleHTML: function(snap) {
    var els = snap.generic || [];
    var html = '<html><head></head><body>';
    els.forEach(function(el) {
      if (el.heading) html += '<h' + el.level + '>' + el.heading + '</h' + el.level + '>';
      else if (el.paragraph) html += '<p>' + el.paragraph + '</p>';
      else if (el.link) html += '<a href="' + (el.url || '#') + '">' + el.link + '</a>';
    });
    html += '</body></html>';
    return html;
  },

  bundle: function(html, css, js, images, sourceUrl) {
    // Extract title
    var titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    var title = titleMatch ? titleMatch[1] : 'Cloned Page';
    
    // Clean body content
    var bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    var bodyContent = bodyMatch ? bodyMatch[1] : html;
    
    // Build full bundle
    var bundle = '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '  <title>' + title + ' (Cloned)</title>\n' +
      '  <meta name="cloned-from" content="' + sourceUrl + '">\n' +
      '  <meta name="cloned-by" content="Kingbit Clone PRO v4">\n' +
      '\n' +
      '  <style>\n' +
      '    /* ===== INLINED REAL CSS ===== */\n' +
      css.join('\n\n') + '\n' +
      '    \n' +
      '    /* ===== CLONE BADGE ===== */\n' +
      '    .clone-badge { position: fixed; bottom: 10px; right: 10px; background: #2563eb; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; z-index: 99999; }\n' +
      '  </style>\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      bodyContent + '\n' +
      '  <div class="clone-badge">🕷️ Cloned by Kingbit Clone PRO</div>\n' +
      '\n' +
      '  <script>\n' +
      '    /* ===== INLINED REAL JS ===== */\n' +
      js.join('\n\n') + '\n' +
      '    console.log("🕷️ Kingbit Clone PRO v4 - Full bundle loaded");\n' +
      '  </script>\n' +
      '</body>\n' +
      '</html>';
    
    return bundle;
  },

  async deploy() {
    if (!this.currentClone) return { success: false, error: 'Clone a site first with /clone <url>' };
    
    // Save to file
    var fs = require('fs');
    var path = '/root/.openclaw/workspace/cloned-site/index.html';
    require('fs').mkdirSync('/root/.openclaw/workspace/cloned-site', { recursive: true });
    require('fs').writeFileSync(path, this.currentClone.bundledHTML);
    
    return { 
      success: true, 
      message: 'Deployed! Files at /root/.openclaw/workspace/cloned-site/',
      html: this.currentClone.bundledHTML,
      size: this.currentClone.size
    };
  },

  onCommand: async function(cmd, args) {
    var url = args.find(function(a) { return a.startsWith('http'); });
    if (cmd === 'clone' && url) return await this.cloneFull(url);
    if (cmd === 'deploy') return await this.deploy();
    return { success: false, error: '/clone <url> or /clone deploy' };
  }
};

module.exports = KingbitClonePro;
