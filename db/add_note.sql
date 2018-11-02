insert into ttt_notes (country, location, content, user_id)
values ($1, $2, $3, $4)
returning *;