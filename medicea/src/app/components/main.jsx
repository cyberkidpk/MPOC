//Import statements:
/********************************************************************************************************************************
      Copyright (c) 2015, Dalbhaat and/or its affiliates. All rights reserved.
      DALBHAAT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
********************************************************************************************************************************
********************************************************************************************************************************
Main Controller: it is view controller define views should be placed on the stage and what would be enty animation
********************************************************************************************************************************/

var React = require('react'),
ReactDOM = require('react-dom'),
RaisedButton = require('material-ui/lib/raised-button'),
Dialog = require('material-ui/lib/dialog'),
ThemeManager = require('material-ui/lib/styles/theme-manager'),
LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme'),
TimePicker = require('material-ui/lib/time-picker'),
Colors = require('material-ui/lib/styles/colors'),
Hammer = require('hammerjs'),
propagating = require('propagating-hammerjs'),
RestFul = require('../controllers/restfulController'),
CurrentView,
NextView,
productCard,
viewOnStage,
DBprops ={},
appViewConfig = require("../appViewConfig");


var Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    Hammer: React.PropTypes.func
  },

  getInitialState: function() {
    this.setStage('register');
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      restCallId: "",
      cssTransition: "cssDefault",
      cssTransitionSlideInLeft: "cssDefault"
    };
  },

  getDefaultProps: function() {
  /* RestFul.getCall:server call 
  params : currentObj, enpoint, search params in obj,
  payload(missing would be send undefined)
  */
    RestFul.getCall(this, "inventory/api/product/search",{category:"abc",keyword:"rice"})  
    return {
      DBprops: {}
    };
  },

  getChildContext: function() {
    return {
      muiTheme: this.state.muiTheme,
      Hammer: Hammer     //passing Hammer as global constructor
    };
  },

/* getAndRenderData: a callback function 
restfulController > Restful.getCall function 
and renders the view after receiving data */
  
  getAndRenderData: function(resData) {
    if(resData){
      this.resData = resData;
       this.render();
     }else{
      console.log("show error")
     }
  },
  getResData: function() {
    return this.resData;
  },
  componentWillMount: function() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({
      muiTheme: newMuiTheme
    });
    this.dynamicCsschange()
  },
  componentDidMount: function() {
    var myElement = this.refs.parentTouch;
    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = propagating(new Hammer(myElement));
    // listen to events...
    mc.on("panleft panright tap press", function(ev) {
      myElement.style.transform = "translateX(" + ev.deltaX + "px)";
    }.bind(this));
  },
  //Dynamic class change
  dynamicCsschange: function(cssTransitionType) {
    return "cssDefault ";

  },
/*
Function
   cssTransition: placing view on stage with transitions 
Params: 
  cssTransitionEntryType - view entry effect,
  cssTransitionExitType- view exit effect,
  DOMOnStage - Dom reference object of current view ,
  DOMExpectedOnStage- expected Dom Reference object of next coming view 
*/

  cssTransition: function(cssTransitionEntryType, cssTransitionExitType, DOMOnStage, DOMExpectedOnStage) {
    var defaultCss = "cssDefault",
    DOMOnStageObj=document.getElementById(DOMOnStage)
    
    //,

    //DOMExpectedOnStageObj=document.getElementById(DOMExpectedOnStage);
    if (this.setTimeoutComp) {
      clearTimeout(this.setTimeoutComp);
    }
    //DOMExpectedOnStageObj.className = "";
    DOMOnStageObj.className = "";
    DOMOnStageObj.style.display = "block";
   // DOMExpectedOnStageObj.style.display = "none";
    DOMOnStageObj.classList.add(defaultCss, cssTransitionExitType)

    this.setTimeoutComp = setTimeout(function() {
     // DOMExpectedOnStageObj.style.display = "block";
      //DOMOnStageObj.style.display = "none";
      this.setProperties(DOMExpectedOnStage);
      if(DOMExpectedOnStage === "register"){
      CurrentView =require('../components/AnimCard.jsx');
      }else if (DOMExpectedOnStage === "productInfo"){
          CurrentView =require('../components/ProductCard.jsx');
          }
    this.setState({restCallId: new Date()});
    DOMOnStageObj.className = "";
     // DOMExpectedOnStageObj.classList.add(defaultCss, cssTransitionEntryType)
     DOMOnStageObj.classList.add(defaultCss, cssTransitionEntryType)


    }.bind(this), 1000)
  },
setStage:function(viewOnStage){
      
this.setProperties(viewOnStage);
CurrentView =require('../components/AnimCard.jsx');
},
setProperties:function(currentView){
    DBprops={};
    DBprops.cssTransitionParent=this.cssTransition;
    DBprops.DBAnimCardCssTransEntry=appViewConfig[currentView].DBAnimCardCssTransEntry;
    DBprops.DBAnimCardCssTransExit=appViewConfig[currentView].DBAnimCardCssTransExit;
    DBprops.DBAnimCardOnStageId=currentView;
    DBprops.DBAnimCardNextOnStageId=appViewConfig[currentView].DBAnimCardNextOnStageId;
    
    },
  render: function() {
    var mainSliderHolder = {
      width: "400px",
      overflow: "hidden"
    };
    var rows = [],
      i = 0,
      len = 10;
    while (++i <= len) rows.push(i);
    var stageCView, stageNView;
    DBprops.resData=rows;
return (

      < div ref = "parentTouch" id="pppp" >    
        <CurrentView  {...DBprops}/>
         
      < /div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;