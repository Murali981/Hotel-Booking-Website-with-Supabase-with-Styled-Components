import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/* Why it is necessary to convert a Modal component to a Compound component ?
 
  The above Modal is not ideal for state management and to the way that we actually render this modal . We rendered the above Modal component based on isOpenModal state
  Now the problem with this isOpenModal state is , We really don't want  the component which uses  the modal to be responsible for creating this piece of state and to keep
  track of whether the modal is  open (or) not. So again it shouldn't be the <AddCabin /> component to keep track of whether right now the modal is displayed (or) not...
  So instead the modal component itself should actually  know whether it is currently open (or) not...So it should keep this state internally . So this <Modal /> component
  should track this basically encapsulated inside the component and then the component should give us simply a way  to open the modal and also a way to pass in the content that
  we want to actually display inside the modal . So basically we want some button to open the modal and we want the window itself . So these two components together should form
  the modal component . This is where the compound component pattern comes into the picture. So in the below we have implemented the whole <Modal /> component into a compound 
  component

*/
// Converting the below Modal component to a Compound component and to convert a component to a Compound component , we have to follow the
// below 4 steps

// Step 1 : Create a new context
const ModalContext = createContext();

// Step 2 : Create a Parent component and in our application parent component is the Modal component
function Modal({ children }) {
  // We are passing children prop to the Modal component such that it can display windows and the opens
  const [openName, setOpenName] = useState(""); // Here we are keeping track of which window is open

  const close = () => setOpenName(""); // So closing a Modal (or) Modal window is as easy as setting up the setOpenName() back to empty string ("")
  const open = setOpenName; // Opening a window is setting the setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {/* Here the children is "Add new cabin" */}
      {children}
    </ModalContext.Provider>
  );
}

/*  All the state and state updating functions are in the parent component function Modal()  and then we pass with that with a context as value={{openName , close , open}} */

function Open({ children, opens: opensWindowName }) {
  // Here the <Modal.Open>{children}</Modal.Open> is a child component for the parent component <Modal>
  // The above Open accepts the children and as well as the opens prop
  const { open } = useContext(ModalContext); // In this Open component we will need access to the open function from the context.

  return cloneElement(children, { onClick: () => open(opensWindowName) });
  // We want to add a open event handler function to the <Button>Add new cabin</button> and here Button is the children to the <Modal.Open><button>Add new cabin</button></Modal.Open>
  // To the children prop of <Modal.Open> (or) open how can we add the open event handler function , So we can add a open event handler function to the <button> is by using a
  // pretty react advanced function which is cloneElement .
  // Here cloneElement is a pretty advanced react function . So using the cloneElement() advanced react function we will create a new version of the children but with new
  // props . So these new props will contain the "onClick" prop and this onClick prop will become a function that actually opens a modal window . So this onClick will call
  // open with opens prop and the opens prop is open the window with this name which is "opensWindowName" and the prop the openWindowName contains is "cabin-form" which is
  // passed in the <Modal.Open opens="cabin-form"> and now on the <Modal.Window> we need to check which is the currently open window and if it is same as the name "cabin-form" then
  // we want to render it's content
}

function Window({ children, name }) {
  // Here the <Modal.Window>{children}</Modal.Window> is a child component for the parent component <Modal> and also we are passing the context from the parent component
  // <Modal></Modal> to achieve the goal of displaying the window size
  const { openName, close } = useContext(ModalContext); // We are getting the openName and close from the context

  const ref = useOutsideClick(close); // This useOutsideClick custom hook will return the ref and that ref will be stored in this ref

  if (name !== openName) {
    // if the name is different from openName which we are getting form the above context then don't return anything
    return null;
  }

  // But if the name is equal to the openName then we will return the below createPortal()

  return createPortal(
    // Here createPortal() is not part of the react but it is a part of react DOM and also this makes sense because we are placing some JSX in the DOM and this
    // createPortal() receives the first argument as JSX to render , in the below first argument JSX is <overlay>.......</overlay> which we want to render and the second
    // argument a DOM node that tells where we want to render this JSX . So we are putting "document.body" as the second argument. And now what happens is , our Modal window
    // will become direct child element to the <body> element and the reason for writing the "document.body" in the second argument is , We have selected the body element to be
    // the parent element of whatever we want to render and now this modal window will essentially live completely outside of the DOM structure of the application itself which
    // lives right inside the root div (<div id="root"></div>) . And also what was the nice about this React portal is , Inside the component tree the modal window is still at the
    // same exact place and that's why we can still pass props to it , If you see in the component tree the modal window is still a child element to the <AddCabin /> component But in
    // the DOM it is no longer the child element to the <AddCabin /> component . React portal is basically a portal because it allows us to create an invisible tunnel like a portal from
    // the place where the  component is in the component tree to another place in the DOM tree. But now we might be wondering what's the use of using a React portal here is to
    // avoid conflicts with the CSS property overflow set to hidden . So many times we built a component like Modal and it just works fine but then some other developer will reuse it
    // somewhere else and that somewhere else might be a place where the modal will get cutoff by a overflow hidden set on the parent. So this is basically all about reusability and
    // making sure that the component will never be cut off by an overflow property set to hidden on some parent element. So inorder to avoid this kind of situation , We simply render
    // the modal completely outside of the rest of the DOM tree. So basically on the top of the DOM tree.
    <Overlay>
      <StyledModal ref={ref}>
        {/*  here the ref is refering to the Modal window which we want to do some DOM manipulations like getting the reference to the Modal Window DOM element
         to apply the close functions by detecting the click outside the Modal window (or) inside the Modal window */}
        <Button onClick={close}>
          {/* In the above we are getting the close from the context */}
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* In the above also we are cloning the element by passing the children and  props and in this name of the prop is called "onCloseModal" and
         we are setting the onCloseModal to close() function */}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4.) This is the final step
Modal.Open = Open; // We are placing these Open and Window properties on the Modal
Modal.Window = Window;

export default Modal;
