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
            allNotes: [],
            showSave: [],
            canEdit: [],
            disabled: [],
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
                this.setAvailability(res.data.length)
                    this.setState({
                        allNotes: res.data
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

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.goBack()
    }

      saveNote = (note, i) => {
        let { title, country, location, content } = this.state
        note.title = title ? title : note.title
        note.country = country ? country : note.country
        note.location = location ? location : note.location
        note.content = content ? content : note.content
        // if(note.note_id) {
            axios.patch(`/allnotes/${note.note_id}`,  note )
            .then( res => {
                this.updateAvailability(i)
              this.setState({
                  allnotes: res.data
                })
        }).catch(err => console.log(err))
    // } else {
    //     console.log('savenote!')
    // }
      }

      deleteNote(note_id) {
          sweetie({
            title: 'Are you sure you want to delete this?',
            text: 'Also, would you like a jellybaby?',
            showCancelButton: true,
            confirmButtonColor: '#7F1816',
            cancelButtonColor: '#0563B5',
            cancelButtonText: 'NO!',
            confirmButtonText: 'EXTERMINATE!',
            padding: '2.5rem',

        }).then((result) => {
            if(result.value) {
        axios.delete(`/allnotes/${note_id}`)
                      .then(res => {
                          this.getNotes()
                      })
                //   sweetie({
                //       title: 'EXTERMINATED!',
                //       text: 'No second chances',
                //       showConfirmButton: false,
                //       timer: 400,
                //       padding: '2.5rem'
                //   })
            }
        }).catch(err => console.log(err))
    }

    toLanding = () => {
        this.props.history.push('/landing');
    }

    updateAvailability = (i) => {
            let canEdit = [...this.state.canEdit]
            canEdit[i] = !this.state.canEdit[i]
            let showSave = [...this.state.showSave]
            showSave[i] = !this.state.showSave[i]
            let disabled = [...this.state.disabled]
            disabled[i] = !this.state.disabled[i]
            
            this.setState({
                canEdit: canEdit,
                showSave: showSave,
                disabled: disabled
            })
    }

    updateField = (value, i, type) => {
        let newNotes = [...this.state.allNotes]
        newNotes[i][type] = value
        this.setState({
            allnotes: newNotes
        })
    }
    setAvailability = (length) => {
        for(let i = 0; i < length; i++){
            let canEdit = [...this.state.canEdit]
            canEdit[i] = false
            let showSave = [...this.state.showSave]
            showSave[i] = false
            let disabled = [...this.state.disabled]
            disabled[i] = true
            this.setState({
                canEdit: canEdit,
                showSave: showSave,
                disabled: disabled
            })
        }
    }

    render() {
        
        let mappedNotes = this.state.allNotes.map((note, i) => {
           
            return(

                <div key={i} className="first">
                    <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">
                        <input className={this.state.canEdit[i] ? "note-inputs" : "note-inputs cannot-edit"} 
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].title} placeholder="TITLE"
                        onChange={e => {
                            this.updateField(e.target.value, i, 'title')
                        }}/>

                         <input className={this.state.canEdit[i] ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].country} placeholder="COUNTRY"
                        onChange={e => {
                            this.updateField(e.target.value, i, 'country')
                        }}/>

                        <input className={this.state.canEdit[i] ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].location} placeholder="LOCATION"
                        onChange={e => {
                            this.updateField(e.target.value, i, 'location')
                        }}/>

                        <textarea cols="20" rows="10" 
                        className={this.state.canEdit[i] ? "note-text" : "note-text cannot-edit"}
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].content} placeholder="THOUGHTS..."
                        onChange={e => {
                            this.updateField(e.target.value, i, 'content')
                        }}/>


                    {this.state.showSave[i] ?
                    <div className="save-button"
                    onClick={() => this.saveNote(note, i)}>
                    <button className="note-save">SAVE</button>
                    </div>
                    :
                    <div className="edit-button"
                    onClick={() => this.updateAvailability(i)}>
                    <button className="note-edit">EDIT</button>
                    </div>
                    }
                    </div>
                        <h3 className="delete-note"
                        onClick={() => this.deleteNote(note.note_id)}>DELETE NOTE</h3>
                    </div>
                    <a className="link-to-top" href="#/notebook">Back to top</a>
                

                    </div>

            )})

        return(
            <div >
                <a name="/notebook"></a>
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