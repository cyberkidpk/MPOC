/** In this file, we create a React component which incorporates components provided by material-ui */
//Import statements:
/********************************************************************************************************************************
      Copyright (c) 2015, Dalbhaat and/or its affiliates. All rights reserved.
      DALBHAAT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
********************************************************************************************************************************
********************************************************************************************************************************
Card with swipping action
********************************************************************************************************************************/
var React = require('react');
var Card = require('material-ui/lib/card/card');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var CardActions = require('material-ui/lib/card/card-actions');
var CardExpandable = require('material-ui/lib/card/card-expandable');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardText = require('material-ui/lib/card/card-text');
var CardTitle = require('material-ui/lib/card/card-title');
var propagating = require('propagating-hammerjs');

//Avtar class
var Avatar = React.createClass({
  render() {
    return <div > < /div>
  }
})
//FlatButton class
var FlatButton = React.createClass({
  render() {
    return <div > {
      this.props.label
    } < /div>
  }
})

var DBCard = React.createClass({
      getDefaultProps: function() {
        return {
          data: null
        };
      },
      contextTypes: {
        muiTheme: React.PropTypes.object,
        Hammer: React.PropTypes.func
      },
      getInitialState() {
        return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
          updateAction: ""
        };
      },

      componentWillMount() {

      },
      componentDidMount() {
        var myElement = this.refs[this.props.refid];
        // create a simple instance
        // by default, it only adds horizontal recognizers
        var mc = propagating(new this.context.Hammer(myElement));
        // listen to events...
        mc.on("panleft panright tap press", function(ev) {
          ev.stopPropagation();
          myElement.style.transform = "translateX(" + ev.deltaX + "px)";
        });
      },
      render() {

  var CSSStyle={
        containerStyle: {
          textAlign: 'center',
          width: "100%",
          position: "relative",
          height: "60px",
          overflow: "hidden"
        },

      sliderStyle : {
          position: "absolute",
          width: "300%",
          border: "1px solid #efefef",
          top: "0",
          left: "0",
          overflow: "visible"
       },
        cardStyle : {
          width: "33.3%",
          border: "1px solid #4CAF50",
          position: "relative",
          background: "#efefef",
          float: "left"

        },
        cardStyleLeft : {
          width: "400px",
          border: "3px solid #FF5722",
          position: "relative",
          background: "#4CAF50",
          float: "left"
        },

        standardActions : [{
          text: 'Okay'
        }]
}

        return ( 
          < div className = "animCard"
          onClick = {this.props.cssTransition}
          style = {
            CSSStyle.containerStyle
          } >
          < div className = "slider"
          ref = {
            this.props.refid
          }
          style = {
            CSSStyle.sliderStyle
          } >
          < Card style = {
            CSSStyle.cardStyle
          }
          initiallyExpanded = {
            false
          } >
          < CardHeader style = {
            {
              background: this.props.secCard ?'yellow' : 'red'
            }
          }
          title = "Swipe Me"
          subtitle = "My Sub Title Left container"
          avatar = { < Avatar style = {
              {
                color: 'red'
              }
            } > A < /Avatar>}
            actAsExpander = {
              true
            }
            showExpandableButton = {
                true
              } >
              < /CardHeader> 
              < CardHeader style = {
                {
                  textAlign: 'left'
                }
              }
            title = "Swipe Me"
            subtitle = "My Sub Title"
            avatar = { < Avatar style = {
                  {
                    color: 'red'
                  }
                } > A < /Avatar>}
                actAsExpander = {
                  true
                }
                showExpandableButton = {
                    true
                  } >
                  < /CardHeader>
                  < CardHeader style = {
                    {
                      textAlign: 'left'
                    }
                  }
                title = "Title"
                subtitle = "Subtitle"
                avatar = { < Avatar style = {
                    {
                      color: 'red'
                    }
                  } > A < /Avatar>}
                  actAsExpander = {
                    true
                  }
                  showExpandableButton = {
                      true
                    } >
                    < /CardHeader>  < /Card> < /div> < /div>
                );
              },

              _handleTouchTap() {
                this.refs.superSecretPasswordDialog.show();
              }

          });

        module.exports = DBCard;