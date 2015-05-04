import React from 'react';
import mui from 'material-ui';
import constants from '../constants';
import Settings from '../logic/Settings';

let DropDownMenu = mui.DropDownMenu;
let SettingsView = React.createClass({

  getInitialState: function() {
    return {
      currencyIndex: Settings.get('currency').index,
      languageIndex: Settings.get('language').index,
      languageLabel: Settings.getText('language'),
      currencyLabel: Settings.getText('currency'),
    };
  },

  onChangeCurrency(e, currencyIndex, menuItem) {
    this.setState({currencyIndex});
    Settings.set('currency',currencyIndex, menuItem.value);
  },

  onChangeLanguage(e, languageIndex, menuItem) {
    Settings.set('language',languageIndex, menuItem.value);
    this.setState({
      languageLabel: Settings.getText('language'),
      currencyLabel: Settings.getText('currency'),
      languageIndex
    });
  },

  render() {
    return (
      <div className = 'settings-view'>
        <div className = 'fields'>
          <label className = 'mui-font-style-title'>
            {this.state.currencyLabel}
          </label>
          <DropDownMenu 
            selectedIndex = {this.state.currencyIndex} 
            onChange = {this.onChangeCurrency} 
            menuItems={constants.currencies} />
        </div>
        <div className = 'fields'>
          <label className = 'mui-font-style-title'>
            {this.state.languageLabel}
          </label>
          <DropDownMenu 
            selectedIndex = {this.state.languageIndex} 
            onChange = {this.onChangeLanguage} 
            menuItems={constants.languages} />
        </div>
      </div>
    )
  }
});

export default SettingsView;