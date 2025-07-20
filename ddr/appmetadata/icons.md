# How we model project icons
Project icons are an important part of BadgeHub. Without icons, the webside would look very bland and uninviting. The same applies for the app launcher.
So for the app launcher and the badgehub website and badge app, we want app developers to add an icon to their app.

Now the thing is that we also need multiple sizes of the icon, because the app launcher needs a small icon, but the website needs a larger icon.

So for this reason, the icon property in the app config is an object with multiple sizes, like this:

```json
{
  "icon": {
    "16x16": "icon-16x16.png",
    "32x32": "icon-32x32.png",
    "64x64": "icon-64x64.png"
  }
}
```


# icon.py support
A lot of badges use or allow a python script as the icon in the form of an icon.py file.
However, for badgehub, we cannot use the icons in this format. 
So these "python icons" can be included in the app files, but badgehub does not support them as "app icons".
