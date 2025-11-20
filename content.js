// Content script for URL Collector extension

(function() {
  'use strict';
  
  // Prevent multiple injections
  if (window.urlCollectorInjected) {
    return;
  }
  window.urlCollectorInjected = true;
  
  let isCollectionMode = false;
  let hoveredElement = null;
  let highlightOverlay = null;
  let tooltipOverlay = null;
  
  // Create overlay elements
  function createOverlays() {
    // Highlight overlay
    highlightOverlay = document.createElement('div');
    highlightOverlay.id = 'url-collector-highlight';
    highlightOverlay.style.cssText = `
      position: absolute;
      pointer-events: none;
      border: 2px solid #4285F4;
      background: rgba(66, 133, 244, 0.1);
      z-index: 2147483646;
      display: none;
      transition: all 0.1s ease;
    `;
    document.body.appendChild(highlightOverlay);
    
    // Tooltip overlay
    tooltipOverlay = document.createElement('div');
    tooltipOverlay.id = 'url-collector-tooltip';
    tooltipOverlay.style.cssText = `
      position: absolute;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      z-index: 2147483647;
      display: none;
      max-width: 400px;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
    document.body.appendChild(tooltipOverlay);
  }
  
  // Remove overlay elements
  function removeOverlays() {
    if (highlightOverlay) {
      highlightOverlay.remove();
      highlightOverlay = null;
    }
    if (tooltipOverlay) {
      tooltipOverlay.remove();
      tooltipOverlay = null;
    }
  }
  
  // Find closest anchor element
  function findClosestAnchor(element) {
    let current = element;
    while (current && current !== document.body) {
      if (current.tagName === 'A' && current.href) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  
  // Update highlight position
  function updateHighlight(element) {
    if (!highlightOverlay || !element) return;
    
    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    highlightOverlay.style.left = (rect.left + scrollX) + 'px';
    highlightOverlay.style.top = (rect.top + scrollY) + 'px';
    highlightOverlay.style.width = rect.width + 'px';
    highlightOverlay.style.height = rect.height + 'px';
    highlightOverlay.style.display = 'block';
  }
  
  // Update tooltip position
  function updateTooltip(element, url) {
    if (!tooltipOverlay || !element) return;
    
    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    tooltipOverlay.textContent = url;
    tooltipOverlay.style.display = 'block';
    
    // Position tooltip above the element
    let left = rect.left + scrollX;
    let top = rect.top + scrollY - tooltipOverlay.offsetHeight - 8;
    
    // Adjust if tooltip goes off screen
    if (top < scrollY) {
      top = rect.bottom + scrollY + 8;
    }
    
    if (left + tooltipOverlay.offsetWidth > window.innerWidth + scrollX) {
      left = window.innerWidth + scrollX - tooltipOverlay.offsetWidth - 10;
    }
    
    tooltipOverlay.style.left = left + 'px';
    tooltipOverlay.style.top = top + 'px';
  }
  
  // Hide overlays
  function hideOverlays() {
    if (highlightOverlay) {
      highlightOverlay.style.display = 'none';
    }
    if (tooltipOverlay) {
      tooltipOverlay.style.display = 'none';
    }
  }
  
  // Show click animation
  function showClickAnimation(element) {
    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: absolute;
      left: ${rect.left + scrollX}px;
      top: ${rect.top + scrollY}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      background: rgba(66, 133, 244, 0.4);
      border: 2px solid #4285F4;
      z-index: 2147483645;
      pointer-events: none;
      animation: url-collector-flash 0.5s ease;
    `;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('url-collector-animation-style')) {
      const style = document.createElement('style');
      style.id = 'url-collector-animation-style';
      style.textContent = `
        @keyframes url-collector-flash {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.remove();
    }, 500);
  }
  
  // Mouse move handler
  function handleMouseMove(e) {
    if (!isCollectionMode) return;
    
    const anchor = findClosestAnchor(e.target);
    
    if (anchor && anchor !== hoveredElement) {
      hoveredElement = anchor;
      updateHighlight(anchor);
      updateTooltip(anchor, anchor.href);
    } else if (!anchor && hoveredElement) {
      hoveredElement = null;
      hideOverlays();
    }
  }
  
  // Click handler
  function handleClick(e) {
    if (!isCollectionMode) return;
    
    const anchor = findClosestAnchor(e.target);
    
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      
      // Show click animation
      showClickAnimation(anchor);
      
      // Send URL to side panel
      chrome.runtime.sendMessage({
        type: 'URL_COLLECTED',
        url: anchor.href
      });
    }
  }
  
  // Enable collection mode
  function enableCollection() {
    if (isCollectionMode) return;
    
    isCollectionMode = true;
    createOverlays();
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('click', handleClick, true);
    
    // Add cursor style
    document.body.style.cursor = 'crosshair';
    
    // Prevent default link behavior
    const style = document.createElement('style');
    style.id = 'url-collector-style';
    style.textContent = `
      * {
        cursor: crosshair !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Disable collection mode
  function disableCollection() {
    if (!isCollectionMode) return;
    
    isCollectionMode = false;
    hoveredElement = null;
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('click', handleClick, true);
    
    // Remove overlays
    removeOverlays();
    
    // Remove cursor style
    document.body.style.cursor = '';
    
    // Remove style element
    const style = document.getElementById('url-collector-style');
    if (style) {
      style.remove();
    }
  }
  
  // Listen for messages from side panel and background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'ENABLE_COLLECTION') {
      enableCollection();
      sendResponse({ success: true });
    } else if (message.type === 'DISABLE_COLLECTION') {
      disableCollection();
      sendResponse({ success: true });
    } else if (message.type === 'TOGGLE_COLLECTION') {
      if (isCollectionMode) {
        disableCollection();
      } else {
        enableCollection();
      }
      // Notify sidepanel of the new state
      chrome.runtime.sendMessage({
        type: 'COLLECTION_MODE_CHANGED',
        enabled: isCollectionMode
      });
      sendResponse({ success: true, enabled: isCollectionMode });
    }
    return true;
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    disableCollection();
  });
})();
