import { Form, Button, Container } from 'react-bootstrap'

const AgentForm = (props) => {

    const {agent, handleChange, handleSubmit, heading } = props

    console.log('this is the agent', agent)

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your agent's name?"
                        name="name"
                        id="name"
                        value={agent.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Agent Number:</Form.Label>
                    <Form.Control 
                        placeholder="What is your agent's number?"
                        name="agentNumber"
                        id="agentNumber"
                        value={ agent.agentNumber}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Role:</Form.Label>
                    <Form.Select
                        aria-label="role"
                        name="role"
                        defaultValue={agent.role}
                        onChange={handleChange}
                    >
                        <option>Select role menu</option>
                        <option value="controller">controller</option>
                        <option value="duelist">duelist</option>
                        <option value="initiator">initiator</option>
                        <option value="sentinel">sentinel</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>From:</Form.Label>
                    <Form.Control 
                        placeholder="Which country is your agent from?"
                        name="country"
                        id="country"
                        value={ agent.country}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default AgentForm