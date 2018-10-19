UPDATE ttt_notes
SET title = $1, location = $2, content = $3
WHERE note_id = $4
returning *;