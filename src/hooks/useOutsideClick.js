import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  /// listenCapturing = true means we are listening on the capturing phase
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // Here  the ref.currnt is the modal window
          // Here ref.current is the DOM element and on the DOM elements we can call the contains() method and e.target is simply where the element click happens
          // !ref.current.contains(e.target) => this line means that if it does not contain the element that was clicked then close the modal
          console.log("Click outside");
          handler(); // This is closing the modal
        }
      }

      /* whenever i click on the "Add new cabin" method then the Modal window will be attached to the DOM and also this Modal window will become direct child to the <body> element
      So if i click on the "Add new cabin" button then this "click" event will be bubble up all the way through the DOM until it also reaches the modal window and so then the 
      click is basically detected outside the modal window which will immediately close that window again. So again reiterating , when we click on the modal window then it is basically
      opened for a milli second  but then it immediately detects a click outside of it and so then it will immediately closes again and the way we fix this problem is , we will not
      listen this click event on the bubbling phase but we will listen this click event on the capturing phase . So basically as the event moves down the DOM tree and not up the DOM
      tree . So we can change this default behaviour  by passing a third argument by simply setting it to true . So if we set true here in the third argument then the event will
      be handled in the capturing phase as the event moves down the tree */

      document.addEventListener("click", handleClick, listenCapturing); // If we set true here then the event will be handled in the capturing phase but
      // by default the event will be handled in the bubbling phase.

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
