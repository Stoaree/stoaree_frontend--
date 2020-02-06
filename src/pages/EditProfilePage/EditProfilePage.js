import React from "react";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/userReducer"
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import fileUpload from "../../services/fileUpload"

// CSS 
import "./EditProfilePage.css";

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

const mapDispatchToProps = {
  setCurrentUser
}

class EditProfilePage extends React.Component {
  state = {
    updateSuccess: false
  }

  sendUpdate = (values, url = "") => {
    axiosAPI.put("/users/profile", { ...values, avatarURL: url }).then(res => {
      if (res.status === 200) {
        this.setState({ updateSuccess: true });
        this.props.setCurrentUser(res.data);
      }
    });
  }

  onSubmit = async (values) => {
    if (values.avatar) {
      fileUpload(values, values.avatar, this.sendUpdate);
    }
    else {
      this.sendUpdate(values);
    }
  }

  renderForm = () => {
    const { currentUser } = this.props;
    if (currentUser) {
      return <ProfileForm initialValues={currentUser} onSubmit={this.onSubmit} avatarURL={currentUser.avatarURL} />
    }
  }

  render() {
    return (
      <div className="edit-profile-page-container">
        {this.state.updateSuccess && "Profile updated successfully."}
        <h3>Edit Profile</h3>
        {this.renderForm()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);