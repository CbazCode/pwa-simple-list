export default function swDev(){

  function determineAppServerKey() {
    let vapidPublicKey = 'BL47F6hPwuH6Q5kUeqk2qVsFgs3lLjYCOw6g8iWLI9NEy6Dp0fDrkzIi3_6p1uOLI7HP-d1fXvkjNEyvv5BQsgk'
    return urlBase64ToUint8Array(vapidPublicKey)
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then(res => {
      console.log('Service Worker: Registered (Pages)')
      return res.pushManager.getSubscription()
        .then(function (subscription) {
          return res.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: determineAppServerKey()
          })
        } )
    })
    .catch(err => console.log(`Service Worker: Error: ${err}`));
}