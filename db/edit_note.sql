UPDATE ttt_notes
SET title = $1, country = $2, location = $3, content = $4, photo = $5
WHERE note_id = $6
returning *;