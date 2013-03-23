# Stacker

![Spin Edit Example](http://geersch.github.com/stacker/images/example.png)

Easily create a stack of cards which you can cylce through using this jQuery plugin.

## Usage

This component was created using [jQuery](http://code.jquery.com/jquery-1.9.1.min.js) 1.9.1.

Basic usage:

```
<script type="text/javascript" src="jquery-1.9.1.min"></script>
<script type="text/javascript" src="stacker.js"></script>
<link rel="stylesheet" type="text/css" href="stacker.css" />

<div id="stack">
  <form action="...">
    <label>...</label>
    <input type="text" id="..." />
    ...  
  </form>
</div>

<script type="text/javascript">
$('#stack').stacker();
</script>
```

The above example converts the DIV with id stack into a stacker. The HTML (form) contained within the DIV will be used by the stacker as the template to display for a card in the stack.

You can use the following additional options to modify the behaviour of the spin edit control:

* **maxVisibleItems**: The maximum number of cards visible at one time (default 10). 

```
<div id="stack">
...
</div>

<script type="text/javascript">
$('#stack').stacker({ maxVisibleItems: 5 });
</script>
```
