import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      {/* <div>
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button> */}

      <Modal>
        {/* Here Modal is the parent component */}
        {/* To build a reusable context menu , We have to wrap everything here , Which means all the cabin rows inside those menus(<Menus>) . So that these menus 
           can keep track which of the four menus and this number four will depend on how many rows are rendered onto the client web browser. Currently we have only
           two(2) cabins in our supabase database , So it has to be 2 menus according to the no of cabins that are stored in my supabase database . And again these
           menus needs to keep track of which of the four menus are actually opened at that time */}
        <Menus.Menu>
          {/* In the above we are wrapping it into a <Menus.Menu> component . Now let's think what can be inside a Menu . So a Menu as you have seen many times on the 
             Web already , is always composed of a button and so then when you click on the toggle button then a list will open and then that list will be composed of
             many buttons */}
          <Menus.Toggle id={cabinId} />
          {/* The above <Menus.Toggle> is used to open and close the menu , In the above we want to connect the toggle with the list(<Menu.List>) to know  this
            exact toggle should open up this list. Previously we have used the name and the opens prop but here let's make it more bit simple by simply using an id
            for id we are using "cabinId" which is the current cabinId that is opened . So both on the toggle(<Menu.Toggle>) and the list(<Menu.List>) we are using
            the id to connect each other. And then the parent <Menus> component will keep track of which of the menuId is currently being displayed */}

          <Menus.List id={cabinId}>
            {/* The above <Menus.List> will contain a bunch of buttons as you can see below */}
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            {/* In the above <Menu.Button> , basically each of them will be one list element of the list , And if you see below there are two more buttons 
              which are Edit , Delete */}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              {/* Why this Edit button is inside the <Modal.Open> because it actually trigger our modal window to open */}
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              {/* Why this Delete button is inside the <Modal.Open> because it actually trigger our modal window to open */}
            </Modal.Open>
          </Menus.List>
          {/* </Menus.Menu> */}
          {/* Whenever the Modal.Open opens="edit" and Modal.Window name="edit" then we have connected Modal.Open with Modal.Window */}
          {/* The below two Modal.Windows which are edit and delete are outside the <Menus.List> */}
          <Modal.Window name="edit">
            {/* Whenever the <Modal.Window> is opened we have to render the <CreateCabinForm /> , So we are wrapping the <CreateCabinForm /> inside the <Modal.Window> component */}
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)} // This is actual deleteCabin() function which will delete the Cabin from the supabase database
            />
            {/* In the above <ConfirmDelete /> component is wrapped inside the <Modal.Window> which will show a modal popped up asking us to confirm delete (or) 
             cancel it before actually deleting the cabin */}
          </Modal.Window>
        </Menus.Menu>
      </Modal>
      {/* </div> */}
    </Table.Row>
  );
}

export default CabinRow;
