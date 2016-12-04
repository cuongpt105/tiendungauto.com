# Angular2 Component for Froala Editor

This is Angular2 component for [Froala Editor](https://github.com/froala/wysiwyg-editor). This allows developers
to easily integrate this powerful WYSIWYG editor into any applications.
Most of the method calls, set up events listening, and options for the editors are still the same and follow the documentation of Froala Editor.  
In order to use this component, you would need to include all the `font-awesome` css, `jQuery` and `Froala` js and css files in index.html
Please feel free to make suggestions if you have ideas to improve it.  
All development for this project sponsored by [Thrinacia, The Next Generation CrowdFunding Infrastructure - https://www.thrinacia.com](https://www.thrinacia.com).

## Demo

(Some links here to show how it works)

## Quick Start

```
npm install ng2-froala-editor --save
```

### Angular 2 Version

The current version used to develop this module is angular2 **2.0.0**.
This is the final version of angular2. It may work in RC5, RC6 and RC7.

## Example

In your NgModule:

```
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {FroalaEditorModule} from "ng2-froala-editor/ng2-froala-editor"; // <-- Import it in your NgModule
import {HttpModule} from "@angular/http";
import {MyComponent} from './My.component';
import {MyService} from './My.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FroalaEditorModule  // <-- Include in your module
  ],
  declarations: [
    MyComponent
  ],
  bootstrap: [
    MyComponent
  ],
  providers: [
    MyService
  ]
})

export class AppModule { }
```

In your component:
```
import {Component, OnInit} from "@angular/core";
import {FroalaEditorCompnoent} from 'ng2-froala-editor/ng2-froala-editor';    <-- add this to get instance of FroalaEditorComponent

@Component({
  selector: 'my-component',
  template: `
    <froala [froalaOptions]="froalaOptions" [froalaData]="text" (model)="onFroalaModelChanged($event)" (editorInitialized)="onEditorInitialized()"></froala>
  `
})

export class MyComponent implements OnInit {

  text: string = '<div>Hey we are testing Froala Editor</div>';
  editor: any;

  froalaOptions: any = {
    height: 300
  };

  constructor() {

  }

  ngOnInit() {

  }

  onFroalaModelChanged(event: any) {
    setTimeout(() => {
      this.text = event;
    });
  }

  onEditorInitialized(event?: any) {
    this.editor = FroalaEditorCompnoent.getFroalaInstance();
    this.editor.on('froalaEditor.focus', (e, editor) => {
      console.log("editor is focused");
    });
  }
}
```

## Docs

### Inputs
* **froalaData [`string`]** If you have strings you would like the editor to have when it initializes, you can put it here
* **froalaOptions [`object`]** When Froala Editor initializes, you can pass an object to the editor to use different options. 
For the list of options, you can see it on [Froala options](https://www.froala.com/wysiwyg-editor/docs/options)

### Outputs
* **model [`Event`]**
* **editorInitialized [`Event`]** This emits an event without any data. You can catch it if your component needs to know when the editor finishes initializing.
One of the use cases is to get the Froala Editor instance

### Static Method
* **getFroalaInstance()** Returns a Froala Editor instance, or the DOM the editor resides. From there you can call Froala's [method](https://www.froala.com/wysiwyg-editor/docs/methods) and set up listener for [events](https://www.froala.com/wysiwyg-editor/docs/events)

## Froala
Here is a snippet of how you can interact with the editor. 
Use `onEditorInitialized()` function above as example:
```
onEditorInitialized(event?: any) {
  // Save the editor instance
  this.editor = FroalaEditorCompnoent.getFroalaInstance();

  // Listen to Froala Editor's event
  this.editor.on('froalaEditor.focus', (e, editor) => {
    console.log("editor is focused");

    // Use Froala Editor's method
    this.editor.froalaEditor('codeView.toggle');
  });

}
```