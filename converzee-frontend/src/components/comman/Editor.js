import React, { createRef, useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "./Editor.css";

import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

  // Content styles, including inline UI like fake cursors
  /* eslint import/no-webpack-loader-syntax: off */
  // import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
  // import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value,
      type: props.type
    };
    this.editorRef = createRef(null);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({ content: value });
    }
  }

  componentWillUnmount() {
    this.props.onChange(this.state.content);
  }
  onChange = (value) => {
    this.props.onChange(value);
  };

  ValidateCharacterLength = (count)=> {
    var max = 50;
    if (count > max) {
      alert("Maximum " + max + " characters allowed.")
      return false;
    }
    return;
  }

  render() {
    const { content } = this.state;
    return (
      <div style={{ wordBreak: "break-all" }}>
        <Editor
          onInit={(evt, editor) => this.editorRef.current = editor}
          initialValue={content}
          init={{
            menubar : false,
            toolbar: ' fontselect fontsizeselect | bold italic | underline strikethrough | alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor | pagebreak',
            content_css: 'default',
            font_formats : "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Quicksand=Quicksand, sans-serif;Open Sans=Open Sans, sans-serif;Montserrat=Montserrat, sans-serif;Raleway=Raleway, sans-serif;Roboto=Roboto, sans-serif;PT Sans=PT Sans, sans-serif;Hahmlet=Hahmlet, serif;Andada Pro=Andada Pro, serif;Encode Sans=Encode Sans, sans-serif;Manrope=Manrope, sans-serif;Lora=Lora, serif;BioRhyme=BioRhyme, serif;Playfair Display=Playfair Display, serif;Archivo=Archivo, sans-serif;Ubuntu=Ubuntu, sans-serif;Rubik=Rubik, sans-serif;Lato=Lato, sans-serif;Old Standard TT=Old Standard TT, serif;Oswald=Oswald, sans-serif;Nunito=Nunito, sans-serif;Source Sans Pro=Source Sans Pro, sans-serif;",
            content_style: "@import url('https://fonts.googleapis.com/css2?family=Andada+Pro:wght@400;700&family=Archivo:wght@400;700&family=BioRhyme:wght@300;700&family=Encode+Sans:wght@400;700&family=Hahmlet:wght@400;700&family=Lato:wght@400;700&family=Lora:wght@400;700&family=Manrope:wght@400;700&family=Montserrat:wght@400;700&family=Nunito:wght@400;700&family=Old+Standard+TT:wght@400;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;700&family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Quicksand:wght@400;700&family=Raleway:wght@400;700&family=Roboto:wght@400;700&family=Rubik:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Ubuntu:wght@400;700&display=swap');",
            block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
            branding: false,
            forced_root_block : false,
            statusbar: false,
          }}     
          onEditorChange={(newValue) => this.onChange(newValue)}
        />
      </div>
    );
  }
}