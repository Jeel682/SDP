import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';
let PackagePlan1=false;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Cart({ cart, setCart, customer }) {
  const getTotalSum = () => {
    return cart.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find((item) => item.name === product.name).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const  pdfdownload = () => {
    const divToDisplay = document.getElementById('HTMLtoPDF')
    
    html2canvas((divToDisplay),{
      width : 2000,
      height : 2000 
    }).then(function(canvas) {
      let pdf = new jsPDF('p', 'mm', 'a4');
      const divImage = pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, -100);;
      //const pdf = new jsPDF();
     //pdf.addImage(divImage, 'PNG', 80, 10);
     pdf.save("download.pdf");
     
 });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Packages</h1>
      {cart.length > 0 && (
        <button
          className="btn btn-danger float-right mt-0 btn-lg"
          onClick={clearCart}
        >
          Delete All
        </button>
      )}
      <div className="products">
        {cart.map((product, idx) => (
          <div className="product" key={idx}>
            <Card
              style={{ width: "25rem", marginTop: 20, marginLeft: 30 }}
              key={idx}
            >
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <h4>₹{product.cost}</h4>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(product)}
                >
                  Delete
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {(PackagePlan1 &&
      <div classID="HTMLtoPDF" id="HTMLtoPDF">
            <div className={classes.paper}>
              <h2>{customer} heloo</h2>
              <div class="table-responsive">
                {cart.map((product, idx) => (
                  <table class="table">
                    <tr>
                      <td>{product.name}</td>
                      <td>₹{product.cost}</td>
                    </tr>
                  </table>
                ))}
              </div>
              <h2 id="transition-modal-title">Total Cost: ₹{getTotalSum()}</h2>
              <p
                id="transition-modal-description"
                style={{ textAlign: "center" }}
              >
                <b> Thank You for Choosing Us</b>
              </p>
            </div>
            </div>)}
      <div></div>
      <div>
        <button
          type="button"
          className="btn btn-warning btn-block text-white ml-2 mr-2"
          style={{ borderRadius: 10 }}
          onClick={handleOpen}
        >
          <b> Proceed to Checkout </b>
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}  >
            <div classID="HTMLtoPDF" id="HTMLtoPDF">
            <h2 style={{fontSize:"40px"}}> Invoice </h2>
              <h2 style={{fontSize:"45px"}}>Dear {customer} </h2>
              <div class="table-responsive">
                {cart.map((product, idx) => (
                  <table class="table">
                    <tr>
                      <td style={{fontSize:"35px"}}>{product.name}</td>
                      <td style={{fontSize:"35px"}}>₹{product.cost}</td>
                    </tr>
                  </table>
                ))}
              </div>
              <h2 style={{fontSize:"40px"}} id="transition-modal-title">Total Cost: ₹{getTotalSum()}</h2>
              <p
                id="transition-modal-description"
                style={{ textAlign: "center",fontSize:"30px" }}
              >
                <b> Thank You for Choosing Us</b>
              </p>
            </div>
            <button
          type="button"
          className="btn btn-success btn-lg"
          style={{ borderRadius: 10 }}
          onClick={pdfdownload}
        >Downlaod PDF</button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
