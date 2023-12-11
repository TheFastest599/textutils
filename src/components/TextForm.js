import React, { useState } from 'react';

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Converted to Uppercase', 'success');
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Converted to Lowercase', 'success');
  };
  const handleClearClick = () => {
    setText('');
    props.showAlert('Text cleared', 'success');
  };
  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance(text);
    msg.addEventListener('end', () => {
      toogle.innerHTML = 'Speak';
    });
    props.showAlert('Speech enabled', 'success');
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById('toggle');
    if (toogle.textContent === 'Speak') {
      toogle.innerHTML = 'Stop';
    } else {
      toogle.innerHTML = 'Speak';
      if ((toogle.innerHTML = 'Speak')) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert('Text copied to clipboard', 'success');
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert('Removed extra spaces', 'success');
  };

  const handleOnChange = event => {
    setText(event.target.value);
  };
  const [text, setText] = useState('');
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === 'dark' ? 'white' : 'black' }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Conver to uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Conver to lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-success mx-1 my-1"
          id="toggle"
          onClick={handleSpeakClick}
        >
          Speak
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-success mx-1 my-1"
          onClick={handleCopyClick}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-success mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-secondary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === 'dark' ? 'white' : 'black' }}
      >
        <h2>Your Text Summary</h2>
        <p>
          <b>
            {
              text.split(/\s+/).filter(element => {
                return element.length !== 0;
              }).length
            }
          </b>{' '}
          words and <b>{text.length}</b> characters.
        </p>
        <p>
          <b>
            {0.008 *
              text.split(/\s+/).filter(element => {
                return element.length !== 0;
              }).length}
          </b>{' '}
          Minutes read.
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Nothing to preview.'}</p>
      </div>
    </>
  );
}
