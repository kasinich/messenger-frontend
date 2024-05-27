import React, { useEffect } from 'react';
import { withRouter } from "react-router"
import { connect } from "react-redux"

import { Messages, ChatInput, Status, Sidebar } from 'containers';
import { dialogsActions } from "../../redux/actions"

import "./Home.scss"

const Home = (props) => {
    const { setCurrentDialogId, user } = props

    useEffect(() => {
        const { pathname } = props.location
        const dialogId = pathname.split("/").pop()
        setCurrentDialogId(dialogId)
    }, [props.location.pathname])

    return (
        <section className='home'>
            <div className="chat">
                <Sidebar />
                {user &&
                    <div className="chat__dialog">
                        <Status />
                        <Messages></Messages>
                        <ChatInput />
                    </div>
                }
            </div>
        </section>
    );
};

export default withRouter(
    connect(({ user }) => ({ user: user.data }),
        dialogsActions
    )(Home));