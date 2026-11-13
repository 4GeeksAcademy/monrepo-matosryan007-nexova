# What You Need to Do

## 1. Build the candidate list

- Display all candidates with their name, position, current status, and current stage.
- Fetch candidate data from the provided REST API.
- Show loading and error states for asynchronous requests.

## 2. Add filtering and search

- Filter candidates by status.
- Filter candidates by stage.
- Search candidates by name or email without reloading the page.
- Display human-readable labels for status and stage values; never show raw API values.

## 3. Create a candidate detail view

- Open an individual candidate’s detail view.
- Display the candidate’s complete information.
- Allow status and stage to be changed from the detail view with a single interaction.
- Keep internal notes visible only in the candidate detail view.

## 4. Manage candidate notes

- Add internal notes for a candidate.
- Delete notes that are no longer relevant.
- Handle loading and errors gracefully when notes are created or deleted.

## 5. Register and edit candidates

- Create a form to register new candidates directly from the interface.
- Include every field required by the API.
- Allow existing candidate data to be edited when corrections are needed.
- Validate form data and provide clear feedback for errors.

## 6. General requirements

- Place the interface in the `/uis/talent-pipeline-tracker` project.
- Use the REST API documented at `https://playground.4geeks.com/tracker/api/v1/docs`.
- Handle every API request asynchronously.
- Communicate loading states and errors clearly so the interface never fails silently.