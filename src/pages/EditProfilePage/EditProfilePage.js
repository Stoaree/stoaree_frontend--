import React from "react";
import axios from "axios";
import axiosAPI from "../../api/stoareeAPI";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/userReducer"
import ProfileForm from "../../components/ProfileForm/ProfileForm";

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

  componentDidMount() {
    if (!Object.entries(this.props.currentUser).length) {
      axiosAPI.get("/users/current").then(res => {
        this.props.setCurrentUser(res.data);
      });
    }
  }

  sendUpdate = (values, url = "") => {
    axiosAPI.put("/users/profile", { ...values, avatarURL: url }).then(res => {
      if (res.status === 200) {
        this.setState({ updateSuccess: true });
        this.props.setCurrentUser(res.data);
      }
    });
  }

  onSubmit = (values) => {
    if (values.avatar) {
      console.log('Preparing the upload');

      axiosAPI.post("/sign_s3", {
        fileName: Math.random().toString() + "/" + values.avatar.name,
        fileType: values.avatar.type
      }).then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;

        console.log('Received a signed request ' + signedRequest);

        const options = {
          headers: {
            'Content-Type': values.avatar.type
          }
        };

        axios.put(signedRequest, values.avatar, options).then(result => {
          console.log("Response from s3");

          this.sendUpdate(values, url);
        });
      }).catch(error => {
        alert(JSON.stringify(error));
      });
    }
    else {
      this.sendUpdate(values);
    }
  }

  renderForm = () => {
    const { currentUser } = this.props;
    if (Object.entries(currentUser).length) {
      return <ProfileForm initialValues={currentUser} onSubmit={this.onSubmit} avatarURL={currentUser.avatarURL} />
    }
  }

  render() {
    return (
      <div>
        {this.state.updateSuccess && "Profile updated successfully."}
        <h3>Edit Profile</h3>
        {this.renderForm()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);