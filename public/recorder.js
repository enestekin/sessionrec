(function () {
  const sessionId = Math.random().toString(36).substring(2); // Basit ID
  const events = [];

  window.addEventListener('scroll', () => {
    events.push({
      type: 'scroll',
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now(),
    });
  });

  window.addEventListener('mousemove', (e) => {
    events.push({
      type: 'mousemove',
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    });
  });

  window.addEventListener('click', (e) => {
    events.push({
      type: 'click',
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    });
  });

  window.addEventListener('beforeunload', () => {
    navigator.sendBeacon(
      'http://localhost:3000/api/record',
      JSON.stringify({
        sessionId,
        url: window.location.href,
        events,
      })
    );
  });
})();
