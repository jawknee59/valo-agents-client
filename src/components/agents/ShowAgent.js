import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOneAgent } from '../../api/agents'

import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

// we need to get the agent's id from the route parameters
// then we need to make a request to the api
// when we retrieve a agent from the api, we'll render the data on the screen

const ShowAgent = (props) => {
    const [agent, setAgent] = useState(null)

    const { id } = useParams()

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
                </Card>
            </Container>
        </>
    )
}

export default ShowAgent