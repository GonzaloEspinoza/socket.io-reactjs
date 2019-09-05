import React, { Component } from 'react'

import io from 'socket.io-client'


export default  class ChatForo extends Component{
    constructor(props){
        super(props)
        this.state={
            message:[]
        };
    };

    componentDidMount(){

        this.socket = io('http://localhost:5050')

        this.socket.on('message',(message)=>{
            this.setState({
                message:[message, this.state.message]
            })
        })
    }

    sendMessage=(e)=>{
        console.log(e.keyCode)

        var texto = e.target.value
        if(e.keyCode === 13 && texto){
            const message = {
                texto,
                from:'me'
            }
            
            this.setState({message:[message, ...this.state.message]})

            this.socket.emit('message',texto)

            e.target.value=''


        }
    }

    render(){
        console.log(this.state)

        const message = this.state.message.map((d,i)=>{
            return(
                <li>
                    <b>{d.from}: {d.texto}</b>
                </li>
            )
        })

        return(
            <div>
                 
                <h2>chaForo</h2>
                 
                <input
                    type="text"
                    placeholder="write message"
                    onKeyUp={this.sendMessage.bind(this)}
                />

                <ul>
                    { message }
                </ul>

            </div>
        )
    }
};