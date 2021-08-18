import React from 'react'

import { initialContent } from './data';
import Header from './components/Header';
import Editor from './components/Editor';
import Previewer from './components/Previewer';
import ClearModal from './components/ClearModal';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMarkdown: initialContent,
      modalOpen: false,
      fileDownloadUrl: '',
      clickDoDownload: false
    };
  }
  handleChangeEditor = (e) => {
    this.setState({
      textMarkdown: e.target.value,
    })
  }
  handleModal = (e) => {
    if (this.state.modalOpen) {
      this.setState({
        modalOpen: false,
      })
    } else {
      this.setState({
        modalOpen: true,
      })
    }
  }
  handleClear = (e) => {
    this.setState({
      textMarkdown: '',
      modalOpen: false,
    })
  }
  handleClick = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "clear" :
        if ((this.state.textMarkdown === initialContent) || (this.state.textMarkdown === '')) {
          this.setState({
            textMarkdown: '',
          });
        } else {
          this.setState({
            modalOpen: true
          })
        }
        break;
      case "copy" :
        navigator.clipboard.writeText(this.state.textMarkdown);
        break;
      case "heading" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '#  ',
        });
        break;
      case "bold" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '** **  ',
        });
        break;
      case "italic" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '_ _  \n',
        });
        break;
      case "cross" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '~~ ~~  \n',
        });
        break;
      case "in-code" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '`your code`  \n',
        });
        break;
      case "mu-code" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '```language\nyour code\n```\n',
        });
        break;
      case "link" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '[link](https://github.com/AndresNunezG)\n',
        });
        break;
      case "table" :
        this.setState({
          textMarkdown: this.state.textMarkdown + 'A | B | C\n---|---|---\nD | E | F\n',
        });
        break;
      case "quote" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '> \n',
        });
        break;
      case "list" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '- \n',
        });
        break;
      case "image" :
        this.setState({
          textMarkdown: this.state.textMarkdown + '![Markdown Logo](https://freesvg.org/img/gs_markdown_black.png)\n',
        });
        break;
      case "download" :
        this.setState({clickDoDownload: true})
        if (this.state.fileDownloadUrl !== '') window.URL.revokeObjectURL(this.state.fileDownloadUrl);
        const blob = new Blob([this.state.textMarkdown], {type: 'text/plain'});
        const fileDownloadUrl  = window.URL.createObjectURL(blob);
        this.setState({fileDownloadUrl: fileDownloadUrl});
        this.setState({clickDoDownload: false});
        break;
      default:
        break;
    }
  }
  render () {
    return (
      <div className="App">
        <Header />
        <div className="Main__container">
          <Editor
           handleClick={this.handleClick}
           handleChangeEditor={this.handleChangeEditor}
           textMarkdown={this.state.textMarkdown}
          />
          <Previewer
           handleClick={this.handleClick}
           clickDoDownload={this.state.clickDoDownload}
           hrefDownload={this.state.fileDownloadUrl}
           textMarkdown={this.state.textMarkdown}
          />
        </div>
        <ClearModal
         modalOpen={this.state.modalOpen}
         handleModal={this.handleModal}
         handleClear={this.handleClear}
        />
      </div>
    )
  };
}

export default App;