chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('forms/mainForm.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});
