import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';

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
const xyz={"hh":"kk", "hh1" : "kk1"};
export default function SilverPackage({ cart, setCart,customer }) {
  const getTotalSum = () => {
    return cart.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };
  const  pdfdownload = () => {
    const divToDisplay = document.getElementById('HTMLtoPDF')
    html2canvas(divToDisplay).then(canvas => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();

      pdf.addImage(dataURL, 'JPEG', 20, 20, 180, 160);

      pdf.save('saved.pdf')
  })
 
  
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
      
      <div> 
      <div>
          <div className="products">
              <h2 >Silver Package - 466000</h2>
             
              <div className="card" style={{"width": "40%", "height":"600px", "marginTop": "20px", "marginLeft": "30px"}}>       
				<div className="btn btn-success btn-lg">Photogaphy</div>
                    <img src={require("./img/Photo1.jpg")}  style={{"height":"400px"}}  />
                      <div className="card-body"><div className="card-title h5">Candid Entertainment</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹50000</h4>
                      </div></div>
                      <div className="card" style={{"width": "40%", "height":"600px", "marginTop": "20px", "marginLeft": "30px"}}>    
                      <div className="btn btn-success btn-lg">Makeup</div>   
                    <img src={require("./img/makeup1.jpg")}  style={{"height":"400px"}}  />
                      <div className="card-body"><div className="card-title h5">The Glam Makeup</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹16000</h4>
                      </div></div>
                      <div className="card" style={{"width": "50%", "height":"600px", "marginTop": "20px", "marginLeft": "30px"}}> 
                      <div className="btn btn-success btn-lg">Destination</div>      
                    <img src={require("./img/desti.png")}  style={{"height":"400px"}}  />
                      <div className="card-body"><div className="card-title h5">Novotel Hotel</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹300000</h4>
                      </div></div>
                      <div className="card" style={{"width": "40%", "height":"800px", "marginTop": "20px", "marginLeft": "30px"}}>
                      <div className="btn btn-success btn-lg">Bridal</div>
                      <img src={require("./img/bridal1.png")} />
                      <div className="card-body">
                          <div className="card-title h5">101 hues</div>
                          <div className="card-title h5"></div>
                          <para></para>
                          <h4>₹50000</h4>
                         </div>
                      </div>
                      <div className="card" style={{"width": "40%", "height":"800px", "marginTop": "20px", "marginLeft": "30px"}}>
                      <div className="btn btn-success btn-lg">Groom</div>
                      <img src={require("./img/Groom1.jpg")} />
                      <div className="card-body">
                          <div className="card-title h5">Paridhi</div>
                          <div className="card-title h5"></div>
                          <para></para>
                          <h4>₹50000</h4>
                         </div>
                      </div></div>
                      </div>
                      </div>             

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
            <h2 style={{fontSize:"40px"}}>  Silver Package Invoice </h2>
              <h2 style={{fontSize:"45px"}}>Dear Customer </h2>
              <div class="table-responsive">
               
                  <table class="table">
                    <tr>
                      <td style={{fontSize:"35px"}}>Candid Entertainment</td>
                      <td style={{fontSize:"35px"}}>₹50000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>The Glam Makeup</td>
                      <td style={{fontSize:"35px"}}>₹16000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Novotel</td>
                      <td style={{fontSize:"35px"}}>₹300000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>101 hues</td>
                      <td style={{fontSize:"35px"}}>₹50000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Paridhi</td>
                      <td style={{fontSize:"35px"}}>₹50000</td>
                    </tr>
                  </table>
                
              </div>
              <h2 style={{fontSize:"40px"}} id="transition-modal-title">Total Cost: ₹466000</h2>
              <p
                id="transition-modal-description"
                style={{ textAlign: "center",fontSize:"30px" }}
              >
                <b> Thank You for Choosing Us</b>
              </p>
            </div>
            <a href="/SilverPackage.pdf" target="_blank"  type="button"
          className="btn btn-success btn-lg"
          style={{ borderRadius: 10 }} download>Download Pdf</a>
        
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
