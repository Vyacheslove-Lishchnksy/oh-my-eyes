# Summery

---

An extension for the Google Chrome browser that replaces text according to your rules.

![how_oh_my_eyes_work](https://github.com/user-attachments/assets/96212aeb-b2a4-4b91-97a6-8a7a978ae1a6)

# How does the thing in the gif work?
---
Inside is the following config file

```json
[
  {
    "text": "Bed sheet",
    "replaceTo": "%asterisks%",
    "isIgnoreCase": true,
    "replaceMode": "whole_word"
  }
]
```

text:
This is the text that the extension will search for.

replaceTo:
This is what will replace the word specified in the “text” field. For example, if ‘Dog’ is specified, all instances of “Bed sheet” will be replaced with “Dog.” There are also constants, such as “%asterisks%,” which will replace the word with asterisks, as shown in the example above.

isIgnoreCase:
This flag makes the check case-insensitive, which corresponds to the 'gi' flag in RegExp.

replaceMode:
There are three operating modes:

whole_word - replaces the entire word and corresponds to: ```"\\b${node.text}\\w*(?=-|\\b"``` 

word - replaces the entire word, ignoring different forms, and responds: ```"\\b${text}\\b"```

partial_word - replaces the fragment ignoring the context corresponds to:  ```"${text}"```
