export const trackUserActivity = (onInactive) => {
    let timeout;
  
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(onInactive, 10 * 60 * 1000); // 10 minutes of inactivity
      console.log('User Active: 10 min')
    };
  
    const events = [ 'keydown', 'click'];
  
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
      console.log('User Active')
    });
  
    resetTimer(); // Start the timer initially
  
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeout);
    };
  };
  