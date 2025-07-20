# How we model categories
We first wanted to model categories as objects with a name and a slug.
This would give the posssiblity to also add a description and other metadata to the category.

However, this soon seemed to make the API more complex than necessary.
Things to consider:
- we need to explain to devs if they should use the slug or the name in the API.
- there is a lot of translation between slug and name going on in the code.
- We don't really need slugs for categories, we can get away with just url encoding where needed.
- the config would be more complex, array of objects instead of array of strings.

So we decided to keep it stupid simple and just use an array of strings for the categories.