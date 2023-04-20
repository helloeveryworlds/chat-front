import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CopyToClipboard from 'react-copy-to-clipboard'
import { Spin } from "antd";
import styles from '../style/ChatBox.module.css';

function ChatBox() {
  const [promptJob, setState1] = useState("");
  const [promotUser, setState2] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(false);
    const prompt = "Generate a Cover Letter. Here is the job information:" + promptJob+" Here is my information: "+ promotUser;
    console.log(prompt);
    // Send a request to the server with the prompt
    axios
      .post('http://localhost:8080/chat', { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setIsLoading(true);
        setResponse(res.data);
      }).catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.chatBox}>
      <Container fluid="md">
        <Row>
          <Col>
            <h1 className={styles.header}>Generate Cover Letter</h1>
          </Col>
        </Row>
      <Row>
        <Col>
      <Form onSubmit={handleSubmit}>
      <Stack gap={4}>      


        <InputGroup onChange={(e) => setState1(e.target.value)}>
          <FloatingLabel
          controlId="floatingTextarea"
          className="mb-3"
        >
          <InputGroup.Text >Job Description</InputGroup.Text>
          <Form.Control size="lg" as="textarea" aria-label="With textarea"/>
          </FloatingLabel>
          </InputGroup>


          
          <InputGroup onChange={(e) => setState2(e.target.value)}>
          <FloatingLabel
          controlId="floatingTextarea"
          className="mb-3"
        >
          <InputGroup.Text >Personal Info</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea" />
          </FloatingLabel>

        </InputGroup>
      
        <Row className={styles.submitRow}>
          <Button  type="submit">
            Submit
          </Button>
        </Row>

        <div>
          {isLoading ? (
            <div></div>
          ) : (
            <Spin tip="Loading..." size="large" />
          )}
        </div>
      </Stack>
    </Form>
    </Col>
    </Row>

      <Row>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
        
          <Form.Control as="textarea" value={response} rows={15} onChange={(e) => ""}/>
          <CopyToClipboard text={response}>
          <Button variant="secondary">Copy to clipboard</Button>
          </CopyToClipboard>
        </Form.Group>

      </Form>
      </Row>
    </Container>
    </div>
  );
}
export default ChatBox;