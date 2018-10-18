import React, { Component } from 'react';
import open from '../../assets/menu-open.svg';
import './notebook.css';
import NotebookBackground from './Notebookbackground';

class Notebook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            location: '',
            content: '',
            showSave: false,
            canEdit: false,
            disabled: true,
        }
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

      saveEdit = () => {
        // let { name, price, image } = this.state
        // axios.put(`/shelf/${this.props.match.params.id}/bin/${this.props.match.params.number}`, 
        // { name, price, image })
        // .then( res => {
        //   this.setState({
        //     disabled: !this.state.disabled,
        //     showSave: !this.state.showSave,
        //     canEdit: !this.state.canEdit,
        //   })
          console.log('edit')
        // })
      }

      deleteNote() {
          console.log('delete')
        // axios.delete(`/shelf/${this.props.match.params.id}/bin/${this.props.match.params.number}`)
        //   .then(res => {
        //     this.getNotes()
        //   })
        }

    render() {
        return(
            <div >
                <div className="menu-enter nb">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">
                        <input className={this.state.canEdit ? "note-inputs" : "note-inputs cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}/>
                        <input className={this.state.canEdit ? "note-inputs2" : "note-inputs2 cannot-edit"} 
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}/>
                        <input className={this.state.canEdit ? "note-text" : "note-text cannot-edit"}
                        type="text" disabled={(this.state.disabled) ? "disabled" : ""}/>


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
                        {/* <button className="note-save">EDIT</button> */}
                    </div>
                        <h3 className="delete-note"
                        onClick={() => this.deleteNote()}>DELETE NOTE</h3>
                </div>
            </div>
        )
    }
}

export default Notebook;