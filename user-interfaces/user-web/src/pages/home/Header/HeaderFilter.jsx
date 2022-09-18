import React, { Component } from 'react'
import Dropdwon from "../../../components/header/downHeader/Dropdown";
import './style.scss';

export default class HeaderFilter extends Component {
  render() {
    const { handleChangePrice, handleChangePlatform } = this.props;
    return (
      <div className='trend-with-filter'>
        <Dropdwon handleChangePlatform={handleChangePlatform} options={['Filter by Platform', 'Switch', 'GameCube', 'MS-DOS']} />
        <div className='pHeader'>
          <p>TOP PRODUCTS</p>
          <h1>TRENDING THIS WEEK</h1>
        </div>
        <Dropdwon handleChangePrice={handleChangePrice}  options={['Filter by Price', '50<', '50 - 100',  '100>']} />

      </div>
    )
  }
}