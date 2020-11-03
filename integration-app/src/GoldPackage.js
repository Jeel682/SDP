import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

export default function GoldenPackage({ cart, setCart,customer }) {
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
              <h2 >Golden Package - ₹720000</h2>
              <div className="card" style={{"width": "40%", "height":"700px", "marginTop": "20px", "marginLeft": "30px"}}>   
              <div className="btn btn-success btn-lg">Photogaphy</div>    
                    <img src={require("./img/photo3.jpg")}  style={{"height":"450px"}}  />
                      <div className="card-body"><div className="card-title h5">Mac studio</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹150000</h4>
                      <h6>Vadodara</h6>
                      </div></div>
                      <div className="card" style={{"width": "40%", "height":"600px", "marginTop": "20px", "marginLeft": "30px"}}>    
                      <div className="btn btn-success btn-lg">Makeup</div>      
                    <img src={require("./img/makeup3.jpg")}  style={{"height":"350px"}}  />
                      <div className="card-body"><div className="card-title h5">Grace & Glamour</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹30000</h4>
                      <h6>Vadodara</h6>
                      </div></div>
                      <div className="card" style={{"width": "45%", "height":"600px", "marginTop": "20px", "marginLeft": "30px"}}>  
                      <div className="btn btn-success btn-lg">Destination</div>        
                    <img src={require("./img/desti3.jpg")}  style={{"height":"300px"}}  />
                      <div className="card-body"><div className="card-title h5">Grand space banquet</div>
                      <div className="card-title h5"></div><para></para>
                      <h4>₹400000</h4>
                      <h6>Vadodara</h6>
                      </div></div>
                      <div className="card" style={{"width": "40%", "height":"700px", "marginTop": "20px", "marginLeft": "30px"}}>
                      <div className="btn btn-success btn-lg">Bridal</div>
                      <img src={require("./img/bridal3.jpg")}  />
                      <div className="card-body">
                          <div className="card-title h5">Vibgyor fashion</div>
                          <div className="card-title h5"></div>
                          <para></para>
                          <h4>₹75000</h4>
                          <h6>Vadodara</h6>
                          </div>
                      </div>
                      <div className="card" style={{"width": "40%", "height":"700px", "marginTop": "20px", "marginLeft": "30px"}}>
                      <div className="btn btn-success btn-lg">Groom</div>
                      <img src={require("./img/Groom3.jpg")} />
                      <div className="card-body">
                          <div className="card-title h5">Royal Tradiaional</div>
                          <div className="card-title h5"></div>
                          <para></para>
                          <h4>₹65000</h4>
                          <h6>Vadodara</h6>
                          </div>
                      </div></div>
                      </div>
                      </div>             

      <div></div>
      <div style={{marginTop:"3%"}}>
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
            <h2 style={{fontSize:"40px"}}> Golden Package Invoice</h2>
              <h2 style={{fontSize:"45px"}}>Dear Customer </h2>
              <div class="table-responsive">
               
                  <table class="table">
                    <tr>
                      <td style={{fontSize:"35px"}}>Mac studio</td>
                      <td style={{fontSize:"35px"}}>₹150000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Grace & Glamour</td>
                      <td style={{fontSize:"35px"}}>₹16000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Grand space banquet</td>
                      <td style={{fontSize:"35px"}}>₹40000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Vibgyor fashion</td>
                      <td style={{fontSize:"35px"}}>₹75000</td>
                    </tr>
                    <tr>
                      <td style={{fontSize:"35px"}}>Royal Tradiaional</td>
                      <td style={{fontSize:"35px"}}>₹65000</td>
                    </tr>
                  </table>
                
              </div>
              <h2 style={{fontSize:"40px"}} id="transition-modal-title">Total Cost: ₹720000</h2>
              <p
                id="transition-modal-description"
                style={{ textAlign: "center",fontSize:"30px" }}
              >
                <b> Thank You for Choosing Us</b>
              </p>
            </div>
            <a href="/GoldenPackage.pdf" target="_blank"  type="button"
          className="btn btn-success btn-lg"
          style={{ borderRadius: 10 }} download>Download Pdf</a>
        
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
