import React, { Component } from 'react'

import io from 'socket.io-client'


export default  class MostrarStunt extends Component{
    constructor(props){
        super(props)
        this.state={
            message:[],
            student:''
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

        fetch('http://localhost:5050/montrar/lista/student=admin')
            .then(data=>data.json())
            .then(doc=>{
                console.log(doc)
                this.setState({
                    student:doc
                })
            })

      
    }

    render(){
        
                
                   
    
        return(
            <div>
                 
                <h2>listar los estudiantes</h2>
                 
                <button
                    
                    onClick={this.sendMessage.bind(this)}
                >LISTAR ESTUDEINATES </button>
                    {
                        !this.state.student?'':this.state.student.map((d,i)=>{
                            return(
                                <div >
                                    <span>{d.name}</span><br/>
                                    <span>{d.apellido}</span><br/>
                                    {/* <span>{d.curso}</span> */}
                                    <span>{d.nivel}</span><br/>
                                    <span>{d.ci}</span><br/>
                                    <span>{d.ru}</span><br/>
                                </div>
                            )
                        })
                        
                    }
                     
        
            </div>
        )
    }
};