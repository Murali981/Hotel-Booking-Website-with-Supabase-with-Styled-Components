import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed; // This StyledList position is fixed

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) =>
    props.position
      .x}px; // The right CSS property comes from the position prop where have to pass the x coordinate of the Menu
  top: ${(props) =>
    props.position
      .y}px; // The top CSS property comes from the position prop where have to pass the y coordinate of the Menu
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext(); // We are creating a context here

function Menus({ children }) {
  const [openId, setOpenId] = useState(""); // This will keep track which id is currently opened. For keep tracking we should need a state. Initializing it to a empty
  // string means "" none of the cabin (or) id is currently opened
  const [position, setPosition] = useState(null); // To pass the position from Toggle to the Button functions below , We have to store the postion in the parent's state that's
  // why we are storing the position state in the parent's component which is Menus

  const close = () => setOpenId(""); // In this close() function we are setting the openId  to empty string("")

  const open = setOpenId; // In the open we are just setting the openId using setOpenId

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {/* In the above we are passing { openId, close, open, position, setPosition } into the context using <MenusContext.Provider>  */}
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext); // We are reading all these destructured values from the MenusContext that was created above

  function handleClick(e) {
    // Here we will decide whether to open (or) close the menu (or) the list
    const rect = e.target.closest("button").getBoundingClientRect(); // Here we want to get the closest button. Here the closest("button") will basically does some DOM
    // traversing by finding the closest button parent and on  the closest button parent we are calling another DOM function which is getBoundingClientRect() and this
    // function will give some data about the element's position
    setPosition({
      x: window.innerWidth - rect.width - rect.x, // Think about why the x coordinate position is calculated like this later
      y: rect.y + rect.height + 8, // The same thing above applies here which is , we have added 8px margin
    }); // Here we are expecting an object with x and y to the setPosition({x:,y:}) function
    // The above  position of the list  is calculated as soon as the button is clicked(Here the button is three dots(.) arranged vertically)

    openId === "" || openId !== id ? open(id) : close(); // If the openId === ""(empty) which means that there is no Id (or) If the openId , So basically if the currently
    // open menu is different from the id of this exact button that is being clicked then let's open the menu(openId !== id ? open(id) here the button is connected to menu by
    // this id) otherwise we will just close the menu (close())
  }

  return (
    // Here we want to return the <StyledToggle>
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext); // We are reading all these destructured values from the MenusContext that was created above

  const ref = useOutsideClick(close); // This is going to return a ref

  if (openId !== id) {
    // If the currently openId is different from this listId(id) then return nothing(null)
    return null;
  }

  // But if the id of the list matches the one that is currently open then we want to render the below list of buttons

  return createPortal(
    // Here we are returning a createPortal() because this element will also float on top of the UI. So in these type of cases it is a good idea to use to createPortal().
    // To the below <StyledList> we are passing the position prop
    <StyledList position={position} ref={ref}>
      {/* In the above we are attaching the ref to the <StyledList> element */}
      {children}
    </StyledList>,
    // The jsx we are passing to the createPortal() function is the <StyledList> and we are passing the {children} which are all the buttons that we have passed
    // inside the <Menus.List></Menus.List>
    document.body
    // Second argument we are passing is the document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.(); // Here we are conditionally calling the onClick by using the optional Chaining operator(?)
    close(); // Here we are calling the close() to close the menu
  }

  return (
    // We are simply returning a list item here because this Button will be inside the list and also this is an unordered list
    <li>
      {/* Inside the unordered list we have a <StyledButton> */}
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu; // This Menu is the styled component
Menus.Toggle = Toggle; // This Toggle is the function
Menus.List = List;
Menus.Button = Button;

export default Menus;
