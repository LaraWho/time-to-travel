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
            noteId: 0,
            allNotes: [],
            mappedNotes: [],
            showSave: false,
            canEdit: false,
            disabled: true,
            DWquote: '',
            sourceQ: ''
        }
    }

    componentDidMount() {
        this.getNotes()
        this.getQuote()
    }

    getNotes = () => {
        axios.get('/allnotes')
        .then(res => {
                console.log(res.data)
                    this.setState({
                        allNotes: res.data,
                        title: res.data.title,
                        location: res.data.location,
                        content: res.data.content,
                        noteId: res.data.note_id
                    })
        })
    }

    getQuote = () => {
        axios.get('http://api.chrisvalleskey.com/fillerama/get.php?count=1&format=json&show=doctorwho')
        .then(res => {
            this.setState({
                DWquote: res.data.db[0].quote,
                sourceQ: res.data.db[0].source
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

      saveNote = (note) => {
        let { title, location, content } = this.state
        note.title = title ? title : note.title
        note.location = location ? location : note.location
        note.content = content ? content : note.content

        axios.patch(`/allnotes/${note.note_id}`,  note )
        .then( res => {
          this.setState({
              title: this.state.title,
              location: this.state.location,
              content: this.state.content,
              disabled: !this.state.disabled,
              showSave: !this.state.showSave,
              canEdit: !this.state.canEdit
            })
          console.log('save method')
        }).catch(err => console.log(err))
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

    toLanding = () => {
        this.props.history.push('/landing');
    }

    render() {
        console.log(this.state.DWquote)
        console.log(this.state.sourceQ)

        let mappedNotes = this.state.allNotes.map((note, i) => {
            return(

                <div key={i} className="first">
                    <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">
                        <input className={this.state.canEdit ? "note-inputs" : "note-inputs cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        placeholder={note.title} value={this.state.title} onChange={this.updateTitle}/>

                        <input className={this.state.canEdit ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        placeholder={note.location} value={this.state.location} onChange={this.updateLoc}/>

                        <textarea cols="20" rows="10" 
                        className={this.state.canEdit ? "note-text" : "note-text cannot-edit"}
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}
                        placeholder={note.content} value={this.state.content} onChange={this.updateContent}/>


                    {this.state.showSave ?
                    <div className="save-button"
                    onClick={() => this.saveNote(note)}>
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
                    <p onClick={this.toLanding}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter-menu"/>
                </div>

                <div className="intro-box">
                    <div className="intro-inner">
                        <p className="intro-text"><strong>Hello</strong><br /><br />
                        {/* Please add a new note in the menu above, or enjoy this quote! */}
                        {this.state.DWquote}<br /> - {this.state.sourceQ}</p>
                        <NotebookBackground />
                    </div>
                </div>

                <div>
                    {mappedNotes}
                </div>
                
            </div>
        )
    }
}

export default Notebook;