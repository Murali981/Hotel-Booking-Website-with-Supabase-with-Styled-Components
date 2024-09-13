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

// Converting the below Modal component to a Compound component and to convert a component to a Compound component , we have to follow the
// below 4 steps

// Step 1 : Create a new context
const ModalContext = createContext();

// Step 2 : Create a Parent component and in our application parent component is the Modal component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) {
    return null;
  }

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
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4.) This is the final step
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
