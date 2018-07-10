chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('forms/mainForm.html', {
    'outerBounds': {
      'width': screen.availWidth,
      'height': screen.availHeight
    }
  });
});
