import React,{ useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import PackageCart from "./Cart";
import SilverPackage from "./SilverPackage";
import GoldPackage from "./GoldPackage";
import DiamondPackage from "./DiamondPackage";
const PAGE_CART = "cart";
const PAGE_PACKAGEPLAN = "PackagePlan";
const PAGE_SILVER = "SilverPackage"
const PAGE_GOLD = "GoldPackage"
const PAGE_DIAMOND = "DiamondPackage"
const PAGE_HOME = "HomeContent";
const PAGE_PORTFOLIO = "Portfolio";
let PackagePlan1=true;
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

export default function PackagePlan({ cart, setCart,customer,PackagePlan2 }) {

    let history = useHistory();
    let Gold = () => {
      PackagePlan2 = false;
      PackagePlan1=false;
      navigateTo(PAGE_GOLD)  
     
    };
    let Diamond = () => {
      PackagePlan2 = false;
      PackagePlan1=false;
      navigateTo(PAGE_DIAMOND) 
    };
    let Silver = () => {
      PackagePlan2 = false;
      PackagePlan1=false;
      navigateTo(PAGE_SILVER)  
     // history.push("/SilverPackage");
      };
      let Custom = () => {
        PackagePlan2 = false;
        PackagePlan1=false;
        navigateTo(PAGE_CART)        };
  const clearCart = () => {
    setCart([]);
  };
 
  let portFolioPage = () => {
    history.push("/Portfolio");
  };
  const [page, setPage] = useState(PAGE_HOME);
  const [open, setOpen] = React.useState(false);
  if((page ==undefined || page =='HomeContent') &&  PackagePlan1==false)
  {
     PackagePlan1=true;
  }
 
  
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const classes = useStyles();
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     
     {page === PAGE_CART && (
        <PackageCart cart={cart} setCart={setCart} customer={customer} />
      )}
      {page === PAGE_SILVER && (
        
        <SilverPackage cart={cart} setCart={setCart} customer={customer}/>
      )}
      {page === PAGE_DIAMOND && (
        
        <DiamondPackage cart={cart} setCart={setCart} customer={customer}/>
      )}
      {page === PAGE_GOLD && (
        
        <GoldPackage cart={cart} setCart={setCart} customer={customer}/>
      )}
     {(PackagePlan1 && <h1>Packages</h1>)}
      {cart.length > 0 && PackagePlan1 && (
        <button
          className="btn btn-danger float-right mt-0 btn-lg"
          onClick={clearCart}
        >
          Delete All
        </button>
      )}
     
{(PackagePlan1 &&
      <div > 
         <div></div>
                     <div class="container">
                         <div class="row">
                             <div class="col-sm-3 mt-10">
                             <img src={require("./img/Silver.png")}  onClick={(e) => {
                  Silver();
                }} style={{ cursor: "pointer" }}/>
                             <div className="card-title h3">Silver Package</div>
                             <h4>₹466000</h4>
                             <div className="card-title h5">This is the Silver Plan package.This is the Silver Plan package.This is the Silver Plan package.This is the Silver Plan package</div></div>
                             <div class="col-sm-3 mt-10">
                             <img src={require("./img/Gold.png")}   onClick={(e) => {
                  Gold();
                }} style={{ cursor: "pointer" }} />
                             <div className="card-title h3">Golden Package</div>
                             <h4>₹720000</h4>
                             <div className="card-title h5">This is the Gold Plan package.This is the Gold Plan package.This is the Gold Plan package.This is the Gold Plan package</div></div>
                             <div class="col-sm-3 mt-10">
                             <img src={require("./img/Diamond.png")}   onClick={(e) => {
                  Diamond();
                }} style={{ cursor: "pointer" }}/>
                             <div className="card-title h3">Diamond Package</div>
                             <h4>₹1060000</h4>
                             <div className="card-title h5">This is the Diamond Plan package.This is the Diamond Plan package.This is the Diamond Plan packageThis is the Diamond Plan package</div></div>
                             <div class="col-sm-3 mt-10">
                             <img src={require("./img/Customize.png")}   onClick={(e) => {
                  Custom();
                }} style={{ cursor: "pointer" }} />
                             <div className="card-title h3">Customise Package</div>
                             <h4></h4>
                             <div className="card-title h5">Create your own customise package.</div>
                             </div></div></div>
          </div>)}
          
     
    </>
  );
}
