import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneAgent, deleteAgent } from '../../api/agents'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'


const ShowAgent = (props) => {
    const [agent, setAgent] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    // console.log('user in ShowAgent props', user)
    // console.log('msgAlert in ShowAgent props', msgAlert)

    useEffect(() => {
        getOneAgent(id)
            .then(res => setAgent(res.data.agent))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting agents',
                    message: messages.getAgentsFailure,
                    variant: 'danger'
                })
            })
    }, [])

    // Delete an Agent
    const removeThisAgent = () => {
        deleteAgent(user, agent.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeAgentSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeAgentFailure,
                    variant: 'danger'
                })
            })
    }

    if(!agent) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card className='m-2'>
                    <Card.Header>{ agent.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Agent Number: { agent.agentNumber }</small></div>
                            <div><small>Role: { agent.role }</small></div>
                            <div><small>From: { agent.country }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        { 
                            agent.owner && user && agent.owner.id === user.id ?
                            <>
                                <Button
                                    className='m-2' variant='danger'
                                    onClick={() => removeThisAgent()}
                                    >
                                    Delete {agent.name}
                                </Button>
                            </>
                        : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowAgent