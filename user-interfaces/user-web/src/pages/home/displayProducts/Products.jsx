import React, { Component } from 'react';
import ProductCard from '../../../components/Product/ProductCard';
import axios from 'axios';
import './style.css';

export default class Products extends Component {
  state = {
    products: [],
    filteredProducts: [],
  };
  componentDidMount() {
    axios.get(process.env.REACT_APP_games_service_url + '/games').then(res => this.setState({ products: res.data, filteredProducts: res.data }));
    !localStorage.getItem('products') && localStorage.setItem('products', JSON.stringify([]));
  }
  checkPrice = (priceRange, product) => {
    console.log('in check price');
    if (priceRange) {
      if (priceRange === '50<') {
        return product.price < 50;
      } else if (priceRange === '50 - 100') {
        return product.price >= 50 && product.price < 100;
      } else if (priceRange === '100>') {
        return product.price >= 100;
      } else {
        return true;
      }
    }
  }

  checkPlatform = (selectedPlatform, product) => {
    console.log('in check platform');
    if (selectedPlatform === 'Filter by Platform' || selectedPlatform.trim() === '') {
      return true;
    } else {
    }
    console.log(product.platform);
    console.log(selectedPlatform);
    console.log(product.platform === selectedPlatform);
    return product.platform === selectedPlatform;

  }

  render() {
    let { products } = this.state;
    if (typeof products !== 'undefined' && typeof products.data !== 'undefined') {
      products = Object.values(products.data.games);
      const { changeCart, inputSearch, priceRange, selectedPlatform } = this.props;
      return <div className='home-products'>
        {products.filter((product => (inputSearch ? product.title.toLowerCase().includes(inputSearch.toLowerCase()) : true) &&
          (priceRange ? this.checkPrice(priceRange, product) : true) && (selectedPlatform ? this.checkPlatform(selectedPlatform, product) : true)))
          .map(({ id, title, price, image, platform }) => <ProductCard changeCart={changeCart} key={id} id={id} title={title} price={+price} image={image} platform={platform} buttons={'Add to cart'} />)}
      </div>;
    }
  }
}