import React, { Component } from 'react';
import open from '../../assets/menu-open.svg';
import down from './down.svg';
import up from './up.svg';
import tardis from '../best-tardis-full.svg';
import './notebook.css';
import './notebookbackground.css';
import NotebookBackground from './Notebookbackground';
import axios from 'axios';
import sweetie from 'sweetalert2';
import { debounce } from 'lodash';

class Notebook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allNotes: [],
            showSave: [],
            canEdit: [],
            disabled: [],
            DWquote: '',
            sourceQ: '',
            input: '',
            unchangedNotes: [],
            reqComplete: false
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
                    res.data.country = res.data.map(note => {
                        return note.country === null ? note.country = '' : note.country
                    })
                    res.data.content = res.data.map(note => {
                        return note.content === null ? note.content = '' : note.content
                    })
                    res.data.title = res.data.map(note => {
                        return note.title === null ? note.title = '' : note.title
                    })
                    this.setState({
                        allNotes: res.data,
                        unchangedNotes: res.data,
                        reqComplete: true
                    })
        }).catch((err) => {
            console.log(err)
        })
    }

    getQuote = () => {
        axios.get('/api/getQuote')
        .then(res => {
            let num = Math.floor(Math.random() * Math.floor(36))
            this.setState({
                DWquote: res.data[num].quote,
                sourceQ: res.data[num].source
            })
        })
    }

    // getQuote = () => {
    //     axios.get('http://api.chrisvalleskey.com/fillerama/get.php?count=1&format=json&show=doctorwho')
    //     .then(res => {
    //         this.setState({
    //             DWquote: res.data.db[0].quote,
    //             sourceQ: res.data.db[0].source
    //         })
    //     })
            
    // }

    enterMenu = () => {
        this.props.history.push('/notebookmenu')
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
            axios.patch(`/allnotes/${note.note_id}`,  note )
            .then( res => {
                this.updateAvailability(i)
              this.setState({
                  allnotes: res.data
                })
        }).catch(err => console.log(err))
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
            //       sweetie({
            //           title: 'EXTERMINATED!',
            //           showConfirmButton: false,
            //           timer: 400,
            //           padding: '2.5rem'
            //       })
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

    handleFilter = (e) => {
        this.searchNotes(e.target.value)
    }

    searchNotes = debounce((query) => {
        if(query) {
        this.setState({
            allNotes: this.state.allNotes.filter(response => {

            return  response.location.toLowerCase().includes(query.toLowerCase()) ||
                    response.title.toLowerCase().includes(query.toLowerCase()) || 
                    response.content.toLowerCase().includes(query.toLowerCase()) || 
                    response.country.toLowerCase().includes(query.toLowerCase()) 
        })
    })
    } else {
        this.setState({
            allNotes: this.state.unchangedNotes
        })
    }
    this.top.scrollTo({
        'behavior': 'smooth',
        'top': window.innerHeight,
    })
    }, 800)


    scrollTop = () => {
        this.top.scrollTo({
            'behavior': 'smooth',
            'top': 0,
        })
    }

    scrollDown = () => {
        this.bottom.scrollIntoView({
            'behavior': 'smooth',
        })
    }

    toMap = () => {
        document.querySelector('.note-tardis').classList.add('leave');

        setTimeout(() => {
            this.props.history.push('/map');
        }, 1000)
    }
     

    render() {
  
        let mappedNotes = this.state.allNotes.map((note, i) => {
            // console.log('this.state.allNotes[i].title: ', this.state.allNotes[i].title)
            //  console.log('this.state.allNotes[i].photo', this.state.allNotes[i].photo)
            //  console.log('this.state.allNotes[i].country', this.state.allNotes[i].country)
            //  console.log('this.state.allNotes[i].location', this.state.allNotes[i].location)
            return(

                <div key={i} className="first">
                    <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">

                        {this.state.allNotes[i].country === null ?
                        console.log('Would you like a Jammie Dodger?')
                        :
                        <input className={this.state.canEdit[i] ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                       type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                       value={this.state.allNotes[i].country} placeholder="COUNTRY"
                       onChange={e => {
                           this.updateField(e.target.value, i, 'country')
                       }}/>
                        }

                        <input className={this.state.canEdit[i] ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].location} placeholder="LOCATION"
                        onChange={e => {
                            this.updateField(e.target.value, i, 'location')
                        }}/>

                        {this.state.allNotes[i].photo === null ?
                         null 
                         :
                         <textarea className={this.state.canEdit[i] ? "note-inputs" : "note-inputs cannot-edit"} 
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].title} placeholder="THOUGHTS..."
                        onChange={e => {
                            this.updateField(e.target.value, i, 'title')
                        }}/>
                       
                        }

                        {this.state.allNotes[i].photo === null ?
                        <textarea cols="20" rows="10" 
                        className={this.state.canEdit[i] ? "note-text" : "note-text cannot-edit"}
                        type="text" disabled={(this.state.disabled[i]) ? "disabled" : ""}
                        value={this.state.allNotes[i].content} placeholder="THOUGHTS..."
                        onChange={e => {
                            this.updateField(e.target.value, i, 'content')
                        }}/> 
                        :
                        <img className="note-photo" src={this.state.allNotes[i].photo} alt={this.state.allNotes[i].location}/>
                        }


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

                </div>

            )})

        return(
            <div ref={(el) => (this.top = el)} style={{
                overflow: 'auto',
                height: '100vh'
            }}>
                <div className="menu-enter nb">
                    <img className="up" onClick={this.scrollTop} src={up} alt="scroll up"
                    style={{position: "absolute", zIndex: '10', left: '18%', top: '2px', height: '18px', cursor: 'pointer'}}/>
                    <img className="down" onClick={this.scrollDown} src={down} alt="scroll down"
                    style={{position: "absolute", zIndex: '10', left: '23%', top: '26px', height: '18px', cursor: 'pointer'}} />
                    <p onClick={this.toLanding}>TIME TO<br />TRAVEL</p>
                    <img className="open-menu" src={open} onClick={this.enterMenu} alt="enter-menu"/>
                </div>

                <div className="intro-box">
                    
                    <div className="intro-inner">
                        <p className="intro-text"><strong>Hello</strong><br /><br />
                        {this.state.DWquote}<br /> - {this.state.sourceQ}</p>
                        <NotebookBackground />
                    </div>
                </div>

                <div>
                    <input type="text" id="filter" placeholder="SEARCH NOTES"
                    onKeyUp={this.handleFilter}/>

                     {

                        !this.state.allNotes[0] && this.state.reqComplete ?
                        <div style={{position: 'relative'}}>
                            <img className="note-tardis" onClick={this.toMap} src={tardis} alt="TARDIS"/>
                            <p className="no-matches-text">Sorry, nothing to see! <br /> Don't worry, the TARDIS is here to take you somewhere nice</p>
                            <NotebookBackground />
                        </div>

                        :

                        <div>
                            { mappedNotes }
                        </div>

                        }

                </div>
                    <div ref={(el) => (this.bottom = el)}></div>
            </div>
        )
    }
}

export default Notebook;