# Under development

# Identify non used css

1.Parses a list of html's files.

2.Parses a list of css's files.

3.Query by all css's selectors into all html's.

4.Returns a list of __possible__ non used css selectors.


## How to use
```javascript
new IdentifyCSS({
  htmls: './some_folder/**.html',
  styles: './some_folder/**.css'
});
```