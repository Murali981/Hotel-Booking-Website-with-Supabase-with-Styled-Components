import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          {/* The above Modal.Open is for opening the Modal . To this <Modal.Open> component we want the user of this component to be able to pass in the  button itself
           We can also make .Open also a button but we will loose a bit of flexibility of the component . So we will allow the user to pass whatever the button they want.
           So in below the user is passing a primary button with "Add new cabin" as a children to it . So here we no need any state inside the <AddCabin /> component and
           instead we will keep that state  (whether the window is open (or) not)  right inside the <Modal></Modal> component  
           In the below we have another Button to open and also another window . So we want the user of the modal component to be able to do this . So basically we are having multiple 
        windows . However only one of them can open at the same time . So therefore each of these buttons should need to know which window it should actually open . So therefore we 
        are passing a props called opens . In the opens prop of above we are passing the "cabin-form" as a prop . And also we have to keep track of which modal is currently
        open . So we will implement a state inside the modal component to keep track of which modal to open*/}
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {/* Inside the <Modal.Window>{content}</Modal.Window> we are placing the content 
           We are giving "cabin-form" as a name prop to the Modal.Window*/}
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
          <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add a new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//           {/* We are passing the CreateCabinForm as children as a prop to the Modal component which is the parent component */}
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
