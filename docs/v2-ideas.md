# v2 Ideas

## Core Mechanics

Remove "admin portal" functionality and replace it with a debug view (/debug)

Introduce "disappear" functionality
- Each message should disappear after it's read
- Soft deletes on items in the Notes table to keep records for debug purposes

Develop separate selection module
- Find message that is closest to the user's current location
- If no location is provided, select the oldest message

Introduce "location" functionality
- Not sure on this one yet. Enabling location might be a big ask
- When a message is created, log the user's location
    - TODO: What to do if the user doesn't grant location permissions? Potential answer: one global bucket
- When a user takes a message from the bottle, engage a separate selection module that can allow for multiples selection strategies

## Styling

Re-design landing page
- Add a placeholder paragraph

## Content

Modify landing page to reflect new functionality
Create a one-paragraph blurb describing the website in more detail