import React, { Component } from 'react';
import open from '../../assets/menu-open.svg';
import './notebook.css';
import './notebookbackground.css';
import NotebookBackground from './Notebookbackground';
import axios from 'axios';
import sweetie from 'sweetalert2';

class Notebook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            location: '',
            content: '',
            allNotes: [],
            mappedNotes: [],
            showSave: false,
            canEdit: false,
            disabled: true,
        }
    }

    componentDidMount() {
        this.getNotes()
    }

    getNotes = () => {
        axios.get('/allnotes')
        .then(res => {
            this.setState({
                allNotes: res.data,
                title: res.data.title,
                location: res.data.location,
                content: res.data.content
            })
        })
    }

    updateTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    updateLoc = (e) => {
        this.setState({
            location: e.target.value
        })
    }
    updateContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.goBack()
    }

    toggleSave() {
        this.setState({
          showSave: !this.state.showSave,
          canEdit: !this.state.canEdit,
          disabled: !this.state.disabled
        })
      }

      saveEdit = (id) => {
        let { title, location, content } = this.state
        axios.patch(`/allnotes/${id}`, { title, location, content })
        console.log(this.props.match.params.id)
        .then( res => {
          this.setState({
            disabled: !this.state.disabled,
            showSave: !this.state.showSave,
            canEdit: !this.state.canEdit,
          })
          console.log('edit')
        })
      }

      deleteNote(note_id) {
          sweetie({
            title: 'Are you sure you want to delete this?',
            text: 'Also, would you like a jellybaby?',
            showCancelButton: true,
              confirmButtonColor: '#FF9770',
            cancelButtonColor: '#ccc3c3',
            cancelButtonText: 'No!',
            confirmButtonText: 'Exterminate!',
            padding: '2.5rem',

        }).then((result) => {
            if(result.value) {
        axios.delete(`/allnotes/${note_id}`)
                      .then(res => {
                          this.getNotes()
                      })
                  sweetie({
                      title: 'Exterminated!',
                      text: 'No second chances',
                      showConfirmButton: false,
                      timer: 500,
                      padding: '2.5rem'
                  })
            }
        }).catch(err => console.log(err))
    }

    render() {
        let mappedNotes = this.state.allNotes.map((note, i) => {
            return(
                <div key={i} className="first">
                    <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">
                        <input className={this.state.canEdit ? "note-inputs" : "note-inputs cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        value={note.title} onChange={this.updateTitle}/>

                        <input className={this.state.canEdit ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        value={note.location} onChange={this.updateLoc}/>

                        <input className={this.state.canEdit ? "note-text" : "note-text cannot-edit"}
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        value={note.content} onChange={this.updateContent}/>


                    {this.state.showSave ?
                    <div className="save-button"
                    onClick={() => this.saveEdit()}>
                    <button className="note-save">SAVE</button>
                    </div>
                    :
                    <div className="edit-button"
                    onClick={() => this.toggleSave()}>
                    <button className="note-edit">EDIT</button>
                    </div>
                    }
                    </div>
                        <h3 className="delete-note"
                        onClick={() => this.deleteNote(note.note_id)}>DELETE NOTE</h3>
                    </div>
                

                    </div>

            )})

        return(
            <div >
                <div className="menu-enter nb">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter-menu"/>
                </div>

                <div>
                    {mappedNotes}
                </div>
                
            </div>
        )
    }
}

export default Notebook;