import {PrettyChatWindow} from 'react-chat-engine-pretty'

const ChatsPage = (props) => {
    return (
        <div style={{ height: '100vh'}}>
            <PrettyChatWindow
                projectId='4aa6d702-2f11-444e-b09e-a3056628d0c0'
                username = {props.user.username}
                secret = {props.user.secret}
                style = {{height: '100%'}} 
            />
        </div>
    )
}

export default ChatsPage