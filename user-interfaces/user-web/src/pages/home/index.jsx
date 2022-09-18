import React, { Component } from 'react';
import HeaderFilter from './Header/HeaderFilter';
import HomeLanding from '../../components/Home/home';


import Products from './displayProducts/Products';


export default class Home extends Component {
  state = {
    selectedPlatform: 0,
    priceRange: 0,
  };

  handleChangePrice =(e) => {
    this.setState({ priceRange: e.target.value });
  }
  handleChangePlatform =(e) => {
    this.setState({ selectedPlatform: e.target.value });
  }


  render() {
    const { changeCart, inputSearch } = this.props;
    const { selectedPlatform, priceRange } = this.state;
    return (
      <div>
        <HomeLanding />
        <HeaderFilter handleChangePrice={this.handleChangePrice} handleChangePlatform={this.handleChangePlatform} />
        <Products selectedPlatform={selectedPlatform} priceRange={priceRange} inputSearch={inputSearch} changeCart={changeCart} />
      </div>
    );
  }
}