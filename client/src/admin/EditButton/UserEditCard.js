import React from "react"
import {Card, Form, Row, Modal, Button} from "react-bootstrap"

class UserEditCard extends React.Component{

    constructor(props){
        super(props)
        this.state={}
    }

    saveClick=() => {
        this.props.onHide()
        setTimeout(() => {
            this.props.editData()
        }, 300);
    }

    render(){
        const {data} = this.props
        return(

            <Modal
              show={this.props.show}
              onHide={this.props.onHide}
              size="ls"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit User
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <Card className="text-center">
                        <Card.Header>
                            <div className="image-container">
                                <img src={data.profileImg} alt="FT" width="50" height="50" />
                              </div>
                            User ID # {data._id}
                        </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control name='Username' readOnly={true} defaultValue={data.name} />
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="exampleForm.ControlInput2">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control name='Useremail' onChange={this.props.handleInputChange} defaultValue={data.email} />
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="exampleForm.ControlInput3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control name='Userphone' onChange={this.props.handleInputChange} defaultValue={data.phone} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                    </Card>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.saveClick} variant="success">Save</Button>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>  
        )
    }
}

export default UserEditCard