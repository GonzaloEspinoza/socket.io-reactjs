import React, { Component } from 'react'

import io from 'socket.io-client'

export default class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            message:[]
        }
    };

    // despues de cargar todo realiza la conexion con el servidor
    componentDidMount(){

        this.socket = io('http://192.168.1.7:5050/');

        this.socket.on('message',message=>{
            this.setState({
                message:[message, ...this.state.message]
            })
        })
    }


    handleSubmit=(e)=>{

        const body = e.target.value
        if(e.keyCode === 13 && body){
            const message = {
                body,
                from: 'me'
            }
            this.setState({message:[message, ...this.state.message]})
            this.socket.emit('message', body)
            e.target.value = '';
        }

        console.log(e.target.value)

    }


    render(){
        const  message =this.state.message.map((d,i)=>{
            return(
                <li key={i}>
                    <b>{d.from}: {d.body}</b>
                </li>
            )
        })
        
        return(
            <div>
                <h2>hello from chat reactjs </h2>

                <input 
                    type="text" 
                    placeholder="inserta del mensaje"
                    onKeyUp={this.handleSubmit.bind(this)}
                
                />

                <ul>
                    { message }
                </ul>

            </div>
        )
    }
};