insert into ttt_notes (title, location, content, user_id)
values ($1, $2, $3, $4)
returning *;