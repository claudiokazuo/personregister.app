import React, { Component } from 'react'

class DocumentType extends Component {
    render() {
        return (
            <form>
                <h1>Document Type</h1>                
                <hr/>
                <input type="text" placeholder="Name"/>
                <button>Create</button>
            </form>
        );
    }
}

export default DocumentType;