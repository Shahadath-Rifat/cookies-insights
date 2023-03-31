'use strict';



// Get the dialog elements
const cookiesDialog = document.getElementById('cookies-dialog');
const cookieSettingsDialog = document.getElementById('cookie-settings-dialog');

// Check if cookies are enabled and if any cookies are stored
const cookiesEnabled = navigator.cookieEnabled;
const hasCookies = document.cookie.length > 0;

// Check if we need to show the cookies dialog
if (!cookiesEnabled || !hasCookies) {
  setTimeout(() => cookiesDialog.showModal(), 1000); // Delay for 1 second
}

// Get device height and width
const deviceHeight = screen.height;
const deviceWidth = screen.width;

// Get browser name and version
function getBrowserNameAndVersion() {
  const userAgent = navigator.userAgent;
  const opera = userAgent.indexOf('OPR/') >= 0;
  const edge = userAgent.indexOf('Edge/') >= 0;
  const chrome = userAgent.indexOf('Chrome/') >= 0 && !edge && !opera;
  const firefox = userAgent.indexOf('Firefox/') >= 0;
  const safari = userAgent.indexOf('Safari/') >= 0 && !chrome && !edge && !opera;

  if (opera) return 'Opera';
  if (edge) return 'Microsoft Edge';
  if (chrome) return 'Google Chrome';
  if (firefox) return 'Mozilla Firefox';
  if (safari) return 'Apple Safari';

  return 'Unknown';
}
const browserName = getBrowserNameAndVersion();

// Get OS name
function getOsName() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const mac = /Mac/.test(platform);
  const windows = /Win/.test(platform);
  const ios = /iPhone/.test(userAgent) || /iPad/.test(userAgent) || /iPod/.test(userAgent);
  const android = /Android/.test(userAgent);

  if (mac) return 'Mac OS';
  if (windows) return 'Windows';
  if (ios) return 'iOS';
  if (android) return 'Android';

  return 'Unknown';
}
const osName = getOsName();

// Handle accept all button
document.getElementById('accept-all').addEventListener('click', () => {
  setCookie('analytics', true, 30);
  setCookie('marketing', true, 30);
  setCookie('preferences', true, 30);
  setCookie('deviceHeight', deviceHeight, 30);
  setCookie('deviceWidth', deviceWidth, 30);
  setCookie('browserName', browserName, 30);
  setCookie('osName', osName, 30);

  cookiesDialog.close();
});

// Handle settings button
document.getElementById('settings').addEventListener('click', () => {
  cookieSettingsDialog.showModal();
});

// Handle save settings button
document.getElementById('save-settings').addEventListener('click', () => {
  const analyticsCheckbox = document.getElementById('analytics-cookie');
  const marketingCheckbox = document.getElementById('marketing-cookie');
  const preferencesCheckbox = document.getElementById('preferences-cookie');

  setCookie('analytics', analyticsCheckbox.checked, 30);
  setCookie('marketing', marketingCheckbox.checked, 30);
  setCookie('preferences', preferencesCheckbox.checked, 30);
  setCookie('deviceHeight', deviceHeight, 30);
  setCookie('deviceWidth', deviceWidth, 30);
  setCookie('browserName', browserName, 30);
  setCookie('osName', osName, 30);

  cookieSettingsDialog.close();
});

// Helper function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Helper function to get a cookie
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

setCookie('analytics', true, 15/86400); // 15 seconds
setCookie('marketing', true, 15/86400);
setCookie('preferences', true, 15/86400);

// Handle clicking outside the dialog box to close it
cookiesDialog.addEventListener('click', (event) => {
    if (event.target === cookiesDialog) {
      cookiesDialog.close();
    }
  });
  
  cookieSettingsDialog.addEventListener('click', (event) => {
    if (event.target === cookieSettingsDialog) {
      cookieSettingsDialog.close();
    }
  });