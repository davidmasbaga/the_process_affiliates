class VercelConsole {
    static log(message) {
      VercelConsole.sendToVercel('LOG', message);
    }
  
    static error(message) {
      VercelConsole.sendToVercel('ERROR', message);
    }
  
    static warn(message) {
      VercelConsole.sendToVercel('WARN', message);
    }
  
    static sendToVercel(type, message) {
      fetch('/api/logger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: `${type}: ${message}` }),
      });
    }
  }
  
  export default VercelConsole;
  