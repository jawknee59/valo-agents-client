import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllAgents } from '../../api/agents'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. They're a quick easy way to add focused css properties to our react componenet
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// AgentIndex will make a request to the API for all agents
// once it receives a response, display a card for each agent
const AgentsIndex = (props) => {
    const [agents, setAgents] = useState(null)
    const [error, setError] = useState(false)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props
    

    // get our agents from the api when the components mounts
    useEffect(() => {
        getAllAgents()
            .then(res => setAgents(res.data.agents))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting agents',
                    message: messages.getAgentsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    // if no agents loaded yet, display 'loading'
    if (!agents) {
        return <LoadingScreen />
    } else if (agents.length === 0) {
        //otherwise if there ARE no agents, display that message
        return <p>No agents yet, go add some!</p>
    }


    // console.log('this is the agents array: \n', agents)
    // once we have an array of agents, loop over them
    // produce one card for every agent
    const agentCards = agents.map(agent => (
        <Card key={ agent.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ agent.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/agents/${agent.id}`} className="btn btn-info">View { agent.name }</Link>
                </Card.Text>
                {agent.owner ?
                    <Card.Footer>
                        Creator: {agent.owner.email}
                    </Card.Footer>
                    : null}
            </Card.Body>
        </Card>
    ))


    // return some jsx, a container with all of the agentcards
    return (
        <div className='container-md' style={ cardContainerStyle }>
            { agentCards }
        </div>
    )
}

// export our component 
export default AgentsIndex