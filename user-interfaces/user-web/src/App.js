// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import logo from './favicon.png';
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Header from "./components/header";
import Cart from "./pages/Cart/Cart";

import ProductDet from "./pages/productDetails/ProductDet";


class App extends Component {
  state = {
    inputSearch: "",
    itemsOfCart: 0,
  };

  handleSearch = (e) => {
    this.setState({ inputSearch: e.target.value });
  };
  changeCart = (e) => {
    this.setState({ itemsOfCart: e });
  };

  render() {

    const {
      changeCart,
      handleSearch,
      state: { itemsOfCart, inputSearch },
    } = this;


    return (
      <>
        <Header
          itemsOfCart={itemsOfCart}
          handleSearch={handleSearch}
        />
        <Routes>
          <Route path={"/product/:id"} element={<ProductDet/>}/>

          {/* <Route path='/notfound'>
          <NotFound />
        </Route>
          <Route exact path={'/product/:id'}>
          <ProductInfo />
        </Route>
        <Route  path='/product'>
          <Product />
        </Route>
    */}

          <Route path='/cart' element={<Cart/>}/>
          <Route exact path='/' element={<Home changeCart={changeCart} inputSearch={inputSearch} />}/>
        </Routes>
      </>
    );
  }
}

export default App;

// function App() {
//   const [getMessage, setGetMessage] = useState({});

//   useEffect(() => {
//     console.log(process.env.REACT_APP_games_service_url + '/health');
//     axios.get(process.env.REACT_APP_games_service_url + '/health').then((response) => {
//       console.log('SUCCESS', response);
//       setGetMessage(response);
//     }).catch((error) => {
//       console.log(error);
//     });
//   }, []);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>React + Flask Tutorial</p>
//         <div>
//           {
//             getMessage.status === 200 ? <h3>{getMessage.data.message}</h3> : <h3>LOADING</h3>
//           }
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
