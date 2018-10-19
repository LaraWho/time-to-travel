delete from ttt_notes
where note_id = $1;

select * from ttt_notes
where user_id = $2;
-- delete from ttt_notes
-- where note_id = $1
-- returning *;