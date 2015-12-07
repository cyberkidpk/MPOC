/** In this file, we create a React component which incorporates components provided by material-ui */
//Import statements:
/********************************************************************************************************************************
      Copyright (c) 2015, Dalbhaat and/or its affiliates. All rights reserved.
      DALBHAAT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
********************************************************************************************************************************
********************************************************************************************************************************
Card with animated Container
********************************************************************************************************************************/
var React = require('react');
var DBForProductCard = require('../components/forProductCard.jsx');

var DBAnimProductCard = React.createClass({
      getDefaultProps: function() {
        return {
          resData: null
        };
      },
      contextTypes: {
        muiTheme: React.PropTypes.object,
        Hammer: React.PropTypes.func
      },
      getInitialState() {
      	return {}
      },
      componentWillMount: function() {
      },
      componentDidMount: function() {
        
      },
      render() {return ( 
          <div id = {this.props.DBAnimCardOnStageId} ref = {this.props.DBAnimCardOnStageId} className = "cssDefault" >
      < div ref = "cardParentHolder" > { this.props.resData.map(function(obj, i) {
      		 return <DBForProductCard 
      		 cssTransition = {this.props.cssTransitionParent.bind(null, this.props.DBAnimCardCssTransEntry, this.props.DBAnimCardCssTransExit, this.props.DBAnimCardOnStageId, this.props.DBAnimCardNextOnStageId)}
      		 key = {i} index = {i}  refid = {"productCard" + i } />;
      		}.bind(this))} 
      < /div> 
      < /div>
      );
      },
      _handleTouchTap() {
                this.refs.superSecretPasswordDialog.show();
              }

          });

module.exports = DBAnimProductCard;