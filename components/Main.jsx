import React from 'react';
import mui from 'material-ui';

let RaisedButton = mui.RaisedButton;
let FloatingActionButton = mui.FloatingActionButton;

let Main = React.createClass({

  showList() {
    this.props.showList();
  },

  handleClick() {
    this.props.onClick();
  },

  render() {
    return (
      <div className = 'main text-center'>
        <div 
          className="mui-font-style-display-1 total-income">
          $ 800
        </div>
        <div 
          className="mui-font-style-display-1 total-expense">
          $ 100
        </div>
        <ul className = 'more-used'>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>

          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>

          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
          <li>
            <RaisedButton label="a" secondary={true} />
          </li>
        </ul>
        <div 
          onTouchEnd = {this.showList} 
          className="mui-font-style-display-2">
          $ 700
        </div>
        <div className = 'actions'>
          <FloatingActionButton 
            onTouchEnd = {this.handleClick} 
            onClick = {this.handleClick}
            iconClassName=" icomoon-minus" />
          <FloatingActionButton 
            onTouchEnd = {this.handleClick} 
            onClick = {this.handleClick}
            iconClassName=" icomoon-plus" />
        </div>
      </div>
    )
  }
});

export default Main;