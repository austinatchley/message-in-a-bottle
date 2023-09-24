# v2 Ideas

## Core Mechanics

Remove "admin portal" functionality and replace it with a debug view (/debug)

Introduce "disappear" functionality
- Each message should disappear after it's read
- Soft deletes on items in the Notes table to keep records for debug purposes

Introduce "location" functionality
- When a message is created, ask for permission and log the user's location
    - TODO: What to do if the user doesn't grant location permissions? Potential answer: one global bucket
- When a user takes a message from the bottle, engage a separate selection module that can allow for multiples selection strategies

Develop separate selection module
- Find message that is closest to the user's current location
- If no location is provided, select the oldest message

## Styling

Re-design landing page
- Add a placeholder paragraph

## Content

Modify landing page to reflect new functionality
Create a one-paragraph blurb describing the website in more detail