import React from "react";
import { connect } from "react-redux";
import { setAlert, resetAlert } from "../../redux/alertReducer";

function mapStateToProps(state) {
  return {
    alert: state.alertReducer.alert
  }
}

const mapDispatchToProps = {
  setAlert,
  resetAlert
}

class Alert extends React.Component {
  render() {
    return (
      <div>
        {this.props.alert}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);