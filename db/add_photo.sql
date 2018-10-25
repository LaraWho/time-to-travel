insert into ttt_notes (title, country, location, photo, user_id)
values ($1, $2, $3, $4, $5)
returning *;