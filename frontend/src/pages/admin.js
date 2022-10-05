import axios from 'axios';

import React,{Component} from 'react';
import { API_BASE_URL, PACKED_NONCE } from '../constants';

class Admin extends Component {

	state = {
	  selectedFile: null,
    init: true
	};

  componentDidMount() {
    if (this.state.init) {
      this.setState({ init: false });
      prompt('Enter Admin Username', '');
      prompt('Enter Admin Password', '');
    }
  }
	
	// On file select (from the pop up)
	onFileChange = event => {
	  // Update the state
	  this.setState({ selectedFile: event.target.files[0] });
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 100 ){
          this.setState({ uploadPercentage: percent })
        }
      }
    }
    
    // Send formData object
    axios.post(`${API_BASE_URL}/upload`, formData, options);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
    if (this.state.selectedFile) {
      return (
        <p>
          File Name: {this.state.selectedFile.name}
          <br/>
          File Type: {this.state.selectedFile.type}
          <br/>
          Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      );
    }
	};

  inited = () => {
    this.setState({ init: false });
  }
	
	render() {
    return (
      <div>
        <div className="navbar navbar-dark bg-warning fixed-top">
          <div className="container py-2">
            <a href="/" className="navbar-brand">
              Fanstop Demo
            </a> 
            <a href="https://github.com/ankitshubham97/fanstop">
              <img src="github-logo-6531.png" alt="public-address" className="ml-2" />
            </a>
          </div>
        </div>
        <section className="intro">
          <div className="mask mt-2 d-flex align-middle align-items-center h-100">
            <div className="container"  style={{ marginTop: "100px"}}>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <center>
                          <div style={{ height: "400px", paddingTop: "100px"}}>
                            <p className="fw-bold">
                              Upload your new content to IPFS with encryption now!
                            </p>
                            <div>
                              <input type="file" onChange={this.onFileChange} />
                              <button onClick={this.onFileUpload}>
                              Encrypt and Upload!
                              </button>
                            </div>
                            <div>     
                              {this.fileData()}
                            </div>
                          </div>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
	}
}

export default Admin;
