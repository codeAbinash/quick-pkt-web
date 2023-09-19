async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = navigator.serviceWorker.register('sw.js');
      console.log('Service Worker Registered');
    } catch (error) {
      console.warn('Error Registering Service Worker');
      console.log(error);
    }
  } else console.log('Service worker is not available for this device');
}
// registerSW();

function absorbEvent_(event) {
  var e = event || window.event;
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

window.addEventListener('load', () => {
  document.body.addEventListener('contextmenu', absorbEvent_);
});

// onLinkNavigate(async ({ toPath, fromPath, isBack }) => {
//   console.log('Navigating from', fromPath, 'to', toPath, 'isBack', isBack);
//   if (isBack) {
//     console.log('Back Navigation');
//   }
// });

// function isBackNavigation(navigateEvent) {
//   if (navigateEvent.navigationType === 'push' || navigateEvent.navigationType === 'replace') {
//     return false;
//   }
//   if (navigateEvent.destination.index !== -1 && navigateEvent.destination.index < navigation.currentEntry.index) {
//     return true;
//   }
//   return false;
// }

// async function onLinkNavigate(callback) {
//   navigation.addEventListener('navigate', (event) => {
//     const toUrl = new URL(event.destination.url);

//     if (location.origin !== toUrl.origin) return;

//     const fromPath = location.pathname;
//     const isBack = isBackNavigation(event);
//     event.preventDefault();
//     event.intercept({
//       async handler() {
//         if (event.info === 'ignore') return;

//         await callback({
//           toPath: toUrl.pathname,
//           fromPath,
//           isBack,
//         });
//       },
//     });
//   });
// }
