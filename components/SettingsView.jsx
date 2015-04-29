import React from 'react';
import mui from 'material-ui';
import constants from '../constants';
import Settings from '../logic/Settings';

let DropDownMenu = mui.DropDownMenu;
let SettingsView = React.createClass({

  getInitialState: function() {
    return {
      currencyIndex: Settings.get('currency').index,
      languageIndex: Settings.get('language').index
    };
  },

  onChangeCurrency(e, currencyIndex, menuItem) {
    this.setState({currencyIndex});
    Settings.set('currency',currencyIndex, menuItem.value);
  },

  onChangeLanguage(e, languageIndex, menuItem) {
    Settings.set('language',languageIndex, menuItem.value);
    this.setState({languageIndex});
  },

  render() {
    return (
      <div>
        <DropDownMenu 
          selectedIndex = {this.state.currencyIndex} 
          onChange = {this.onChangeCurrency} 
          menuItems={constants.currencies} />
        <DropDownMenu 
          selectedIndex = {this.state.languageIndex} 
          onChange = {this.onChangeLanguage} 
          menuItems={constants.languages} />
      </div>
    )
  }
});

export default SettingsView;