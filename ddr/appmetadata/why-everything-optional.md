# Optionality of properties app metadata
BadgeHub does not wants to make it possible that a developer just creates an __init__.py file in his repo, uploads it under a slug, and that works.
This also really did work on a lot of the older badges, you can just create a directory on the badge, add an __init__.py file, and it will show up in the app launcher and it will be able to launch the app.

So we want to adhere to a principle of "optinional complexity" for the developer. The developer doesn't need to think about versioning, categories, icons, badges, etc. if he doesn't want to.
If he can create an __init__.py file and choose a slug, and other people find this useful, he should be able to share it without any extra administration overhead.
This means extra work in the firmware and in badgehub, but we really want to keep the bar as low as possible and encourage app sharing, even for silly or even bad quality apps.
