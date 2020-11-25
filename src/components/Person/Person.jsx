import React, { Component } from "react";
import axios from "axios";

class Person extends Component {

    constructor(props) {
        super(props);

        this.name = "";
        this.email = "";
        this.documentNumber = "";
        this.personId = 0;
        this.documentTypeId = 0;

        this.handleChangeName = this._handleChangeName.bind(this);
        this.handleChangeEmail = this._handleChangeEmail.bind(this);
        this.handleChangeRgNumber = this._handleChangeRgNumber.bind(this);

        this.createPerson = this._createPerson.bind(this);
    }

    _handleChangeName(event) {
        event.stopPropagation();
        this.name = event.target.value;
    }

    _handleChangeEmail(event) {
        event.stopPropagation();
        this.email = event.target.value;
    }
    _handleChangeRgNumber(event) {
        event.stopPropagation();
        this.documentNumber = event.target.value;
    }

    _createPerson(event) {
        event.preventDefault();
        event.stopPropagation();

        var person = {
            name: this.name,
            email: this.email
        };

        console.log('person object', person)

        var request = {
            method: 'POST',
            url: 'https://localhost:5001/api/person',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(person)
        };

        axios(request)
            .then(response => {
                console.log('person response', response.data)
                if (response.data.success === true) {
                    this.personId = response.data.data;
                    this._createDocument();
                }
            })
            .catch(error => console.log('person error', error));
    }

    _createDocument() {

        var requestDocumentType = {
            method: 'GET',
            url: 'https://localhost:5001/api/documenttype'
        };

        axios(requestDocumentType)
            .then(response => {
                var documenttypelist = response.data;
                var documenttype = documenttypelist.find(d => { return d.name === "rg" });
                this.documentTypeId = documenttype.id;
            })
            .catch(error => console.log('documenttype error', error));

        var document = {
            number: this.documentNumber,
            documenttypeid: this.documentTypeId,
            personid: this.personId,
        };

        console.log('document object', document);

        var requestDocument = {
            method: 'POST',
            url: 'https://localhost:5001/api/document',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(document)
        };

        axios(requestDocument)
            .then(response => console.log('document response', response.data))
            .catch(error => console.log('document error', error));
    }

    render() {
        return (
            <form id="frm-person"
                onSubmit={this._createPerson.bind(this)}>
                <div className="container">
                    <h1>Person</h1>
                    <hr />
                    <input type="text"
                        id="frm-person-name"
                        placeholder="Name"
                        required
                        onChange={this.handleChangeName} />
                    <input type="text"
                        id="frm-person-email"
                        placeholder="E-mail"
                        required
                        onChange={this.handleChangeEmail} />
                    <input type="text"
                        id="frm-person-rg-number"
                        placeholder="Rg Number"
                        required
                        onChange={this.handleChangeRgNumber} />
                    <button id="btn-person-submit"
                        type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default Person;