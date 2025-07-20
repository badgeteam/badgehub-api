# Modeling a badge in the system
Badgehub needs to be able to model badges in the system. These badges are used in various places for differentiation:
- app can be compatible with multiple badges
- app can have different feedback on different badges
- app can have different crash stats on different badges

Currently, BadgeHub does not have any metadata about badges except as to how they relate to apps.
But we might want to change that.

So here, similarly to the question of categories, we ask ourselves:
- Should we model badges as objects with a name and a slug or just as strings?

At this point, we decide to model the badges as simple slugs, which are just strings with restrictions so that they can be used as variable names and don't require url encoding.
Reasons for this decision:
- YAGNI (You Aren't Gonna Need It): We don't need any extra metadata about badges at this time.)
- KISS (Keep It Stupid Simple)