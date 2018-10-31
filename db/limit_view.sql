select * from ttt_notes
where user_id = $1
order by note_id
limit 8
offset $2;