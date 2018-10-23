insert into ttt_notes (title, country, location, content, user_id)
values ($1, $2, $3, $4, $5)
returning *;