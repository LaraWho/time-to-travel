UPDATE ttt_notes
SET title = $1, country = $2, location = $3, content = $4
WHERE note_id = $5
returning *;